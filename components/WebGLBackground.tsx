'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

function SubtleTexture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uTheme: { value: theme === 'dark' ? 1.0 : 0.0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: 1.0 - (e.clientY / window.innerHeight),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime * 0.3;
      material.uniforms.uTheme.value = THREE.MathUtils.lerp(
        material.uniforms.uTheme.value,
        theme === 'dark' ? 1.0 : 0.0,
        0.03
      );
      material.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.x,
        mousePos.x,
        0.02
      );
      material.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        material.uniforms.uMouse.value.y,
        mousePos.y,
        0.02
      );
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uTheme;
    uniform vec2 uMouse;
    varying vec2 vUv;
    
    // Simple noise function
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Fractal Brownian Motion for smooth smoke
    float fbm(vec2 st, float t) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 6; i++) {
        value += amplitude * smoothNoise(st * frequency + t);
        frequency *= 2.1;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Mouse creates distortion field
      vec2 mouseOffset = (uMouse - 0.5) * 0.6;
      float dist = length(uv - uMouse);
      float mouseInfluence = smoothstep(0.8, 0.0, dist);
      
      // Create flowing smoke from bottom
      vec2 smokeUv = uv;
      smokeUv.y = smokeUv.y * 2.0 - 0.5; // Concentrate at bottom
      smokeUv.y -= uTime * 0.015; // EVEN SLOWER upward drift
      
      // Apply swirling motion - EVEN SLOWER
      float swirl = sin(smokeUv.y * 3.0 + uTime * 0.08) * 0.15;
      smokeUv.x += swirl + mouseOffset.x * 0.8;
      
      // Add mouse-driven turbulence
      smokeUv.x += sin(smokeUv.y * 5.0 + mouseInfluence * 6.28) * mouseInfluence * 0.3;
      smokeUv.y += cos(smokeUv.x * 4.0) * 0.1;
      
      // Layer multiple smoke densities for depth - EVEN SLOWER
      float smoke1 = fbm(smokeUv * 2.5, uTime * 0.02);
      float smoke2 = fbm(smokeUv * 3.8 + vec2(50.0, 25.0), uTime * 0.025);
      float smoke3 = fbm(smokeUv * 5.2 + mouseOffset * 2.0, uTime * 0.03);
      
      // Combine with varying opacity for depth/transparency
      float smoke = smoke1 * 0.45 + smoke2 * 0.35 + smoke3 * 0.2;
      
      // Create smooth, billowing edges
      smoke = pow(smoke, 1.2);
      smoke = smoothstep(0.2, 0.8, smoke);
      
      // Add density variation (darker centers, lighter edges)
      float density = fbm(smokeUv * 1.8, uTime * 0.015);
      smoke *= mix(0.3, 1.0, density);
      
      // Mouse interaction adds wispy trails - EVEN SLOWER
      smoke += mouseInfluence * 0.2 * sin(uTime * 1.0 + dist * 10.0);
      
      // Dark mode: dark background with BRIGHT WHITE smoke
      vec3 darkBase = vec3(0.01, 0.01, 0.01);
      vec3 whiteSmokeColor = vec3(0.95, 0.96, 0.98);
      vec3 darkModeColor = mix(darkBase, whiteSmokeColor, smoke * 0.15);
      
      // Light mode: white background with PITCH BLACK smoke
      vec3 lightBase = vec3(0.98, 0.98, 0.98);
      vec3 blackSmokeColor = vec3(0.0, 0.0, 0.0);
      vec3 lightModeColor = mix(lightBase, blackSmokeColor, smoke * 0.18);
      
      // Mix between modes
      vec3 finalColor = mix(lightModeColor, darkModeColor, uTheme);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 16, 16]} />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <SubtleTexture />
      </Canvas>
    </div>
  );
}
