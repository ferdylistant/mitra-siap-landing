import type { Config } from "tailwindcss";

// Warna diambil dari logo dan antarmuka aplikasi SIAP.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        ink: "#0B1B3A",
        soft: "#4A5878",
        app: "#0D47A1",
        brand: {
          DEFAULT: "#0E3FA8",
          deep: "#0A2F80",
          bright: "#2D8CEB",
          sky: "#EEF5FF",
          mist: "#D6E7FC",
          ice: "#BFE3FF",
        },
        night: "#061230",
        alert: "#F04438",
        ok: "#12805C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1280px",
      },
      boxShadow: {
        phone: "0 50px 100px -20px rgba(6,18,48,.45), 0 30px 60px -30px rgba(6,18,48,.5)",
        card: "0 1px 2px rgba(11,27,58,.04), 0 12px 32px -12px rgba(11,27,58,.14)",
        lift: "0 2px 4px rgba(11,27,58,.04), 0 24px 48px -16px rgba(14,63,168,.28)",
        glow: "0 0 0 1px rgba(255,255,255,.12), 0 20px 50px -12px rgba(0,0,0,.35)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        wave: {
          from: { transform: "translate3d(-90px,0,0)" },
          to: { transform: "translate3d(85px,0,0)" },
        },
        ping2: {
          "0%": { transform: "scale(1)", opacity: ".55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        ping2: "ping2 2s cubic-bezier(0,0,.2,1) infinite",
        shine: "shine 6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
