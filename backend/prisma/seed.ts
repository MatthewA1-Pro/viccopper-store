import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Plans ───────────────────────────────────────────────────────────────────
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for exploring and small projects.',
      stripePriceId: 'price_free_tier', // Placeholder for local dev
      stripeProductId: 'prod_free',
      priceCents: 0,
      interval: 'month',
      features: ['Unlimited public projects', 'Community support', 'Basic analytics'],
      isPopular: false,
    },
    {
      name: 'Pro',
      description: 'The best option for teams and growing startups.',
      stripePriceId: 'price_pro_monthly', // Replace with your test/prod ID
      stripeProductId: 'prod_pro',
      priceCents: 1900, // $19.00
      interval: 'month',
      features: ['Unlimited private projects', 'Priority support', 'Advanced analytics', 'Custom domains'],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      description: 'Advanced features for large-scale operations.',
      stripePriceId: 'price_enterprise_custom',
      stripeProductId: 'prod_enterprise',
      priceCents: 9900, // $99.00
      interval: 'month',
      features: ['SLA guarantees', 'Dedicated manager', 'SSO/SAML auth', 'API-first design'],
      isPopular: false,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { stripePriceId: plan.stripePriceId },
      update: plan,
      create: plan,
    });
  }

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
