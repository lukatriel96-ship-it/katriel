const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-open');
    });
  });
}

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('open');
      faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const form = document.getElementById('whatsapp-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = data.get('nome')?.trim() || '';
    const cidade = data.get('cidade')?.trim() || 'Não informada';
    const situacao = data.get('situacao') || 'Dúvida sobre BPC/LOAS';
    const mensagem = data.get('mensagem')?.trim() || 'Sem observações adicionais.';

    const texto = [
      'Olá, Katriel & Freitas Advogados. Gostaria de uma orientação sobre BPC/LOAS.',
      '',
      `Nome: ${nome}`,
      `Cidade: ${cidade}`,
      `Situação: ${situacao}`,
      `Mensagem: ${mensagem}`
    ].join('\n');

    const url = `https://wa.me/5521965398090?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();
