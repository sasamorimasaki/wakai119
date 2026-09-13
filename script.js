const navToggle = document.getElementById('nav-toggle');
const siteHeader = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const isHomePage = document.body.classList.contains('home-page');
const homeShell = document.querySelector('.home-shell');

const updateHomeViewportHeight = () => {
  if (!homeShell) return;
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty('--home-viewport-height', `${Math.floor(viewportHeight)}px`);
};

updateHomeViewportHeight();
window.addEventListener('resize', updateHomeViewportHeight);
window.visualViewport?.addEventListener('resize', updateHomeViewportHeight);

menuButton?.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && navToggle) {
    event.preventDefault();
    navToggle.checked = !navToggle.checked;
  }
});

document.querySelectorAll('.global-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navToggle) navToggle.checked = false;
  });
});

document.addEventListener('click', (event) => {
  if (navToggle?.checked && siteHeader && !siteHeader.contains(event.target)) {
    navToggle.checked = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle) navToggle.checked = false;
});

document.querySelectorAll('[data-email-contact]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const mailbox = ['in', 'fo'].join('');
    const domain = ['wa', 'kai119', '.', 'com'].join('');
    const address = `${mailbox}${String.fromCharCode(64)}${domain}`;
    const subject = '【お問い合わせ】電気工事に関するご相談';
    const body = [
      '以下をご記入のうえ、送信してください。', '',
      '■ お名前', '：', '',
      '■ 電話番号', '：', '',
      '■ 工事・訪問先の住所', '：', '',
      '■ ご相談内容', '：', '',
      '■ ご希望時期', '：', '',
      '■ ご希望の連絡方法（電話・メール）', '：', '',
      '故障箇所や施工場所のお写真がある場合は、このメールに添付してお送りください。'
    ].join('\n');
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'ページ上部へ戻る');
backToTop.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m9 19 7-7 7 7"/></svg>';
backToTop.tabIndex = -1;
document.body.append(backToTop);

const mobileViewport = window.matchMedia('(max-width: 600px)');
const siteFooter = document.querySelector('.site-footer');
let backToTopTicking = false;

const updateBackToTop = () => {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const standardThreshold = Math.max(280, window.innerHeight * 0.45);
  const threshold = Math.min(standardThreshold, maxScroll * 0.5);
  const isVisible = !isHomePage && mobileViewport.matches && window.scrollY > threshold;
  const footerOffset = siteFooter
    ? Math.min(siteFooter.offsetHeight, Math.max(0, window.innerHeight - siteFooter.getBoundingClientRect().top))
    : 0;
  backToTop.classList.toggle('is-visible', isVisible);
  backToTop.tabIndex = isVisible ? 0 : -1;
  backToTop.style.setProperty('--footer-offset', `${footerOffset}px`);
  backToTopTicking = false;
};

const requestBackToTopUpdate = () => {
  if (backToTopTicking) return;
  backToTopTicking = true;
  window.requestAnimationFrame(updateBackToTop);
};

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', requestBackToTopUpdate, { passive: true });
window.addEventListener('resize', requestBackToTopUpdate);
updateBackToTop();
