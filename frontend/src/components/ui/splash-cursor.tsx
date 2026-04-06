'use client';

import React, { useEffect, useRef } from 'react';

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

export const SplashCursor: React.FC<SplashCursorProps> = ({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.03, g: 0.05, b: 0.08 },
  TRANSPARENT = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl2', {
      alpha: TRANSPARENT,
      depth: false,
      stencil: false,
      antialias: false,
    }) || canvas.getContext('webgl', {
      alpha: TRANSPARENT,
      depth: false,
      stencil: false,
      antialias: false,
    })) as WebGL2RenderingContext | WebGLRenderingContext | null;

    if (!gl) return;

    const isWebGL2 = !!(gl as any).clearBufferfv;

    // --- Shader Sources --- (Simplified for readability and functionality)
    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const copyShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `;

    const clearShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    const splatShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    const divergenceShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const curlShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float div = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - div) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity -= vec2(R - L, T - B) * 0.5;
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const displayShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uDye;
      uniform bool shading;
      uniform vec2 texelSize;

      void main () {
          vec3 dye = texture2D(uDye, vUv).rgb;
          if (shading) {
              float L = texture2D(uDye, vUv - vec2(texelSize.x, 0.0)).r;
              float R = texture2D(uDye, vUv + vec2(texelSize.x, 0.0)).r;
              float T = texture2D(uDye, vUv + vec2(0.0, texelSize.y)).r;
              float B = texture2D(uDye, vUv - vec2(0.0, texelSize.y)).r;
              vec3 n = normalize(vec3(L - R, B - T, 1.0));
              dye *= n.z;
          }
          gl_FragColor = vec4(dye, 1.0);
      }
    `;

    // --- WebGL Helper Classes and Init ---
    class Program {
      program: WebGLProgram;
      uniforms: { [key: string]: WebGLUniformLocation | null };
      constructor(vertexShader: string, fragmentShader: string) {
        this.program = createProgram(vertexShader, fragmentShader)!;
        this.uniforms = getUniforms(this.program);
      }
      bind() { gl!.useProgram(this.program); }
    }

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) throw gl!.getShaderInfoLog(shader);
      return shader;
    }

    function createProgram(vertexShader: string, fragmentShader: string) {
      const program = gl!.createProgram()!;
      gl!.attachShader(program, createShader(gl!.VERTEX_SHADER, vertexShader));
      gl!.attachShader(program, createShader(gl!.FRAGMENT_SHADER, fragmentShader));
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) throw gl!.getProgramInfoLog(program);
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      const uniformCount = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl!.getActiveUniform(program, i)!.name;
        uniforms[uniformName] = gl!.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      return { texture, fbo, width: w, height: h };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }
      };
    }

    const blit = gl!.createBuffer()!;
    gl!.bindBuffer(gl!.ARRAY_BUFFER, blit);
    gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl!.STATIC_DRAW);

    const quadOpts = (program: Program) => {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, blit);
      const loc = gl!.getAttribLocation(program.program, 'aPosition');
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
      gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
    };

    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradSubProgram = new Program(baseVertexShader, gradientSubtractShader);
    const displayProgram = new Program(baseVertexShader, displayShaderSource);

    const ext = isWebGL2 ? null : gl!.getExtension('OES_texture_half_float');
    const type = isWebGL2 ? (gl as any).HALF_FLOAT : ext ? ext.HALF_FLOAT_OES : gl!.UNSIGNED_BYTE;
    const internalFormat = isWebGL2 ? (gl as any).RGBA16F : gl!.RGBA;
    const format = gl!.RGBA;

    let dyeFBO = createDoubleFBO(DYE_RESOLUTION, DYE_RESOLUTION, internalFormat, format, type, gl!.LINEAR);
    let velocityFBO = createDoubleFBO(SIM_RESOLUTION, SIM_RESOLUTION, internalFormat, format, type, gl!.LINEAR);
    let divergenceFBO = createFBO(SIM_RESOLUTION, SIM_RESOLUTION, internalFormat, format, type, gl!.NEAREST);
    let curlFBO = createFBO(SIM_RESOLUTION, SIM_RESOLUTION, internalFormat, format, type, gl!.NEAREST);
    let pressureFBO = createDoubleFBO(SIM_RESOLUTION, SIM_RESOLUTION, internalFormat, format, type, gl!.NEAREST);

    const pointers: any[] = [];

    const update = () => {
      const dt = 1/60;
      gl!.viewport(0, 0, SIM_RESOLUTION, SIM_RESOLUTION);

      advectionProgram.bind();
      gl!.uniform2f(advectionProgram.uniforms.texelSize as any, 1/SIM_RESOLUTION, 1/SIM_RESOLUTION);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(advectionProgram.uniforms.uVelocity as any, 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(advectionProgram.uniforms.uSource as any, 1);
      gl!.uniform1f(advectionProgram.uniforms.dt as any, dt);
      gl!.uniform1f(advectionProgram.uniforms.dissipation as any, VELOCITY_DISSIPATION);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, velocityFBO.write.fbo as any);
      quadOpts(advectionProgram);
      velocityFBO.swap();

      gl!.viewport(0, 0, DYE_RESOLUTION, DYE_RESOLUTION);
      advectionProgram.bind();
      gl!.uniform2f(advectionProgram.uniforms.texelSize as any, 1/DYE_RESOLUTION, 1/DYE_RESOLUTION);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(advectionProgram.uniforms.uVelocity as any, 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, dyeFBO.read.texture);
      gl!.uniform1i(advectionProgram.uniforms.uSource as any, 1);
      gl!.uniform1f(advectionProgram.uniforms.dissipation as any, DENSITY_DISSIPATION);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, dyeFBO.write.fbo as any);
      quadOpts(advectionProgram);
      dyeFBO.swap();

      for (let p of pointers) {
        if (p.moved) {
          const color = HSVtoRGB(Math.random(), 0.8, 1);
          createSplat(p.x, p.y, p.dx, p.dy, color);
          p.moved = false;
        }
      }

      gl!.viewport(0, 0, SIM_RESOLUTION, SIM_RESOLUTION);
      curlProgram.bind();
      gl!.uniform2f(curlProgram.uniforms.texelSize as any, 1/SIM_RESOLUTION, 1/SIM_RESOLUTION);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(curlProgram.uniforms.uVelocity as any, 0);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, curlFBO.fbo as any);
      quadOpts(curlProgram);

      vorticityProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(vorticityProgram.uniforms.uVelocity as any, 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, curlFBO.texture);
      gl!.uniform1i(vorticityProgram.uniforms.uCurl as any, 1);
      gl!.uniform1f(vorticityProgram.uniforms.curl as any, CURL);
      gl!.uniform1f(vorticityProgram.uniforms.dt as any, dt);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, velocityFBO.write.fbo as any);
      quadOpts(vorticityProgram);
      velocityFBO.swap();

      divergenceProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(divergenceProgram.uniforms.uVelocity as any, 0);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, divergenceFBO.fbo as any);
      quadOpts(divergenceProgram);

      clearProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, pressureFBO.read.texture);
      gl!.uniform1i(clearProgram.uniforms.uTexture as any, 0);
      gl!.uniform1f(clearProgram.uniforms.value as any, PRESSURE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, pressureFBO.write.fbo as any);
      quadOpts(clearProgram);
      pressureFBO.swap();

      pressureProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, divergenceFBO.texture);
      gl!.uniform1i(pressureProgram.uniforms.uDivergence as any, 0);
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl!.activeTexture(gl!.TEXTURE1);
        gl!.bindTexture(gl!.TEXTURE_2D, pressureFBO.read.texture);
        gl!.uniform1i(pressureProgram.uniforms.uPressure as any, 1);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, pressureFBO.write.fbo as any);
        quadOpts(pressureProgram);
        pressureFBO.swap();
      }

      gradSubProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, pressureFBO.read.texture);
      gl!.uniform1i(gradSubProgram.uniforms.uPressure as any, 0);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(gradSubProgram.uniforms.uVelocity as any, 1);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, velocityFBO.write.fbo as any);
      quadOpts(gradSubProgram);
      velocityFBO.swap();

      gl!.viewport(0, 0, canvas.width, canvas.height);
      displayProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, dyeFBO.read.texture);
      gl!.uniform1i(displayProgram.uniforms.uDye as any, 0);
      gl!.uniform1i(displayProgram.uniforms.shading as any, SHADING ? 1 : 0);
      gl!.uniform2f(displayProgram.uniforms.texelSize as any, 1/canvas.width, 1/canvas.height);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, null);
      if (TRANSPARENT) gl!.clearColor(0, 0, 0, 0);
      else gl!.clearColor(BACK_COLOR.r / 255, BACK_COLOR.g / 255, BACK_COLOR.b / 255, 1.0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      quadOpts(displayProgram);

      requestAnimationFrame(update);
    };

    function createSplat(x: number, y: number, dx: number, dy: number, color: any) {
      gl!.viewport(0, 0, SIM_RESOLUTION, SIM_RESOLUTION);
      splatProgram.bind();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, velocityFBO.read.texture);
      gl!.uniform1i(splatProgram.uniforms.uTarget as any, 0);
      gl!.uniform1f(splatProgram.uniforms.aspectRatio as any, canvas.width / canvas.height);
      gl!.uniform2f(splatProgram.uniforms.point as any, x / canvas.width, 1 - y / canvas.height);
      gl!.uniform3f(splatProgram.uniforms.color as any, dx * SPLAT_FORCE, -dy * SPLAT_FORCE, 1.0);
      gl!.uniform1f(splatProgram.uniforms.radius as any, SPLAT_RADIUS / 100);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, velocityFBO.write.fbo as any);
      quadOpts(splatProgram);
      velocityFBO.swap();

      gl!.viewport(0, 0, DYE_RESOLUTION, DYE_RESOLUTION);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, dyeFBO.read.texture);
      gl!.uniform1i(splatProgram.uniforms.uTarget as any, 0);
      gl!.uniform3f(splatProgram.uniforms.color as any, color.r, color.g, color.b);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER as any, dyeFBO.write.fbo as any);
      quadOpts(splatProgram);
      dyeFBO.swap();
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6); f = h * 6 - i; p = v * (1 - s); q = v * (1 - f * s); t = v * (1 - (1 - f) * s);
      switch (i % 6) { case 0: r = v; g = t; b = p; break; case 1: r = q; g = v; b = p; break; case 2: r = p; g = v; b = t; break; case 3: r = p; g = q; b = v; break; case 4: r = t; g = p; b = v; break; case 5: r = v; g = p; b = q; break; default: r=0; g=0; b=0;}
      return { r, g, b };
    }

    const onMouseMove = (e: MouseEvent) => {
        if (pointers.length === 0) pointers.push({id: -1, x: 0, y: 0, dx: 0, dy: 0, moved: false});
        const p = pointers[0];
        p.dx = (e.clientX - p.x); p.dy = (e.clientY - p.y); p.x = e.clientX; p.y = e.clientY; p.moved = true;
    };
    const onTouchMove = (e: TouchEvent) => {
        const touches = e.targetTouches;
        for (let i = 0; i < touches.length; i++) {
            if (i >= pointers.length) pointers.push({id: i, x: 0, y: 0, dx: 0, dy: 0, moved: false});
            const p = pointers[i];
            p.dx = (touches[i].clientX - p.x); p.dy = (touches[i].clientY - p.y); p.x = touches[i].clientX; p.y = touches[i].clientY; p.moved = true;
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; gl!.viewport(0, 0, canvas.width, canvas.height); };
    resize();
    window.addEventListener('resize', resize);
    update();
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('touchmove', onTouchMove); window.removeEventListener('resize', resize); };
  }, [
    SIM_RESOLUTION, DYE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION,
    PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS, SPLAT_FORCE, SHADING,
    COLOR_UPDATE_SPEED, BACK_COLOR, TRANSPARENT
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
};
