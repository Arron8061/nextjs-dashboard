import localFont from "next/font/local";

// 配置 Inter 字体
export const inter = localFont({
  src: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  preload: false,
});

/**
 * 配置 Lusitana 字体
 */
export const lusitana = localFont({
  src: [
    {
      path: "../../public/fonts/Lusitana-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lusitana-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lusitana",
});
