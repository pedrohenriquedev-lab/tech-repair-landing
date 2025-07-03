// script.js

// ================================
// Variáveis principais de DOM
// ================================
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav__list');
const form = document.getElementById('form');
const feedback = form.querySelector('.form__feedback');
const darkModeToggle = document.createElement('button');

// ================================
// Função para alternar menu mobile
// ================================
const toggleMenu = () => {
  navList.classList.toggle('mobile-active');
  navToggle.classList.toggle('active');
};

navToggle.addEventListener('click', toggleMenu);

// ================================
// Fecha menu mobile ao clicar em link (para melhor UX)
// ================================
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('mobile-active')) {
      toggleMenu();
    }
  });
});

// ================================
// Suaviza rolagem para âncoras internas
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetID = anchor.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetID);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ================================
// Valida email com regex simples
// ================================
const validateEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// ================================
// Validação e envio do formulário
// ================================
form.addEventListener('submit', e => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  // Validações básicas
  if (nome.length < 3) {
    feedback.style.color = '#d9534f';
    feedback.textContent = 'Por favor, informe um nome válido com pelo menos 3 caracteres.';
    form.nome.focus();
    return;
  }
  if (!validateEmail(email)) {
    feedback.style.color = '#d9534f';
    feedback.textContent = 'Por favor, informe um email válido.';
    form.email.focus();
    return;
  }
  if (mensagem.length < 10) {
    feedback.style.color = '#d9534f';
    feedback.textContent = 'Por favor, escreva uma mensagem com pelo menos 10 caracteres.';
    form.mensagem.focus();
    return;
  }

  // Simula envio e feedback positivo
  feedback.style.color = '#28a745'; // verde
  feedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';

  form.reset();

  // Limpa mensagem após 5 segundos
  setTimeout(() => {
    feedback.textContent = '';
    feedback.style.color = '#d9534f';
  }, 5000);
});

// ================================
// Dark Mode Toggle
// ================================

// Criar botão dark mode e adicionar no footer
darkModeToggle.setAttribute('aria-label', 'Alternar modo escuro');
darkModeToggle.classList.add('darkmode-toggle');
darkModeToggle.innerHTML = '🌙'; // ícone lua

const footer = document.querySelector('.footer');
footer.appendChild(darkModeToggle);

// Função para aplicar tema
const applyTheme = theme => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '☀️'; // ícone sol
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    darkModeToggle.innerHTML = '🌙';
    localStorage.setItem('theme', 'light');
  }
};

// Evento toggle
darkModeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'light') {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
});

// Aplica tema salvo no carregamento da página
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});

// ================================
// Header sombra ao scroll
// ================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
