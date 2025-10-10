const SOCIAL_LINKS = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/taro8877'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/takamasa_suzukii/'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/takamasa.suzuki.963'
  }
] as const;

const MUSIC_LINKS = [
  {
    label: 'TuneCore Japan',
    href: 'https://www.tunecore.co.jp/artists/Takamasa-Suzuki'
  },
  {
    label: 'PetitLyrics',
    href: 'https://petitlyrics.com/search_lyrics'
  }
] as const;

const BLOG_LINKS = [
  {
    label: 'まるいそらブログ',
    href: 'http://maruisora88.seesaa.net/'
  },
  {
    label: 'Sharp Snow ART Houseブログ',
    href: 'http://sharpsnowarthouse3.seesaa.net/'
  },
  {
    label: '旧まるいそら音楽出版アーカイブ',
    href: 'http://sharpsnowarthouse.seesaa.net/'
  }
] as const;

export default function FooterSocials() {
  return (
    <footer className="home-footer" aria-label="サイトフッター">
      <div className="home-footer__inner">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>SNS</h3>
            <div className="footer-links">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.href} 
                  className="footer-link" 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-section">
            <h3>音楽配信</h3>
            <div className="footer-links">
              {MUSIC_LINKS.map((link) => (
                <a 
                  key={link.href} 
                  className="footer-link" 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-section">
            <h3>ブログ</h3>
            <div className="footer-links">
              {BLOG_LINKS.map((link) => (
                <a 
                  key={link.href} 
                  className="footer-link" 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>©︎2008鈴木たかまさ(まるいそら音楽出版)-All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
