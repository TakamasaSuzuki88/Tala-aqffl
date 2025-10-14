(function () {
  const FOOTER_TEMPLATE = `
    <div class="site-footer__inner">
      <div class="site-footer__grid" role="navigation" aria-label="サイトフッターリンク">
        <section class="site-footer__section">
          <h3 class="site-footer__heading">SNS</h3>
          <div class="site-footer__links">
            <a class="site-footer__link" href="https://x.com/taro8877" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            <a class="site-footer__link" href="https://www.instagram.com/takamasa_suzukii/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a class="site-footer__link" href="https://www.facebook.com/takamasa.suzuki.963" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </section>
        <section class="site-footer__section">
          <h3 class="site-footer__heading">音楽配信</h3>
          <div class="site-footer__links">
            <a class="site-footer__link" href="https://www.tunecore.co.jp/artists/Takamasa-Suzuki" target="_blank" rel="noopener noreferrer">TuneCore Japan</a>
            <a class="site-footer__link" href="https://petitlyrics.com/search_lyrics" target="_blank" rel="noopener noreferrer">PetitLyrics</a>
          </div>
        </section>
        <section class="site-footer__section">
          <h3 class="site-footer__heading">ブログ</h3>
          <div class="site-footer__links">
            <a class="site-footer__link" href="http://maruisora88.seesaa.net/" target="_blank" rel="noopener noreferrer">まるいそら音楽出版ブログ</a>
            <a class="site-footer__link" href="http://sharpsnowarthouse3.seesaa.net/" target="_blank" rel="noopener noreferrer">Sharp Snow ART Houseブログ</a>
            <a class="site-footer__link" href="http://sharpsnowarthouse.seesaa.net/" target="_blank" rel="noopener noreferrer">旧まるいそら音楽出版アーカイブ</a>
          </div>
        </section>
      </div>
      <div class="site-footer__copyright">
        <p class="site-footer__copyright-text">©︎2008鈴木たかまさ(まるいそら音楽出版)-All Rights Reserved</p>
      </div>
    </div>
  `;

  function initialiseFooter(footerElement) {
    const variant = footerElement.getAttribute('data-footer') || 'subpage';
    footerElement.classList.add('site-footer', `site-footer--${variant}`);
    footerElement.innerHTML = FOOTER_TEMPLATE;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-footer]').forEach(initialiseFooter);
    });
  } else {
    document.querySelectorAll('[data-footer]').forEach(initialiseFooter);
  }
})();
