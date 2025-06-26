import React, { useEffect, useRef } from 'react';

const fragmentShader = `
precision highp float;
uniform float time;
uniform vec2 resolution;

#define PI 3.141592653589793

// Therapeutic color palette
vec3 deepIndigo = vec3(0.05, 0.03, 0.12);
vec3 royalPurple = vec3(0.25, 0.08, 0.36);
vec3 lavender = vec3(0.55, 0.35, 0.8);
vec3 softPink = vec3(0.8, 0.4, 0.6);

// Simplex Noise function for organic patterns
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractional Brownian Motion for complexity
float fbm(vec2 p) {
  float f = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    f += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return f;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  
  // Slow pulsing for breathing effect
  float pulse = 0.5 + 0.5 * sin(time * 0.3);
  
  // Create neural-like connections
  float neuralPattern = 0.0;
  for (float i = 0.0; i < 4.0; i++) {
    float angle = PI * 2.0 * (i / 4.0) + time * 0.1;
    vec2 dir = vec2(cos(angle), sin(angle));
    neuralPattern += 0.3 * sin(30.0 * dot(uv, dir) + 0.7;
  }
  neuralPattern = clamp(neuralPattern / 4.0, 0.0, 1.0);
  
  // Create organic wave patterns with noise
  vec2 waveUV = uv * 2.0 + vec2(time * 0.05, time * 0.03);
  float noise1 = fbm(waveUV);
  float noise2 = fbm(waveUV + 10.0);
  
  // Combine patterns
  float pattern = mix(neuralPattern, noise1, 0.7) * noise2;
  
  // Create radial gradient with pulsing center
  float radius = length(uv) * 1.2;
  float radialGradient = smoothstep(0.8, 0.2, radius) * pulse * 0.8;
  
  // Create color gradients
  vec3 color = mix(deepIndigo, royalPurple, radialGradient);
  color = mix(color, lavender, pattern * radialGradient * 0.8);
  color = mix(color, softPink, neuralPattern * radialGradient * 0.4);
  
  // Add subtle highlights
  color += lavender * pow(radialGradient, 4.0) * 0.4;
  color += softPink * pow(abs(pattern) * radialGradient, 3.0) * 0.3;
  
  // Add glowing particles (like neurotransmitters)
  float particles = snoise(gl_FragCoord.xy * 0.5 + time);
  if (particles > 0.97) {
    float particleSize = pow(particles, 8.0);
    color = mix(color, lavender, particleSize * 0.8);
    color = mix(color, softPink, particleSize * 0.5);
  }
  
  // Ensure colors stay within therapeutic range
  color = clamp(color, 0.0, 0.8);
  
  // Apply vignette effect
  float vignette = 1.0 - smoothstep(0.5, 1.2, length(uv));
  color *= vignette * 0.8 + 0.2;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const Loader = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    // Create and compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);
    
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);
    
    // Create program and attach shaders
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    
    // Create vertex buffer
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    // Set up position attribute
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set up uniforms
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation loop
    const animate = (time) => {
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);
  
  return (
    <div className="relative h-10 w-20 rounded-full bg-purple-100 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
        </div>
      </div>
    </div>
  );
};

export default Loader;