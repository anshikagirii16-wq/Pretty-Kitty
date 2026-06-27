/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      // Graceful fallback to CSS animated gradients if WebGL is unsupported
      canvas.style.background = 'radial-gradient(circle at 30% 30%, #ffd9e1 0%, #fff8f8 50%, #fbe36a 100%)';
      return;
    }

    let animationId: number;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                       dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // Cream base background #FFF8F2 -> vec3(0.99, 0.97, 0.95)
        vec3 baseColor = vec3(1.0, 0.97, 0.95);
        
        // Animated blobs
        float n1 = noise(uv * 1.8 + u_time * 0.08) * 0.5 + 0.5;
        float n2 = noise(uv * 2.5 - u_time * 0.12 + 15.0) * 0.5 + 0.5;
        
        // Sweet colors from mockup palette
        vec3 pink = vec3(1.0, 0.56, 0.69);   // #FF8FB1 (Primary Container)
        vec3 blue = vec3(0.78, 0.93, 0.98);   // Soft pastel blue
        vec3 yellow = vec3(1.0, 0.89, 0.42); // #FFE66D (Secondary)

        // Mouse influence
        vec2 mouseUV = u_mouse / u_resolution;
        float distToMouse = distance(uv, mouseUV);
        float mouseIn = smoothstep(0.4, 0.0, distToMouse) * 0.15;

        float blob1 = smoothstep(0.35, 0.75, n1);
        float blob2 = smoothstep(0.35, 0.75, n2);
        
        vec3 color = baseColor;
        color = mix(color, pink, blob1 * 0.14 + mouseIn * 0.5);
        color = mix(color, blue, blob2 * 0.08);
        color = mix(color, yellow, (n1 * n2) * 0.07);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vsShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fsShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vsShader || !fsShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = window.innerHeight - e.clientY; // Flip Y for WebGL coordinates
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = (time: number) => {
      gl.clearColor(1.0, 0.97, 0.95, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      if (uTimeLoc) gl.uniform1f(uTimeLoc, time * 0.001);
      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uMouseLoc) gl.uniform2f(uMouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full pointer-events-none opacity-50"
      style={{ display: 'block' }}
    />
  );
};
