import { useEffect, useMemo, useRef, useState } from 'react';
import { Move, Rotate3d, RotateCcw } from 'lucide-react';

type Mode = 'rotate' | 'move';

const SIZE = 150; // cube edge in px
const HALF = SIZE / 2;
const START = { x: -22, y: 35 }; // starting angle in degrees

/* Builds a 16x16 pixel texture (Minecraft-style) in the site's blue/dark palette.
   No image files needed. */
function makeTexture(kind: 'side' | 'top'): string {
  const size = 16;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const base = kind === 'top' ? ['#16345f', '#1b4177', '#214c8a'] : ['#0c192c', '#102240', '#14294d'];
  let seed = kind === 'top' ? 7 : 3;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      ctx.fillStyle = base[Math.floor(rnd() * base.length)];
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // bright "ore" specks in the accent blue
  for (let i = 0; i < 9; i++) {
    const x = 1 + Math.floor(rnd() * (size - 3));
    const y = 1 + Math.floor(rnd() * (size - 3));
    ctx.fillStyle = '#4a9eff';
    ctx.fillRect(x, y, 2, 1);
    ctx.fillStyle = '#9fd0ff';
    ctx.fillRect(x, y, 1, 1);
  }

  // dark block edge
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(0, 0, size, 1);
  ctx.fillRect(0, size - 1, size, 1);
  ctx.fillRect(0, 0, 1, size);
  ctx.fillRect(size - 1, 0, 1, size);

  return canvas.toDataURL();
}

const clamp = (v: number, lim: number) => Math.max(-lim, Math.min(lim, v));

// each face: where it sits in 3D, and how bright it is (fake lighting)
const FACES = [
  { name: 'front', tf: `translateZ(${HALF}px)`, tex: 'side', light: 1 },
  { name: 'back', tf: `rotateY(180deg) translateZ(${HALF}px)`, tex: 'side', light: 0.55 },
  { name: 'right', tf: `rotateY(90deg) translateZ(${HALF}px)`, tex: 'side', light: 0.8 },
  { name: 'left', tf: `rotateY(-90deg) translateZ(${HALF}px)`, tex: 'side', light: 0.65 },
  { name: 'top', tf: `rotateX(90deg) translateZ(${HALF}px)`, tex: 'top', light: 1.3 },
  { name: 'bottom', tf: `rotateX(-90deg) translateZ(${HALF}px)`, tex: 'side', light: 0.4 },
] as const;

export function MinecraftCube() {
  const [mode, setMode] = useState<Mode>('rotate');
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;

  const stage = useRef<HTMLDivElement>(null);
  const posEl = useRef<HTMLDivElement>(null);
  const cubeEl = useRef<HTMLDivElement>(null);

  const rot = useRef({ ...START });
  const vel = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const textures = useMemo(() => ({ side: makeTexture('side'), top: makeTexture('top') }), []);

  // tiny star field behind the cube (fixed positions so it doesn't flicker on re-render)
  const stars = useMemo(() => {
    let s = 11;
    const r = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    return Array.from({ length: 36 }, () => ({
      left: `${(r() * 100).toFixed(1)}%`,
      top: `${(r() * 100).toFixed(1)}%`,
      size: 1 + Math.floor(r() * 3),
      delay: `${(r() * 4).toFixed(1)}s`,
    }));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };

      if (modeRef.current === 'rotate') {
        rot.current.y += dx * 0.5;
        rot.current.x -= dy * 0.5;
        vel.current = { x: -dy * 0.2, y: dx * 0.2 };
      } else {
        const s = stage.current;
        const limX = s ? s.clientWidth / 2 - HALF * 1.3 : 80;
        const limY = s ? s.clientHeight / 2 - HALF * 1.3 : 80;
        target.current = {
          x: clamp(target.current.x + dx, Math.max(0, limX)),
          y: clamp(target.current.y + dy, Math.max(0, limY)),
        };
      }
    };
    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    let raf = 0;
    const tick = () => {
      if (!dragging.current) {
        // inertia + slow idle spin
        rot.current.x += vel.current.x;
        rot.current.y += vel.current.y + 0.25;
        vel.current.x *= 0.94;
        vel.current.y *= 0.94;
      }
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (posEl.current) {
        posEl.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (cubeEl.current) {
        cubeEl.current.style.transform = `rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const reset = () => {
    rot.current = { ...START };
    vel.current = { x: 0, y: 0 };
    target.current = { x: 0, y: 0 };
  };

  return (
    <div className="cx-stage" ref={stage}>
      <span className="cx-hint">DRAG THE CUBE</span>

      <div className="cx3-stars" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className="cx3-pos" ref={posEl}>
        <div className="cx3-float">
          <div
            className="cx3-cube"
            ref={cubeEl}
            onPointerDown={(e) => {
              e.preventDefault();
              dragging.current = true;
              last.current = { x: e.clientX, y: e.clientY };
              vel.current = { x: 0, y: 0 };
            }}
          >
            {FACES.map((f) => (
              <div
                key={f.name}
                className="cx3-face"
                style={{
                  transform: f.tf,
                  backgroundImage: `url(${textures[f.tex]})`,
                  filter: `brightness(${f.light})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cx-controls">
        <button className={mode === 'rotate' ? 'on' : ''} onClick={() => setMode('rotate')}>
          <Rotate3d size={16} /> Rotate
        </button>
        <button className={mode === 'move' ? 'on' : ''} onClick={() => setMode('move')}>
          <Move size={16} /> Move
        </button>
        <button onClick={reset} aria-label="Reset cube">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
