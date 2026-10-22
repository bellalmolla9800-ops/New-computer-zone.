// Inter Cyber Cafe website interactions
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = open ? '✕' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Service links preselect the enquiry form's service field.
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('serviceSelect');
    const requested = link.getAttribute('data-service');
    [...select.options].forEach(option => {
      if (option.value === requested || option.text === requested) select.value = option.value || option.text;
    });
  });
});

// Configure your real WhatsApp number before publishing (country code + number, digits only).
const WHATSAPP_NUMBER = '91XXXXXXXXXX';
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();
  const text = `Hello Inter Cyber Cafe & Online Services,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message || 'Please contact me about this service.')}`;
  const status = document.getElementById('formStatus');
  if (WHATSAPP_NUMBER.includes('X')) {
    status.textContent = 'Website demo: please replace 91XXXXXXXXXX in script.js with your WhatsApp number to enable message sending.';
    status.style.cssText = 'margin-top:12px;color:#a45d12;font-size:11px;line-height:1.6';
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  status.textContent = 'Your WhatsApp message is ready. Please review and send it in WhatsApp.';
  status.style.cssText = 'margin-top:12px;color:#16806b;font-size:11px;line-height:1.6';
});
