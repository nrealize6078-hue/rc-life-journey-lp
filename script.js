/* REALIZECLUB — LIFE JOURNEY（2026年9月18日 全面刷新） */
(() => {
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = 'IntersectionObserver' in window;

  /* ヘッダー：スクロールしたら下に薄い線 */
  const header = document.getElementById('site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* 静かな表示：画面に入ったら少しだけ浮かぶ */
  const items = document.querySelectorAll('.reveal');
  if (reduce || !io) {
    items.forEach(el => el.classList.add('is-in'));
  } else {
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); ob.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => ob.observe(el));
  }

  /* 相談バー：ファーストビューを過ぎたら出す。最後の相談欄が見えている間は隠す */
  const bar = document.getElementById('cta-bar');
  const hero = document.querySelector('.hero');
  const contact = document.getElementById('contact');
  if (bar && hero && io) {
    let pastHero = false, atContact = false;
    const update = () => bar.classList.toggle('is-visible', pastHero && !atContact);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update(); }).observe(hero);
    if (contact) new IntersectionObserver(([e]) => { atContact = e.isIntersecting; update(); }).observe(contact);
  }
})();
