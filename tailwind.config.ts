import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'rum': {
            '50': '#f8f8fa',
            '100': '#f2f2f5',
            '200': '#e8e7ed',
            '300': '#d6d3df',
            '400': '#bfbacb',
            '500': '#a59db5',
            '600': '#9185a2',
            '700': '#7a6e8a',
            '800': '#6a5f78',
            '900': '#584f63',
            '950': '#393441',
        },
    
      },
    },
  },
  plugins: [],
};
export default config;
