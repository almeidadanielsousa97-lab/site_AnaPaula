// Config do Tailwind CDN. Precisa ser carregado DEPOIS do <script src="https://cdn.tailwindcss.com">
// e ANTES do CSS/HTML que usa essas classes ser processado — por isso fica logo em seguida no <head>,
// como <script> normal (sem defer/async), preservando a ordem de execução.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-bg': 'rgb(var(--primary-bg-rgb) / <alpha-value>)',
        'primary-text': 'rgb(var(--primary-text-rgb) / <alpha-value>)',
        'secondary-text': 'rgb(var(--secondary-text-rgb) / <alpha-value>)',
        'accent': 'rgb(var(--accent-rgb) / <alpha-value>)',
        'gold-accent': 'rgb(var(--gold-accent-rgb) / <alpha-value>)',
        'surface': 'rgb(var(--surface-rgb) / <alpha-value>)',
        'surface-text': 'rgb(var(--surface-text-rgb) / <alpha-value>)'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif']
      }
    }
  }
};
