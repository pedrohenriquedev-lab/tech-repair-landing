// ========================================
// TECH REPAIR
// JAVASCRIPT BASE
// ========================================


// ========================================
// ELEMENTOS DO DOM
// ========================================

const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav__list');

const form = document.getElementById('form');
const feedback = document.querySelector('.form__feedback');

const darkModeToggle = document.getElementById('toggle-darkmode');

const header = document.querySelector('.header');


// ========================================
// MENU MOBILE
// ========================================

if (navToggle && navList) {

  navToggle.addEventListener('click', () => {

    navList.classList.toggle('mobile-active');
    navToggle.classList.toggle('active');

    const menuAberto =
      navList.classList.contains('mobile-active');

    navToggle.setAttribute(
      'aria-expanded',
      menuAberto
    );

  });

}


// ========================================
// FECHAR MENU AO CLICAR EM UM LINK
// ========================================

document.querySelectorAll('.nav__link').forEach(link => {

  link.addEventListener('click', () => {

    if (navList) {
      navList.classList.remove('mobile-active');
    }

    if (navToggle) {
      navToggle.classList.remove('active');

      navToggle.setAttribute(
        'aria-expanded',
        'false'
      );
    }

  });

});


// ========================================
// ROLAGEM SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', event => {

    const id =
      link.getAttribute('href').substring(1);

    const elemento =
      document.getElementById(id);

    if (elemento) {

      event.preventDefault();

      elemento.scrollIntoView({
        behavior: 'smooth'
      });

    }

  });

});


// ========================================
// VALIDAÇÃO DE E-MAIL
// ========================================

function validarEmail(email) {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

}


// ========================================
// FORMULÁRIO
// ========================================

if (form) {

  form.addEventListener('submit', event => {

    event.preventDefault();


    const nome =
      form.nome.value.trim();

    const email =
      form.email.value.trim();

    const mensagem =
      form.mensagem.value.trim();


    // Nome

    if (nome.length < 3) {

      feedback.textContent =
        'Digite um nome válido com pelo menos 3 caracteres.';

      feedback.style.color =
        '#d9534f';

      form.nome.focus();

      return;

    }


    // E-mail

    if (!validarEmail(email)) {

      feedback.textContent =
        'Digite um e-mail válido.';

      feedback.style.color =
        '#d9534f';

      form.email.focus();

      return;

    }


    // Mensagem

    if (mensagem.length < 10) {

      feedback.textContent =
        'Descreva melhor o problema.';

      feedback.style.color =
        '#d9534f';

      form.mensagem.focus();

      return;

    }


    // Sucesso temporário

    feedback.textContent =
      'Mensagem enviada com sucesso!';

    feedback.style.color =
      '#16803c';

    form.reset();


    setTimeout(() => {

      feedback.textContent = '';

    }, 5000);

  });

}


// ========================================
// DARK MODE
// ========================================

if (darkModeToggle) {


  function aplicarTema(tema) {

    if (tema === 'dark') {

      document.documentElement.setAttribute(
        'data-theme',
        'dark'
      );

      darkModeToggle.textContent = '☀️';

      darkModeToggle.setAttribute(
        'aria-label',
        'Ativar modo claro'
      );

    } else {

      document.documentElement.removeAttribute(
        'data-theme'
      );

      darkModeToggle.textContent = '🌙';

      darkModeToggle.setAttribute(
        'aria-label',
        'Ativar modo escuro'
      );

    }


    localStorage.setItem(
      'theme',
      tema
    );

  }


  const temaSalvo =
    localStorage.getItem('theme') || 'light';


  aplicarTema(temaSalvo);


  darkModeToggle.addEventListener('click', () => {

    const temaAtual =
      localStorage.getItem('theme') || 'light';

    const novoTema =
      temaAtual === 'light'
        ? 'dark'
        : 'light';

    aplicarTema(novoTema);

  });

}


// ========================================
// HEADER AO ROLAR
// ========================================

if (header) {

  function verificarScroll() {

    if (window.scrollY > 40) {

      header.classList.add('scrolled');

    } else {

      header.classList.remove('scrolled');

    }

  }


  window.addEventListener(
    'scroll',
    verificarScroll,
    { passive: true }
  );


  verificarScroll();

}