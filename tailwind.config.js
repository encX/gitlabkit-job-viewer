module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2563eb",
          secondary: "#2dd4bf",
          accent: "#9333ea",
          neutral: "#374151",
          "base-100": "#FFFFFF",
          info: "#67e8f9",
          success: "#86efac",
          warning: "#fde047",
          error: "#fca5a5",  
        },
      },
      {
        dark: {
          primary: "#2563eb",
          secondary: "#2dd4bf",
          accent: "#9333ea",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#164e63",
          success: "#14532d",
          warning: "#713f12",
          error: "#7f1d1d",
        },
      },
    ],
  },
};
