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
        'spray': {
        '50': '#edfefe',
        '100': '#d2fbfb',
        '200': '#aaf4f7',
        '300': '#84edf3',
        '400': '#2dd6e3',
        '500': '#11b9c9',
        '600': '#1194a9',
        '700': '#157789',
        '800': '#1a6070',
        '900': '#1a505f',
        '950': '#0b3541',
        },
      },
    },
  },
  plugins: [],
};
export default config;
