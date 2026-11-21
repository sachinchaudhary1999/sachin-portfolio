import { useCallback, useEffect, useRef, useState } from "react";
import { FiPlay, FiRotateCcw } from "react-icons/fi";
import { useMediaQuery, usePrefersReducedMotion } from "../hooks/useMediaQuery";

/* What I built at each node (all drawn from the BiteRush / TravelNest case studies). */
const DETAILS = {
  client: {
    title: "React client",
    items: [
      "Customer storefront, cart and order tracking",
      "Restaurant owner and admin panels",
      "Protected routes and responsive layouts in Tailwind CSS",
    ],
  },
  api: {
    title: "Express API",
    items: [
      "RESTful routes with JWT auth and role-based access",
      "Cart and order lifecycle workflows",
      "Booking and availability validation",
    ],
  },
  db: {
    title: "MongoDB",
    items: [
      "Models for users, listings, orders, bookings and inventory",
      "Data behind admin dashboards and analytics",
    ],
  },
  payments: {
    title: "Payments",
    items: ["Stripe and Razorpay integration for checkout in BiteRush"],
  },
  media: {
    title: "Cloudinary",
    items: ["Image uploads and optimized delivery for menus and listings"],
  },
};

/* Two layouts: wide for tablets and up, tall for phones. Same graph, different coordinates. */
const LAYOUTS = {
  wide: {
    viewBox: "0 0 640 360",
    nodes: {
      client: { x: 16, y: 150, w: 150, h: 84, sub: "Tailwind CSS" },
      api: { x: 234, y: 150, w: 164, h: 84, sub: "Node.js, JWT" },
      payments: { x: 470, y: 34, w: 154, h: 68, sub: "Stripe / Razorpay" },
      db: { x: 470, y: 158, w: 154, h: 68, sub: "Collections" },
      media: { x: 470, y: 282, w: 154, h: 68, sub: "Image storage" },
    },
    edges: {
      req: "M166 192 H234",
      db: "M398 192 H470",
      pay: "M398 172 H434 V68 H470",
      media: "M398 212 H434 V316 H470",
    },
  },
  tall: {
    viewBox: "0 0 360 440",
    nodes: {
      client: { x: 90, y: 8, w: 180, h: 72, sub: "Tailwind CSS" },
      api: { x: 90, y: 140, w: 180, h: 76, sub: "Node.js, JWT" },
      payments: { x: 4, y: 328, w: 112, h: 72, sub: "Stripe / Razorpay" },
      db: { x: 124, y: 328, w: 112, h: 72, sub: "Collections" },
      media: { x: 244, y: 328, w: 112, h: 72, sub: "Image storage" },
    },
    edges: {
      req: "M180 80 V140",
      db: "M180 216 V328",
      pay: "M138 216 V272 H60 V328",
      media: "M222 216 V272 H300 V328",
    },
  },
};

const TITLES = { client: "React client", api: "Express API", db: "MongoDB", payments: "Payments", media: "Cloudinary" };

/* The scripted request. Illustrative: it shows the shape of the flow, not literal routes. */
const STEPS = [
  { edge: "req", from: "client", to: "api", log: "POST /api/orders" },
  { node: "api", log: "verifyJWT ok, role: customer" },
  { edge: "db", from: "api", to: "db", log: "insert order document" },
  { edge: "pay", from: "api", to: "payments", log: "createPayment(order)" },
  { edge: "req", from: "api", to: "client", reverse: true, log: "201 Created { orderId }" },
];

const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p));

export default function RequestFlow({ replayToken = 0 }) {
  const isWide = useMediaQuery("(min-width: 640px)", true);
  const reduced = usePrefersReducedMotion();
  const layout = isWide ? LAYOUTS.wide : LAYOUTS.tall;

  const [selected, setSelected] = useState("api");
  const [activeNodes, setActiveNodes] = useState([]);
  const [litEdges, setLitEdges] = useState([]);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);

  const pathRefs = useRef({});
  const packetRef = useRef(null);
  const runId = useRef(0);

  const movePacket = useCallback(
    (edge, reverse, ms, id) =>
      new Promise((resolve) => {
        const path = pathRefs.current[edge];
        const packet = packetRef.current;
        if (!path || !packet || ms === 0) return resolve();
        const len = path.getTotalLength();
        const t0 = performance.now();
        packet.style.opacity = "1";
        const tick = (now) => {
          if (runId.current !== id) return resolve();
          const p = Math.min(1, (now - t0) / ms);
          const d = len * (reverse ? 1 - ease(p) : ease(p));
          const pt = path.getPointAtLength(d);
          packet.setAttribute("cx", pt.x);
          packet.setAttribute("cy", pt.y);
          if (p < 1) requestAnimationFrame(tick);
          else {
            packet.style.opacity = "0";
            resolve();
          }
        };
        requestAnimationFrame(tick);
      }),
    []
  );

  const run = useCallback(async () => {
    const id = ++runId.current;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    setRunning(true);
    setLog([]);
    setActiveNodes([]);
    setLitEdges([]);
    for (const step of STEPS) {
      if (runId.current !== id) return;
      if (step.edge) {
        setLitEdges((e) => [...new Set([...e, step.edge])]);
        setActiveNodes([step.from]);
        await movePacket(step.edge, step.reverse, reduced ? 0 : 650, id);
        setActiveNodes([step.to]);
      } else {
        setActiveNodes([step.node]);
        await wait(reduced ? 150 : 550);
      }
      if (runId.current !== id) return;
      setLog((l) => [...l, step.log]);
      await wait(reduced ? 150 : 220);
    }
    if (runId.current === id) {
      setActiveNodes(["client"]);
      setRunning(false);
    }
  }, [movePacket, reduced]);

  // One orchestrated moment: play once shortly after load (skipped for reduced motion).
  useEffect(() => {
    if (reduced) return undefined;
    const t = setTimeout(run, 1500);
    const runs = runId;
    return () => {
      clearTimeout(t);
      runs.current++; // cancels any in-flight animation
    };
  }, [run, reduced]);

  // Replays triggered from the command palette.
  useEffect(() => {
    if (replayToken > 0) run();
  }, [replayToken, run]);

  const detail = DETAILS[selected];

  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">How an order moves through the stack</p>
          <p className="text-xs text-muted">Illustrative request path. Select any part to see what I built.</p>
        </div>
        <button type="button" onClick={run} disabled={running} className="btn btn-ghost shrink-0 !px-3 !py-1.5 disabled:opacity-60">
          {running ? <FiPlay aria-hidden="true" /> : <FiRotateCcw aria-hidden="true" />}
          {running ? "Running" : "Replay"}
        </button>
      </div>

      <div className="relative px-2 pt-3 sm:px-4">
        {/* faint drafting grid behind the diagram only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(var(--line)/0.45)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.45)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        />
        <svg
          viewBox={layout.viewBox}
          role="group"
          aria-label="Diagram: React client, Express API, MongoDB, payments and Cloudinary"
          className="relative mx-auto block w-full max-w-[40rem]"
        >
          {Object.entries(layout.edges).map(([name, d]) => (
            <path
              key={name}
              d={d}
              ref={(el) => (pathRefs.current[name] = el)}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${litEdges.includes(name) ? "stroke-accent" : "stroke-line"}`}
            />
          ))}

          {Object.entries(layout.nodes).map(([id, n]) => {
            const on = activeNodes.includes(id);
            const sel = selected === id;
            return (
              <g
                key={id}
                role="button"
                tabIndex={0}
                aria-pressed={sel}
                aria-label={`${TITLES[id]}: ${DETAILS[id].items[0]}`}
                onClick={() => setSelected(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(id);
                  }
                }}
                className="group cursor-pointer outline-none"
                style={{ filter: on ? "drop-shadow(0 0 10px rgb(var(--accent) / 0.5))" : "none", transition: "filter 0.3s" }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="10"
                  className={`fill-surface transition-colors duration-300 group-focus-visible:stroke-accent ${
                    on || sel ? "stroke-accent" : "stroke-line group-hover:stroke-accent/60"
                  }`}
                  strokeWidth={on || sel ? 2 : 1.5}
                />
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 3} textAnchor="middle" className="fill-ink text-[15px] font-semibold">
                  {TITLES[id]}
                </text>
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 16} textAnchor="middle" className="fill-muted text-[12px]">
                  {n.sub}
                </text>
              </g>
            );
          })}

          <circle ref={packetRef} r="6" cx="0" cy="0" style={{ opacity: 0 }} className="fill-accent" />
        </svg>
      </div>

      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
        <div className="bg-surface p-4">
          <p className="text-sm font-medium">{detail.title}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            {detail.items.map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface p-4">
          <p className="text-sm font-medium">Request log</p>
          <ol role="log" aria-live="polite" className="mt-2 min-h-[6.5rem] space-y-1 font-mono text-[0.8125rem] text-muted">
            {log.length === 0 && <li className="text-muted/70">Press Replay to send a request.</li>}
            {log.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">$</span>
                <span className="break-all text-ink">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
