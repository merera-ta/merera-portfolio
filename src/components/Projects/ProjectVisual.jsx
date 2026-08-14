// Abstract, purely decorative UI mockups standing in for real project
// screenshots — one composition per project type, built from shapes rather
// than any real interface, so they can't be mistaken for an actual
// screenshot. Swap these for real screenshots any time by rendering an
// <img> in ProjectShowcase instead.

function Chrome() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/80">
      <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
      <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="h-full w-full flex flex-col">
      <Chrome />
      <div className="flex-1 grid grid-cols-4 gap-3 p-4">
        <div className="col-span-1 rounded-lg bg-elevated border border-border/70 p-3 flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full ${i === 1 ? 'bg-accent/60' : 'bg-border'}`} style={{ width: `${70 - i * 8}%` }} />
          ))}
        </div>
        <div className="col-span-3 grid grid-rows-3 gap-3">
          <div className="grid grid-cols-3 gap-3 row-span-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg bg-elevated border border-border/70 p-3 flex flex-col justify-between">
                <span className="h-2 w-8 rounded-full bg-border" />
                <span className="h-4 w-12 rounded-full bg-accent/50" />
              </div>
            ))}
          </div>
          <div className="row-span-2 rounded-lg bg-elevated border border-border/70 p-4 flex items-end gap-2">
            {[40, 65, 35, 80, 55, 90, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/70 to-violet/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EcommerceVisual() {
  return (
    <div className="h-full w-full flex flex-col">
      <Chrome />
      <div className="flex-1 grid grid-cols-3 gap-3 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg bg-elevated border border-border/70 overflow-hidden flex flex-col">
            <div
              className="h-14 w-full"
              style={{
                background:
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgb(var(--accent)/0.35), rgb(var(--violet)/0.25))'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, rgb(var(--violet)/0.3), transparent)'
                      : 'linear-gradient(135deg, rgb(var(--accent)/0.2), transparent)',
              }}
            />
            <div className="p-2 flex flex-col gap-1.5">
              <span className="h-2 w-3/4 rounded-full bg-border" />
              <span className="h-2 w-1/3 rounded-full bg-accent/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormVisual() {
  return (
    <div className="h-full w-full flex flex-col">
      <Chrome />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[220px] rounded-lg bg-elevated border border-border/70 p-4 flex flex-col gap-3">
          <span className="h-2.5 w-1/2 rounded-full bg-border" />
          {[...Array(3)].map((_, i) => (
            <span key={i} className="h-8 w-full rounded-md bg-surface-2 border border-border/70" />
          ))}
          <span className="h-8 w-2/3 self-end rounded-md bg-accent/60" />
        </div>
      </div>
    </div>
  )
}

function GenericVisual() {
  return (
    <div className="h-full w-full flex flex-col">
      <Chrome />
      <div className="flex-1 p-5 font-mono text-xs text-muted leading-relaxed space-y-2">
        <p><span className="text-violet">const</span> <span className="text-accent">app</span> = express()</p>
        <p><span className="text-violet">app</span>.use(cors())</p>
        <p><span className="text-violet">app</span>.get(<span className="text-amber">&apos;/api&apos;</span>, handler)</p>
      </div>
    </div>
  )
}

const VISUALS = {
  dashboard: DashboardVisual,
  ecommerce: EcommerceVisual,
  form: FormVisual,
}

function ProjectVisual({ type }) {
  const Visual = VISUALS[type] ?? GenericVisual
  return <Visual />
}

export default ProjectVisual
