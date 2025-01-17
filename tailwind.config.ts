import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths to your project
  ],
  theme: {
    extend: {
      animation: {
        'spin-3d': 'spin3D 2s linear infinite',
      },
      keyframes: {
        spin3D: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
