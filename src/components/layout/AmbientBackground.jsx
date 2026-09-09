export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-surface">
      {/* =====================================================
          GRAPH PAPER
      ====================================================== */}

      <div
        className="
          absolute inset-0
          opacity-[0.08]
          bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Larger secondary grid */}

      <div
        className="
          absolute inset-0
          opacity-[0.035]
          bg-[linear-gradient(to_right,theme(colors.accent.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.accent.DEFAULT)_1px,transparent_1px)]
          bg-[size:200px_200px]
        "
      />

      {/* =====================================================
          AMBIENT GLOW
      ====================================================== */}

      <div
        className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-primary/15
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-accent/10
          blur-[120px]
        "
      />

      {/* Moving glow */}

      <div
        className="
          absolute
          top-1/2
          -left-[300px]
          w-[600px]
          h-[180px]
          rounded-full
          bg-primary/10
          blur-[100px]
        "
      />

      <div
        className="
          absolute
          top-1/3
          -right-[300px]
          w-[600px]
          h-[180px]
          rounded-full
          bg-accent/10
          blur-[100px]
        "
      />


      {/* =====================================================
          CENTER GLOW / VIGNETTE
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,theme(colors.surface)_100%)]
          opacity-70
        "
      />

      {/* Soft dark overlay */}

      {/* <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-surface/40
        "
      /> */}

    </div>
  );
}
