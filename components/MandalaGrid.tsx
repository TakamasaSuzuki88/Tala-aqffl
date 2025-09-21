'use client';

import React from 'react';

export type MandalaItem = {
  img: string;   // 画像パス（/mandala/01.jpg など）
  label: string; // ラベル
  href: string;  // 遷移先
  opacity?: number; // 背景の見せ具合 0.18〜0.30（既定：02/07/09=0.20、他=0.24〜0.26）
};

export type MandalaGridProps = {
  items?: MandalaItem[];
  insetPct?: number; // 安全インセット（%）既定 3.5
};

const defaults: MandalaItem[] = [
  { img: '01.jpg', label: '音楽',       href: '/music',   opacity: 0.26 }, // 1 → 01.jpg
  { img: '02.jpg', label: '映画',       href: '/movie',   opacity: 0.20 }, // 2 → 02.jpg（密）
  { img: '03.jpg', label: '絵画',       href: '/painting',opacity: 0.26 }, // 3 → 03.jpg
  { img: '04.jpg', label: '写真',       href: '/photo',   opacity: 0.24 }, // 4 → 04.jpg
  { img: '05.jpg', label: '思想',       href: '/idea',    opacity: 0.24 }, // 5 → 05.jpg
  { img: '06.jpg', label: '言葉',       href: '/words',   opacity: 0.24 }, // 6 → 06.jpg
  { img: '07.jpg', label: '販売', href: '/money',   opacity: 0.20 }, // 7 → 07.jpg（密）
  { img: '08.jpg', label: 'ゲーム',     href: '/game',    opacity: 0.24 }, // 8 → 08.jpg
  { img: '09.jpg', label: 'リンク集',   href: '/links',   opacity: 0.20 }, // 9 → 09.jpg（密）
];

const MandalaGrid: React.FC<MandalaGridProps> = ({ items = defaults, insetPct = 3.5 }) => {
  const textStroke: React.CSSProperties = {
    WebkitTextStroke: '0.8px rgba(255,255,255,0.88)',
    textShadow: '0 0 2px rgba(255,255,255,0.65), 0 0 4px rgba(0,0,0,0.18)',
  };

  return (
    <div className="mandala-grid-container" style={{ width: 'min(880px, 92vw)', margin: '2rem auto' }}>
      <div style={{ position: 'relative', paddingBottom: '100%' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '2.2%',
            padding: `${insetPct}%`
          }}
        >
          {items.map((it, i) => {
            const num = i + 1; // 01→1 … 09→9 の対応
            return (
              <a
                key={it.img}
                href={it.href}
                aria-label={`${num} ${it.label}`}
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: '0.375rem',
                  textDecoration: 'none'
                }}
                className="mandala-item"
              >
                {/* 背景画像（画像層だけに不透明度＋彩度調整を適用） */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: it.opacity ?? 0.24,
                    filter: 'saturate(0.8)'
                  }}
                >
                  <img
                    src={`/mandala/${it.img}`}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* 中央テキスト（群青＋ごく薄い白フチ） */}
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  height: '100%',
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 150ms'
                }}>
                  <span
                    style={{
                      ...textStroke,
                      color: '#1E3A8A',
                      fontWeight: 'bold',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                      fontSize: 'clamp(17px, 2.8vw, 31px)'
                    }}
                    className="mandala-number"
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      ...textStroke,
                      color: '#1E3A8A',
                      fontWeight: '600',
                      fontSize: 'clamp(12px, 2.0vw, 22px)',
                      lineHeight: '1.05',
                      letterSpacing: '-0.02em',
                    }}
                    className="mandala-label"
                  >
                    {it.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        .mandala-item:hover .mandala-number,
        .mandala-item:hover .mandala-label {
          color: #2947A9;
        }
        .mandala-item:active > div:last-child {
          transform: scale(0.95);
        }
        .mandala-item:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default MandalaGrid;
