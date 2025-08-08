import localFont from "next/font/local";

export const altform = localFont({
  src: [
    {
      path: "./altformtrial-thin-webfont.woff",
      weight: "100", // Thin
      style: "normal",
    },
    {
      path: "./altformtrial-extralight-webfont.woff",
      weight: "200", // Extra Light
      style: "normal",
    },
    {
      path: "./altformtrial-extralightitalic-webfont.woff",
      weight: "200", // Extra Light
      style: "italic",
    },
    {
      path: "./altformtrial-light-webfont.woff",
      weight: "300", // Light
      style: "normal",
    },
    {
      path: "./altformtrial-lightitalic-webfont.woff",
      weight: "300", // Light
      style: "italic",
    },
    {
      path: "./altformtrial-regular-webfont.woff",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "./altformtrial-regularitalic-webfont.woff",
      weight: "400", // Regular
      style: "italic",
    },
    {
      path: "./altformtrial-semibold-webfont.woff",
      weight: "600", // Semi-Bold
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-altform",
});
