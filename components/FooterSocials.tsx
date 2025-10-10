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

export default function FooterSocials() {
  return (
    <section className="home-socials" aria-label="公式SNSリンク">
      <div className="home-socials__inner">
        <h2 className="home-socials__title">SNS</h2>
        <ul className="home-socials__list" role="list">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href} className="home-socials__item">
              <a className="home-socials__link" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
