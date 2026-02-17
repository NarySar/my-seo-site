import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // 👈 New Way: Import at top
import animate from "tailwindcss-animate";       // 👈 New Way: Import at top

const config: Config = {
  darkMode: ["class"],
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
      // If you had other colors here from Shadcn, keep them! 
      // But this basic setup will work for the code I gave you.
    },
  },
  plugins: [
    typography, // 👈 Use the variable here
    animate,    // 👈 Use the variable here
  ],
};
export default config;