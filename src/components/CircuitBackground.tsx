"use client";

import { useRef, useEffect, useCallback } from "react";

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
}

interface Pad {
  x: number;
  y: number;
}

interface Pulse {
  traceIndex: number; // which trace (chain of segments) this pulse is on
  segments: number[]; // indices into the segments array for this trace
  progress: number; // 0-1 along the full trace
  speed: number; // progress per frame
  tailLength: number; // how long the trailing glow is (in progress units)
}

const GRID = 40;
const TRACE_COLOR = "rgba(0, 255, 136,";
const BASE_ALPHA = 0.06;
const PAD_RADIUS = 3;
const TRACE_WIDTH = 1.5;
const PULSE_COUNT = 6;
const PULSE_GLOW_RADIUS = 4;

// Group segments into connected traces (chains)
interface Trace {
  segmentIndices: number[];
  totalLength: number;
}

function generateCircuit(
  width: number,
  height: number
): { segments: Segment[]; pads: Pad[]; traces: Trace[] } {
  const segments: Segment[] = [];
  const pads: Pad[] = [];
  const traces: Trace[] = [];
  const cols = Math.ceil(width / GRID);
  const rows = Math.ceil(height / GRID);
  const occupied = new Set<string>();

  const traceCount = Math.floor((cols * rows) / 8);

  for (let t = 0; t < traceCount; t++) {
    let x = Math.floor(Math.random() * cols) * GRID;
    let y = Math.floor(Math.random() * rows) * GRID;

    const key = `${x},${y}`;
    if (occupied.has(key)) continue;

    pads.push({ x, y });
    occupied.add(key);

    const traceSegmentIndices: number[] = [];
    const steps = 2 + Math.floor(Math.random() * 5);
    let horizontal = Math.random() > 0.5;

    for (let s = 0; s < steps; s++) {
      const len = (1 + Math.floor(Math.random() * 4)) * GRID;
      const dir = Math.random() > 0.5 ? 1 : -1;

      let nx: number, ny: number;
      if (horizontal) {
        nx = x + len * dir;
        ny = y;
      } else {
        nx = x;
        ny = y + len * dir;
      }

      nx = Math.max(0, Math.min(nx, width));
      ny = Math.max(0, Math.min(ny, height));

      if (nx !== x || ny !== y) {
        const segLength = Math.hypot(nx - x, ny - y);
        const idx = segments.length;
        segments.push({ x1: x, y1: y, x2: nx, y2: ny, length: segLength });
        traceSegmentIndices.push(idx);

        const padKey = `${nx},${ny}`;
        if (!occupied.has(padKey)) {
          pads.push({ x: nx, y: ny });
          occupied.add(padKey);
        }

        x = nx;
        y = ny;
      }

      horizontal = !horizontal;
    }

    if (traceSegmentIndices.length > 0) {
      const totalLength = traceSegmentIndices.reduce(
        (sum, i) => sum + segments[i].length,
        0
      );
      traces.push({ segmentIndices: traceSegmentIndices, totalLength });
    }
  }

  return { segments, pads, traces };
}

function spawnPulse(traces: Trace[]): Pulse {
  const traceIndex = Math.floor(Math.random() * traces.length);
  const trace = traces[traceIndex];
  return {
    traceIndex,
    segments: trace.segmentIndices,
    progress: 0,
    speed: 0.003 + Math.random() * 0.005,
    tailLength: 0.15 + Math.random() * 0.2,
  };
}

// Get position along a trace at a given progress (0-1)
function getPositionOnTrace(
  progress: number,
  trace: Trace,
  segments: Segment[]
): { x: number; y: number } | null {
  if (progress < 0 || progress > 1) return null;

  const targetDist = progress * trace.totalLength;
  let accumulated = 0;

  for (const idx of trace.segmentIndices) {
    const seg = segments[idx];
    if (accumulated + seg.length >= targetDist) {
      const t = (targetDist - accumulated) / seg.length;
      return {
        x: seg.x1 + (seg.x2 - seg.x1) * t,
        y: seg.y1 + (seg.y2 - seg.y1) * t,
      };
    }
    accumulated += seg.length;
  }

  // End of trace
  const lastIdx = trace.segmentIndices[trace.segmentIndices.length - 1];
  const last = segments[lastIdx];
  return { x: last.x2, y: last.y2 };
}

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const circuitRef = useRef<{
    segments: Segment[];
    pads: Pad[];
    traces: Trace[];
  } | null>(null);
  const pulsesRef = useRef<Pulse[]>([]);
  const rafRef = useRef<number>(0);

  // Draw static traces once to offscreen canvas
  const drawStatic = useCallback(() => {
    const circuit = circuitRef.current;
    const canvas = canvasRef.current;
    if (!circuit || !canvas) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    const { segments, pads } = circuit;

    // Draw segments
    ctx.strokeStyle = `${TRACE_COLOR} ${BASE_ALPHA})`;
    ctx.lineWidth = TRACE_WIDTH;
    ctx.lineCap = "round";

    for (const seg of segments) {
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.stroke();
    }

    // Draw pads
    ctx.fillStyle = `${TRACE_COLOR} ${BASE_ALPHA})`;
    for (const pad of pads) {
      ctx.beginPath();
      ctx.arc(pad.x, pad.y, PAD_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    staticCanvasRef.current = offscreen;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const staticCanvas = staticCanvasRef.current;
    const circuit = circuitRef.current;
    if (!canvas || !staticCanvas || !circuit) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { segments, traces } = circuit;
    const pulses = pulsesRef.current;

    // Clear and stamp static layer
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(staticCanvas, 0, 0);

    // Update and draw pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      pulse.progress += pulse.speed;

      // Respawn when fully past the trace
      if (pulse.progress - pulse.tailLength > 1) {
        pulses[i] = spawnPulse(traces);
        continue;
      }

      const trace = traces[pulse.traceIndex];

      // Draw glowing dots along the tail
      const steps = 8;
      for (let s = 0; s <= steps; s++) {
        const t = pulse.progress - (s / steps) * pulse.tailLength;
        const pos = getPositionOnTrace(t, trace, segments);
        if (!pos) continue;

        const fade = 1 - s / steps;
        const alpha = 0.5 * fade;

        ctx.shadowColor = `${TRACE_COLOR} ${0.6 * fade})`;
        ctx.shadowBlur = PULSE_GLOW_RADIUS * fade;
        ctx.fillStyle = `${TRACE_COLOR} ${alpha})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2 * fade + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      circuitRef.current = generateCircuit(canvas.width, canvas.height);
      drawStatic();

      // Spawn initial pulses staggered across traces
      const traces = circuitRef.current!.traces;
      pulsesRef.current = [];
      for (let i = 0; i < PULSE_COUNT; i++) {
        const p = spawnPulse(traces);
        p.progress = -Math.random(); // stagger start times
        pulsesRef.current.push(p);
      }
    };

    init();
    window.addEventListener("resize", init);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, drawStatic]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
