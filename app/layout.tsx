import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEARN ไม่นิ่ง: ภารกิจพิชิตพาราโบลา",
  description: "เกมแบบทดสอบพาราโบลา 7 ด่าน สำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}
