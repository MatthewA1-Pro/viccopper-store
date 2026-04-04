import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from './prisma';
import { env } from './env';
import { logger } from '../utils/logger';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          // If user exists but wasn't logic linked to Google, link it
          if (!user.oauthProvider) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                oauthProvider: 'GOOGLE',
                oauthId: profile.id,
                avatarUrl: profile.photos?.[0].value,
                emailVerified: true,
              },
            });
          }
        } else {
          // Create new user
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              oauthProvider: 'GOOGLE',
              oauthId: profile.id,
              avatarUrl: profile.photos?.[0].value,
              emailVerified: true,
            },
          });

          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: 'USER_REGISTERED_OAUTH',
              ipAddress: req.ip,
              metadata: { provider: 'GOOGLE' },
            },
          });
        }

        return done(null, user);
      } catch (err) {
        logger.error('Google Auth Error:', err);
        return done(err as Error);
      }
    }
  )
);

// We don't use sessions for JWT auth, but passport requires these
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
