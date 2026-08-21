import { useEffect, useRef, useState } from 'react'

/**
 * Hand-written WebGL. No three.js, no libraries.
 *
 * A distance-field scene raymarched in a single fragment shader: a slowly
 * turning brass core wrapped in three orbiting rings, standing on a polished
 * floor that reflects them. The rings are the point of the thing — a plan is
 * layers of protection around what matters, and you can see straight through
 * to the middle.
 */

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uSteps;

const vec3 BRASS   = vec3(0.82, 0.63, 0.32);
const vec3 OXBLOOD = vec3(0.255, 0.047, 0.004);
const vec3 INK     = vec3(0.043, 0.027, 0.020);

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

vec2 opU(vec2 a, vec2 b) {
  return a.x < b.x ? a : b;
}

// returns (distance, materialId)
vec2 map(vec3 p) {
  vec2 res = vec2(p.y + 0.95, 1.0);            // polished floor

  vec3 q = p;
  q.xz *= rot(uTime * 0.16);
  q.xy *= rot(0.42);
  res = opU(res, vec2(sdRoundBox(q, vec3(0.30), 0.17), 2.0));   // core

  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec3 r = p;
    r.yz *= rot(0.60 + fi * 0.45 + sin(uTime * 0.13 + fi * 1.7) * 0.11);
    r.xz *= rot(uTime * (0.11 + fi * 0.05) + fi * 2.1);
    res = opU(res, vec2(sdTorus(r, vec2(0.86 + fi * 0.31, 0.021 + fi * 0.005)), 3.0));
  }
  return res;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.0012;
  return normalize(
    e.xyy * map(p + e.xyy).x +
    e.yyx * map(p + e.yyx).x +
    e.yxy * map(p + e.yxy).x +
    e.xxx * map(p + e.xxx).x
  );
}

vec2 march(vec3 ro, vec3 rd, float tmax) {
  float t = 0.02;
  float mat = 0.0;
  for (int i = 0; i < 140; i++) {
    if (float(i) >= uSteps) break;
    vec3 p = ro + rd * t;
    vec2 h = map(p);
    if (h.x < 0.00055 * t) { mat = h.y; break; }
    t += h.x * 0.88;
    if (t > tmax) { mat = 0.0; break; }
  }
  if (t > tmax) mat = 0.0;
  return vec2(t, mat);
}

float softShadow(vec3 ro, vec3 rd) {
  float res = 1.0;
  float t = 0.05;
  for (int i = 0; i < 40; i++) {
    float h = map(ro + rd * t).x;
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.02, 0.28);
    if (res < 0.005 || t > 9.0) break;
  }
  return clamp(res, 0.0, 1.0);
}

float ambientOcc(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float hr = 0.015 + 0.13 * float(i) / 4.0;
    occ += (hr - map(p + n * hr).x) * sca;
    sca *= 0.82;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

vec3 skyline(vec3 rd) {
  float h = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(INK * 0.11, OXBLOOD * 0.075, pow(h, 1.6));
  float glow = pow(max(0.0, dot(rd, normalize(vec3(0.32, 0.24, -1.0)))), 5.0);
  return col + OXBLOOD * glow * 0.30 + BRASS * pow(glow, 2.0) * 0.07;
}

vec3 shade(vec3 p, vec3 n, vec3 rd, float mat) {
  vec3 key  = normalize(vec3(0.72, 0.90, 0.55));
  vec3 fill = normalize(vec3(-0.85, 0.28, -0.42));

  vec3 albedo;
  float rough, metal;
  if (mat < 1.5) {
    albedo = vec3(0.030, 0.017, 0.013);
    rough  = 0.32;
    metal  = 0.25;
  } else if (mat < 2.5) {
    albedo = vec3(0.085, 0.045, 0.032);
    rough  = 0.24;
    metal  = 0.55;
  } else {
    albedo = BRASS * 0.55;
    rough  = 0.16;
    metal  = 1.0;
  }

  float sh  = softShadow(p + n * 0.012, key);
  float occ = ambientOcc(p, n);

  float ndl = max(dot(n, key), 0.0);
  vec3 lit = albedo * ndl * vec3(1.0, 0.87, 0.68) * 1.75 * sh;
  lit += albedo * max(dot(n, fill), 0.0) * OXBLOOD * 3.2;
  lit += albedo * OXBLOOD * 1.1 * occ;

  vec3 h = normalize(key - rd);
  float spec = pow(max(dot(n, h), 0.0), mix(24.0, 220.0, 1.0 - rough));
  lit += mix(vec3(1.0), BRASS, metal) * spec * sh * mix(0.35, 1.6, metal);

  float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
  lit += BRASS * fres * mix(0.10, 0.55, metal);

  return lit * occ;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // camera — slow drift plus a little pointer parallax. The dolly opens up on
  // narrow viewports so the rings never crop on a phone.
  float aspect = uRes.x / max(uRes.y, 1.0);
  float dist = 6.5 * clamp(0.80 / max(aspect, 0.001), 1.0, 1.95);
  float ang = 0.32 + uPointer.x * 0.26 + sin(uTime * 0.07) * 0.06;
  float hgt = (0.85 + uPointer.y * 0.40) * (dist / 6.5);
  vec3 ro = vec3(sin(ang) * dist, hgt, cos(ang) * dist);
  vec3 ta = vec3(0.0, 0.04, 0.0);

  vec3 fwd = normalize(ta - ro);
  vec3 rgt = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 upv = cross(fwd, rgt);
  vec3 rd  = normalize(uv.x * rgt + uv.y * upv + 1.55 * fwd);

  vec3 col = skyline(rd);

  vec2 hit = march(ro, rd, dist + 18.0);
  if (hit.y > 0.5) {
    vec3 p = ro + rd * hit.x;
    vec3 n = calcNormal(p);
    col = shade(p, n, rd, hit.y);

    // one reflection bounce off the floor so the rings sit in something
    if (hit.y < 1.5) {
      vec3 refl = reflect(rd, n);
      vec2 rh = march(p + n * 0.02, refl, 12.0);
      vec3 rcol = skyline(refl);
      if (rh.y > 0.5) {
        vec3 rp = p + n * 0.02 + refl * rh.x;
        rcol = shade(rp, calcNormal(rp), refl, rh.y);
      }
      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      col = mix(col, rcol, 0.34 * fres + 0.05);
      col *= 1.0 - smoothstep(2.2, 9.5, length(p.xz)) * 0.88;   // fade the floor out
    }

    col = mix(col, skyline(rd), 1.0 - exp(-0.0035 * hit.x * hit.x));
  }

  // grade: lift into oxblood, gentle filmic curve, vignette
  col = mix(col, OXBLOOD * 0.22, 0.10);
  col *= 0.90;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  float vig = 1.0 - 1.10 * dot(uv * vec2(0.74, 1.00), uv * vec2(0.74, 1.00));
  col *= clamp(vig, 0.0, 1.0);
  col = pow(max(col, 0.0), vec3(0.4545));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) console.warn(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function Rings3D({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)
  const [degraded, setDegraded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' }) as
        | WebGLRenderingContext
        | null) ?? (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      setFailed(true)
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      setFailed(true)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (import.meta.env.DEV) console.warn(gl.getProgramInfoLog(program))
      setFailed(true)
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uPointer = gl.getUniformLocation(program, 'uPointer')
    const uSteps = gl.getUniformLocation(program, 'uSteps')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 767px)').matches
    const steps = small ? 62 : 104
    const maxDpr = small ? 1.25 : 1.6

    const scaleRef = { current: 1 }
    let dirty = true
    let width = 0
    let height = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr) * scaleRef.current
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (w === width && h === height) return
      width = w
      height = h
      dirty = true
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1
      target.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', resize)

    let visible = true
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
    })
    io.observe(canvas)

    // Adaptive quality. A software rasteriser or a weak GPU can take seconds per
    // frame on a full-screen raymarch, which starves the whole page — scroll
    // reveals and observers included. So watch the frame cost: drop resolution
    // once, and if it is still hopeless, give up and let the static field show.
    let drawn = 0
    let elapsed = 0
    let bailed = false

    let raf = 0
    const start = performance.now()
    let last = start
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) {
        last = now
        return
      }
      resize()
      // Reduced motion: hold one still frame instead of burning a GPU on it.
      if (reduced && !dirty) return
      dirty = false
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045
      gl.uniform2f(uRes, width, height)
      gl.uniform1f(uTime, reduced ? 4.2 : (now - start) / 1000)
      gl.uniform2f(uPointer, pointer.x, -pointer.y * 0.6)
      gl.uniform1f(uSteps, steps)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (bailed) return
      elapsed += now - last
      last = now
      drawn += 1
      if (drawn === 12) {
        const perFrame = elapsed / drawn
        if (perFrame > 34 && scaleRef.current === 1) {
          scaleRef.current = 0.6
          width = 0
          height = 0
          resize()
          drawn = 0
          elapsed = 0
        } else if (perFrame > 34) {
          bailed = true
          cancelAnimationFrame(raf)
          setDegraded(true)
        }
      }
    }
    resize()
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  if (failed || degraded) {
    // No WebGL, or a GPU that cannot keep up: a still, but still handsome, field.
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 90% at 62% 34%, rgba(198,161,91,0.22) 0%, rgba(65,12,1,0.55) 38%, #0b0705 78%)',
        }}
      />
    )
  }

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
