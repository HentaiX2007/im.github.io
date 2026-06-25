(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const skillCards = document.querySelectorAll('.skill-card');

  // Mobile menu
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => observerNav.observe(s));

  // Skill bar animation
  skillCards.forEach((card) => {
    const level = card.dataset.level;
    card.style.setProperty('--level', `${level}%`);
    const bar = card.querySelector('.skill-bar span');
    if (bar) bar.style.width = '0';
  });

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate');
        const bar = entry.target.querySelector('.skill-bar span');
        if (bar) bar.style.width = `${entry.target.dataset.level}%`;
        skillObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  skillCards.forEach((card) => skillObserver.observe(card));

  // Scroll reveal
  const revealTargets = document.querySelectorAll(
    '.feature-card, .skill-card, .place-card, .social-link, .friend-card, .section-head'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  // 年龄：2007 年至今
  const ageEls = document.querySelectorAll('.js-age');
  if (ageEls.length) {
    const age = new Date().getFullYear() - 2007;
    ageEls.forEach((el) => {
      el.textContent = age;
    });
  }

  // Hero badge 文案轮播
  const badgeText = document.getElementById('hero-badge-text');
  if (badgeText) {
    const slogans = [
      '✨ 遇见你，真好呀 ~',
      '🌸 欢迎来我的小窝 ~',
      '💖 今天也要开心喔 ~',
      '⭐ 能在比特之海遇见你 ~',
      '🍄 蘑菇森林里，等你好久了 ~',
      '(ﾉ◕ヮ◕)ﾉ 进来坐坐叭 ~',
      '✧ 随便逛逛，别客气 ~',
    ];
    let index = Math.floor(Math.random() * slogans.length);
    badgeText.textContent = slogans[index];

    setInterval(() => {
      badgeText.classList.add('fade-out');
      setTimeout(() => {
        index = (index + 1) % slogans.length;
        badgeText.textContent = slogans[index];
        badgeText.classList.remove('fade-out');
      }, 400);
    }, 3500);
  }
})();
