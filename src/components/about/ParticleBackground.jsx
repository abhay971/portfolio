import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false, // Disable for performance
      depth: false,
      stencil: false,
      powerPreference: 'high-performance', // Request high performance
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Set canvas size
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setSize();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setSize, 100); // Debounce resize
    };
    window.addEventListener('resize', handleResize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Optimized fragment shader - fewer particles
    const fragmentShaderSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 color = vec3(0.0);

        // Reduced to 40 particles for better performance
        for (int i = 0; i < 40; i++) {
          float fi = float(i);
          vec2 seed = vec2(fi * 0.1, fi * 0.3);

          float x = hash(seed) + sin(uTime * 0.08 + fi * 0.5) * 0.08;
          float y = fract(hash(seed + 0.5) - uTime * 0.04 * (0.5 + hash(seed + 1.0) * 0.5));

          vec2 particlePos = vec2(x, y);
          float dist = length(uv - particlePos);

          // Particle glow
          float glow = 0.0015 / (dist + 0.001);

          // Lime green color
          vec3 particleColor = vec3(0.64, 0.9, 0.33); // #a3e635
          color += particleColor * glow * 0.4;
        }

        // Subtle vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.6;
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create fullscreen quad
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');

    // Animation loop with FPS throttling and visibility detection
    let animationFrameId;
    const startTime = Date.now();
    let lastFrame = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let isVisible = true;

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          lastFrame = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = (currentTime) => {
      // Throttle to target FPS
      if (currentTime - lastFrame < frameInterval) {
        if (isVisible) {
          animationFrameId = requestAnimationFrame(render);
        } else {
          animationFrameId = null;
        }
        return;
      }
      lastFrame = currentTime;

      const time = (Date.now() - startTime) / 1000;

      gl.uniform1f(uTimeLocation, time);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

      gl.clearColor(0.04, 0.08, 0.06, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default ParticleBackground;
