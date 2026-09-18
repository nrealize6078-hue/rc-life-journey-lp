(() => {
  const status = document.getElementById('share-status');
  const dialog = document.getElementById('share-fallback');
  const input = document.getElementById('share-url');
  let timeout;
  const notify = (message) => {
    clearTimeout(timeout);
    status.textContent = message;
    status.hidden = false;
    timeout = setTimeout(() => { status.hidden = true; }, 4500);
  };
  document.querySelectorAll('[data-share]').forEach(button => {
    button.addEventListener('click', async () => {
      const url = new URL(window.location.href);
      url.hash = '';
      url.search = '';
      try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard_unavailable');
        await navigator.clipboard.writeText(url.href);
        notify('URLをコピーしました。LINEなどに貼り付けて共有できます。');
      } catch {
        input.value = url.href;
        dialog.showModal();
        input.focus();
        input.select();
      }
    });
  });
  dialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  input.addEventListener('click', () => input.select());
})();

/* LINE公式ボタン画像が読めない場合の代替 */
document.querySelectorAll('.line-add').forEach(box => {
  const img = box.querySelector('img');
  const official = img && img.parentElement;
  const fallback = box.querySelector('.btn-line');
  if (!img || !fallback) return;
  const swap = () => { official.hidden = true; fallback.hidden = false; };
  if (img.complete && img.naturalWidth === 0) swap();
  else img.addEventListener('error', swap);
});

/* 固定ボトムバー：ヒーローを過ぎたら出す */
(() => {
  const bar = document.getElementById('cta-bar');
  const hero = document.querySelector('.hero');
  if (!bar || !hero) return;
  const show = v => bar.classList.toggle('is-visible', v);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => show(!e.isIntersecting), { threshold: 0 }).observe(hero);
  } else { show(true); }
})();
