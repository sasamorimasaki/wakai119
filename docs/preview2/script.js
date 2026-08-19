const navToggle = document.getElementById('nav-toggle');
const siteHeader = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');

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
    const subject = '【お問い合わせ】電気工事・お見積もりのご相談';
    const body = [
      '以下をご記入のうえ、送信してください。', '',
      '■ お名前', '：', '',
      '■ 電話番号', '：', '',
      '■ 工事・訪問先の地域', '例：千葉県八千代市', '：', '',
      '■ ご相談内容', '：', '',
      '■ ご希望時期', '：', '',
      '■ ご希望の連絡方法（電話・メール）', '：', '',
      '故障箇所や施工場所のお写真がある場合は、このメールに添付してお送りください。'
    ].join('\n');
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
