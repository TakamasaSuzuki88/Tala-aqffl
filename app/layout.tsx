import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'まるいそら - 3D マンダラポートフォリオ',
  description: '鈴木貴雅 - マルチアーティストポートフォリオ - 3D Interactive Mandala'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
