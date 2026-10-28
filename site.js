(() => {
  const button = document.getElementById('language');
  let current = 'zh';
  function setLanguage(language) {
    current = language;
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
      const text = element.dataset[language];
      if (element.hasAttribute('data-html')) {
        // Both translations are authored, static content; only <br> is supported.
        element.replaceChildren(...text.split('<br>').flatMap((part, index) =>
          index ? [document.createElement('br'), document.createTextNode(part)] : [document.createTextNode(part)]));
      } else element.textContent = text;
    });
    document.querySelectorAll('[data-screen]').forEach(image => {
      image.src = `assets/${language === 'zh' ? 'zh-TW' : 'en-US'}/${image.dataset.screen}`;
      image.alt = language === 'zh' ? image.dataset.altZh : image.dataset.altEn;
    });
    button.textContent = language === 'zh' ? 'EN ↗' : '繁中 ↗';
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切換為繁體中文');
    document.querySelector('nav').setAttribute('aria-label', language === 'zh' ? '主要導覽' : 'Main navigation');
    document.querySelector('a.brand').setAttribute('aria-label', language === 'zh' ? 'Lumina Journal 首頁' : 'Lumina Journal home');
    document.title = language === 'zh' ? 'Lumina Journal｜拾光人生手帳 — 照片日記、心情與人生願望' : 'Lumina Journal — Photo journal, moods & life wishes';
    document.querySelector('meta[name="description"]').content = language === 'zh'
      ? '用一張照片與一句話收藏日常。Lumina 結合照片日記、心情曲線、人生願望及週月回顧，本地優先、無廣告、不需帳號。Android 測試中。'
      : 'A local-first photo journal with mood charts, life wishes and photo recaps. No ads or account required. Android app in testing.';
  }
  button.addEventListener('click', () => setLanguage(current === 'zh' ? 'en' : 'zh'));
  if (navigator.language && !navigator.language.toLowerCase().startsWith('zh')) setLanguage('en');
})();
