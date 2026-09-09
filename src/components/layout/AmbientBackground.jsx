import React, { useEffect, useState } from "react";

const MONEY_TYPES = [
  {
    symbol: "💵",
    type: "bill",
    minSize: 17,
    maxSize: 27,
    minDuration: 7,
    maxDuration: 12,
  },
  {
    symbol: "💸",
    type: "flying",
    minSize: 16,
    maxSize: 25,
    minDuration: 5,
    maxDuration: 9,
  },
  {
    symbol: "💰",
    type: "bag",
    minSize: 19,
    maxSize: 29,
    minDuration: 8,
    maxDuration: 13,
  },
  {
    symbol: "🪙",
    type: "coin",
    minSize: 13,
    maxSize: 21,
    minDuration: 3,
    maxDuration: 6,
  },
  {
    symbol: "₿",
    type: "crypto",
    minSize: 14,
    maxSize: 22,
    minDuration: 4,
    maxDuration: 8,
  },
  {
    symbol: "$",
    type: "dollar",
    minSize: 15,
    maxSize: 24,
    minDuration: 5,
    maxDuration: 10,
  },
];

export default function AnimatedBackground() {
  const [cash, setCash] = useState([]);

  useEffect(() => {
    let counter = 0;

    const createParticle = () => {
      const money = MONEY_TYPES[Math.floor(Math.random() * MONEY_TYPES.length)];

      const id = counter++;

      // Random starting position
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      // Random movement direction
      const moveX = -250 + Math.random() * 500;
      const moveY = -250 + Math.random() * 500;

      const size =
        money.minSize + Math.random() * (money.maxSize - money.minSize);

      const duration =
        money.minDuration +
        Math.random() * (money.maxDuration - money.minDuration);

      // Coin gets more rotation
      const rotation =
        money.type === "coin"
          ? 360 + Math.random() * 720
          : -180 + Math.random() * 360;

      const particle = {
        id,
        ...money,
        startX,
        startY,
        moveX,
        moveY,
        size,
        duration,
        rotation,
      };

      setCash((prev) => [...prev.slice(-35), particle]);

      // Remove after animation
      setTimeout(() => {
        setCash((prev) => prev.filter((item) => item.id !== id));
      }, duration * 1000);
    };

    // Initial particles
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        createParticle();
      }, i * 350);
    }

    // Continuous flow
    const interval = setInterval(() => {
      const amount = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < amount; i++) {
        createParticle();
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-surface">
      {/* =====================================================
          GRAPH PAPER
      ====================================================== */}

      <div
        className="
          absolute inset-0
          opacity-[0.08]
          bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT)_1px,transparent_1px)]
          bg-[size:40px_40px]
          animate-gridMove
        "
      />

      {/* Larger secondary grid */}

      <div
        className="
          absolute inset-0
          opacity-[0.035]
          bg-[linear-gradient(to_right,theme(colors.accent.DEFAULT)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.accent.DEFAULT)_1px,transparent_1px)]
          bg-[size:200px_200px]
          animate-gridMoveReverse
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
          animate-pulse
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
          animate-pulse
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
          animate-lightSweep
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
          animate-lightSweepReverse
        "
      />

      {/* =====================================================
          💰 FINANCIAL PARTICLES
      ====================================================== */}

      {cash.map((item) => (
        <div
          key={item.id}
          className={`
            absolute
            select-none
            will-change-transform
            ${
              item.type === "coin"
                ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.45)]"
                : item.type === "crypto"
                  ? "drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                  : item.type === "dollar"
                    ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.35)]"
                    : "drop-shadow-[0_0_8px_rgba(34,197,94,0.25)]"
            }
          `}
          style={{
            left: `${item.startX}%`,
            top: `${item.startY}%`,
            fontSize: `${item.size}px`,
            animation: `moneyFlow-${item.id} ${item.duration}s linear forwards`,
          }}
        >
          {item.symbol}

          <style>
            {`
              @keyframes moneyFlow-${item.id} {

                0% {
                  transform:
                    translate3d(0, 0, 0)
                    rotate(0deg)
                    scale(0.7);

                  opacity: 0;
                }

                10% {
                  opacity: 0.75;
                }

                45% {
                  opacity: 0.9;
                }

                80% {
                  opacity: 0.55;
                }

                100% {
                  transform:
                    translate3d(
                      ${item.moveX}px,
                      ${item.moveY}px,
                      0
                    )
                    rotate(${item.rotation}deg)
                    scale(
                      ${item.type === "coin" ? "1" : "0.9"}
                    );

                  opacity: 0;
                }
              }
            `}
          </style>
        </div>
      ))}

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

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-surface/40
        "
      />

      {/* =====================================================
          GLOBAL ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes gridMove {
            from {
              background-position: 0 0;
            }

            to {
              background-position: 40px 40px;
            }
          }

          @keyframes gridMoveReverse {
            from {
              background-position: 0 0;
            }

            to {
              background-position: -200px -200px;
            }
          }

          @keyframes lightSweep {
            0% {
              transform: translateX(0) translateY(0);
            }

            50% {
              transform: translateX(70vw) translateY(-10vh);
            }

            100% {
              transform: translateX(120vw) translateY(10vh);
            }
          }

          @keyframes lightSweepReverse {
            0% {
              transform: translateX(0) translateY(0);
            }

            50% {
              transform: translateX(-70vw) translateY(10vh);
            }

            100% {
              transform: translateX(-120vw) translateY(-10vh);
            }
          }
        `}
      </style>
    </div>
  );
}
