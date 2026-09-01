/* ============================================================================
   POPOQ GAMES — app.js
   Прелоадер, скролл-движок, курсор, флип-карты, меню, форма, рендер контента.
   Без зависимостей: IntersectionObserver + requestAnimationFrame + CSS.
   ========================================================================== */

(function () {
  'use strict';

  var C = window.CONTENT;
  var I18N = window.I18N;

  /* Адрес склеивается из двух полей и нигде не выводится на страницу —
     ни текстом, ни в разметке. Спам-боты ищут готовую строку с «@». */
  var EMAIL = C.studio.emailName + '@' + C.studio.emailHost;

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ==========================================================================
     ИКОНКИ СОЦСЕТЕЙ
     ========================================================================== */

  var ICONS = {
    instagram: '<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.5" cy="6.6" r="1.25" fill="currentColor"/>',
    discord: '<path fill="currentColor" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.011c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.128c-.598.349-1.22.645-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z"/>',
    steam: '<path fill="currentColor" d="M11.98 0C5.68 0 .51 4.86.02 11.04l6.43 2.66c.55-.37 1.2-.59 1.91-.59h.19l2.86-4.15v-.06a4.53 4.53 0 1 1 4.53 4.53h-.11l-4.08 2.91v.16a3.4 3.4 0 0 1-6.72.67L.44 15.27A12 12 0 1 0 11.98 0zM7.54 18.21l-1.47-.61c.26.54.71 1 1.31 1.25a2.55 2.55 0 0 0 1.96-4.7c-.62-.26-1.29-.25-1.88-.03l1.52.63a1.88 1.88 0 0 1-1.44 3.47zm11.42-9.3a3.02 3.02 0 1 0-6.03 0 3.02 3.02 0 0 0 6.03 0zm-5.28 0a2.27 2.27 0 1 1 4.53 0 2.27 2.27 0 0 1-4.53 0z"/>',
    tiktok: '<path fill="currentColor" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.6 10.6 0 0 1-4.2-.97c-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75a7.6 7.6 0 0 1-1.35 3.94 7.42 7.42 0 0 1-5.91 3.21 7.3 7.3 0 0 1-4.08-1.03 7.6 7.6 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.36 7.36 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'
  };

  var SOCIAL_ORDER = [
    { key: 'instagram', label: 'Instagram' },
    { key: 'discord',   label: 'Discord' },
    { key: 'steam',     label: 'Steam' },
    { key: 'tiktok',    label: 'TikTok' }
  ];

  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ==========================================================================
     РЕНДЕР КОНТЕНТА
     ========================================================================== */

  /** Ссылка, которой нет — делаем неактивной, а не битой. */
  function applyLink(el, url) {
    if (!el) return;
    if (url && url !== '#') {
      el.href = url;
      el.classList.remove('is-disabled');
      el.removeAttribute('aria-disabled');
    } else {
      el.href = '#';
      el.classList.add('is-disabled');
      el.setAttribute('aria-disabled', 'true');
      el.setAttribute('tabindex', '-1');
    }
  }

  function renderSocials() {
    var html = SOCIAL_ORDER.map(function (s) {
      var url = C.studio.links[s.key];
      var dis = (!url || url === '#') ? ' is-disabled' : '';
      var href = dis ? '#' : url;
      return '<a class="social' + dis + '" href="' + esc(href) + '" target="_blank" rel="noopener" ' +
             'aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' +
             '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[s.key] + '</svg></a>';
    }).join('');

    $$('[data-socials]').forEach(function (box) { box.innerHTML = html; });
  }

  function renderMarquee(lang) {
    var text = I18N.t('marquee.text', lang);
    var parts = text.split('✦').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!parts.length) parts = ['POPOQ GAMES'];

    var chunk = '';
    // Дублируем, пока лента гарантированно не перекроет самый широкий экран.
    for (var r = 0; r < 3; r++) {
      chunk += parts.map(function (p) {
        return '<span class="marquee__item">' + esc(p) + '</span>' +
               '<span class="marquee__item" aria-hidden="true">✦</span>';
      }).join('');
    }

    $$('[data-marquee]').forEach(function (track) { track.innerHTML = chunk; });
  }

  function gameSpecsHTML(game, lang) {
    if (!game.specs || !game.specs.length) return '';
    return '<dl class="game__specs">' + game.specs.map(function (s) {
      return '<div class="spec">' +
               '<dt class="mono spec__k">' + esc(I18N.pick(s.label, lang)) + '</dt>' +
               '<dd class="mono spec__v">' + esc(I18N.pick(s.value, lang)) + '</dd>' +
             '</div>';
    }).join('') + '</dl>';
  }

  function gameShotsHTML(game, lang) {
    if (!game.shots || !game.shots.length) return '';
    return '<div class="game__shots">' +
             '<p class="mono game__gallery-head">' + esc(I18N.t('games.gallery', lang)) + '</p>' +
             '<div class="game__gallery">' +
               game.shots.map(function (src, i) {
                 return '<figure class="shot" data-reveal="scale" style="--i:' + i + '">' +
                          '<img src="' + esc(src) + '" alt="' + esc(game.title) + ' — screenshot ' + (i + 1) + '" loading="lazy" decoding="async" width="1280" height="720">' +
                        '</figure>';
               }).join('') +
             '</div>' +
           '</div>';
  }

  function gameHTML(game, lang) {
    var hasSteam = game.steam && game.steam !== '#';
    var cta = game.featured
      ? '<div class="game__cta">' +
          '<a class="btn' + (hasSteam ? '' : ' is-disabled') + '" href="' + esc(hasSteam ? game.steam : '#') + '" target="_blank" rel="noopener" data-magnetic>' +
            '<span>' + esc(I18N.t('cta.wishlist', lang)) + '</span>' + ARROW +
          '</a>' +
        '</div>'
      : '<p class="mono game__code" style="color:var(--muted)">' + esc(I18N.t('games.soon', lang)) + '</p>';

    return '<article class="game ' + (game.featured ? 'game--featured' : 'game--soon') + '">' +

      '<div class="game__stage" data-scale-scroll data-reveal="scale">' +
        '<div class="game__frame">' +
          '<span class="mono game__badge"><span class="dot"></span>' + esc(I18N.pick(game.status, lang)) + '</span>' +
          '<img class="game__cover" src="' + esc(game.cover) + '" alt="' + esc(game.title) + '" ' +
               (game.featured ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async" width="1920" height="1080">' +
          '<h3 class="game__stage-title">' + esc(game.title) + '</h3>' +
        '</div>' +
      '</div>' +

      '<div class="game__side">' +
        '<div class="game__body">' +
          '<div class="game__info" data-reveal>' +
            '<p class="mono game__code">' + esc(game.code) + ' / ' + esc(game.title) + '</p>' +
            '<p class="game__tagline">' + esc(I18N.pick(game.tagline, lang)) + '</p>' +
            '<p class="game__desc">' + esc(I18N.pick(game.description, lang)) + '</p>' +
            cta +
          '</div>' +
          (game.specs && game.specs.length
            ? '<div data-reveal style="--i:1">' + gameSpecsHTML(game, lang) + '</div>'
            : '') +
        '</div>' +
        gameShotsHTML(game, lang) +
      '</div>' +

    '</article>';
  }

  function renderGames(lang) {
    var box = $('#gamesList');
    if (!box) return;
    box.innerHTML = C.games.map(function (g) { return gameHTML(g, lang); }).join('');
  }

  function renderTeam(lang) {
    var grid = $('#teamGrid');
    if (!grid) return;

    var hintKey = canHover ? 'team.hint' : 'team.hintTouch';

    grid.innerHTML = C.team.map(function (m, i) {
      var num = ('0' + (i + 1)).slice(-2);
      var role = I18N.pick(m.role, lang);
      return '<article class="member" data-flip tabindex="0" role="button" ' +
                 'aria-label="' + esc(m.name + ' — ' + role) + '" style="--i:' + i + '" data-reveal="scale">' +
        '<div class="member__inner">' +

          '<div class="member__face member__face--front">' +
            '<img class="member__img" src="' + esc(m.front) + '" alt="" aria-hidden="true" loading="lazy" decoding="async" width="640" height="640">' +
            '<span class="member__veil" aria-hidden="true"></span>' +
            '<span class="member__index">' + num + '</span>' +
            '<span class="member__hint">' + esc(I18N.t(hintKey, lang)) + '</span>' +
            '<div class="member__meta">' +
              '<h3 class="member__name">' + esc(m.name) + '</h3>' +
              '<p class="mono member__role">' + esc(role) + '</p>' +
            '</div>' +
          '</div>' +

          '<div class="member__face member__face--back">' +
            '<img class="member__img" src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy" decoding="async" width="640" height="800">' +
            '<span class="member__veil" aria-hidden="true"></span>' +
            '<div class="member__meta">' +
              '<h3 class="member__name">' + esc(m.name) + '</h3>' +
              '<p class="mono member__role">' + esc(role) + '</p>' +
              '<p class="member__bio">' + esc(I18N.pick(m.bio, lang)) + '</p>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</article>';
    }).join('');
  }

  function renderFaq(lang) {
    var box = $('#faqList');
    if (!box || !C.faq) return;

    box.innerHTML = C.faq.map(function (item, i) {
      var id = 'faq-a-' + i;
      return '<div class="faq__item" data-reveal style="--i:' + Math.min(i, 4) + '">' +
        '<h3>' +
          '<button class="faq__q" type="button" aria-expanded="false" aria-controls="' + id + '">' +
            '<span class="mono faq__num">' + ('0' + (i + 1)).slice(-2) + '</span>' +
            '<span class="faq__text">' + esc(I18N.pick(item.q, lang)) + '</span>' +
            '<span class="faq__icon" aria-hidden="true"></span>' +
          '</button>' +
        '</h3>' +
        '<div class="faq__panel" id="' + id + '" role="region">' +
          '<p>' + esc(I18N.pick(item.a, lang)) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /** Аккордеон: одновременно открыт только один ответ. */
  function initFaq() {
    var box = $('#faqList');
    if (!box || box.dataset.faqBound) return;
    box.dataset.faqBound = '1';

    box.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq__q');
      if (!btn) return;

      var open = btn.getAttribute('aria-expanded') === 'true';

      $$('.faq__q', box).forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq__item').classList.remove('is-open');
      });

      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.closest('.faq__item').classList.add('is-open');
      }
    });
  }

  /** Всё, что зависит одновременно от языка и от данных студии. */
  function renderDynamic(lang) {
    renderGames(lang);
    renderTeam(lang);
    renderFaq(lang);
    renderMarquee(lang);

    // Подсказки про переворот зависят от устройства: мышь или палец.
    var hint = $('[data-team-hint]');
    if (hint) hint.setAttribute('data-i18n', canHover ? 'team.hint' : 'team.hintTouch');

    var teamLead = $('[data-team-lead]');
    if (teamLead) teamLead.setAttribute('data-i18n', canHover ? 'team.lead' : 'team.leadTouch');

    var featured = C.games.filter(function (g) { return g.featured; })[0];
    var badge = $('[data-hero-badge]');
    if (badge && featured) {
      badge.textContent = featured.title + ' — ' + I18N.pick(featured.status, lang);
    }
  }

  function renderStatic() {
    renderSocials();

    ['#heroSteam', '#headerSteam', '#menuSteam'].forEach(function (sel) {
      applyLink($(sel), C.studio.links.steam);
    });
    applyLink($('#discordBtn'), C.studio.links.discord);

    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     РАЗРЕЗАНИЕ ЗАГОЛОВКОВ НА СЛОВА
     ========================================================================== */

  function splitHeadings() {
    $$('[data-split]').forEach(function (host) {
      var lines = $$('.hl', host);
      if (!lines.length) return;

      var wi = 0;
      lines.forEach(function (line) {
        var words = (line.textContent || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) return;

        line.classList.add('split-line');
        line.innerHTML = words.map(function (w) {
          return '<span class="split-word" style="--wi:' + (wi++) + '">' + esc(w) + '</span>';
        }).join(' ');
      });

      host.classList.add('split-ready');
    });
  }

  /* ==========================================================================
     ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ
     ========================================================================== */

  var revealObserver = null;

  /* Пока идёт прелоадер, анимации не запускаем — иначе они проиграют
     под шторкой, и пользователь увидит уже статичную страницу. */
  var revealsArmed = false;

  function armReveals() {
    if (revealsArmed) return;
    revealsArmed = true;
    initReveal();
  }

  var pendingReveals = [];

  function initReveal() {
    if (!revealsArmed) return;

    if (reduced || !('IntersectionObserver' in window)) {
      $$('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
      pendingReveals = [];
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          revealObserver.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    pendingReveals = $$('[data-reveal]').filter(function (el) {
      return !el.classList.contains('is-in');
    });
    pendingReveals.forEach(function (el) { revealObserver.observe(el); });

    // Первый экран показываем сразу, не дожидаясь кадра наблюдателя —
    // иначе после шторки прелоадера остаётся пустая страница.
    sweepVisible();
  }

  /** Резервный проход: всё, что уже в зоне видимости, помечаем показанным. */
  function sweepVisible() {
    if (!pendingReveals.length) return;
    var vh = window.innerHeight;

    pendingReveals = pendingReveals.filter(function (el) {
      if (el.classList.contains('is-in')) return false;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('is-in');
        revealObserver.unobserve(el);
        return false;
      }
      return true;
    });
  }

  /* ==========================================================================
     СЧЁТЧИКИ
     ========================================================================== */

  function initCounters() {
    var nodes = $$('[data-count]');
    if (!nodes.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.textContent = n.getAttribute('data-count'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        animateCount(e.target, parseInt(e.target.getAttribute('data-count'), 10) || 0);
      });
    }, { threshold: 0.6 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  function animateCount(el, target) {
    var dur = 1100, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ==========================================================================
     ЕДИНЫЙ СКРОЛЛ-ДВИЖОК (прогресс, шапка, параллакс, масштаб)
     ========================================================================== */

  var header = $('#header');
  var lastY = 0, ticking = false;

  function onScrollFrame() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;

    /* прогресс */
    document.documentElement.style.setProperty('--scroll-progress', docH > 0 ? (y / docH).toFixed(4) : 0);

    /* шапка */
    if (header) {
      header.classList.toggle('is-stuck', y > 24);
      var goingDown = y > lastY && y > 220;
      header.classList.toggle('is-hidden', goingDown && !header.classList.contains('menu-open'));
    }
    lastY = y;

    if (reduced) return;

    sweepVisible();

    /* параллакс */
    $$('[data-parallax]').forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      el.style.transform = 'translate3d(0,' + (y * speed).toFixed(2) + 'px,0)';
    });

    /* масштаб сцены игры по прогрессу входа в вьюпорт */
    $$('[data-scale-scroll]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = 1 - Math.max(0, Math.min(1, (r.top - vh * 0.1) / (vh * 0.9)));
      el.style.setProperty('--p', p.toFixed(3));
    });
  }

  function requestScrollFrame() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  /* ==========================================================================
     АКТИВНЫЙ ПУНКТ НАВИГАЦИИ
     ========================================================================== */

  function initSpy() {
    var links = $$('.nav__link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href')] = l; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var link = map['#' + e.target.id];
        if (!link) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    ['home', 'games', 'about', 'faq', 'contact'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
    // Секция команды подсвечивает "About"
    var team = document.getElementById('team');
    if (team) { map['#team'] = map['#about']; io.observe(team); }
  }

  /* ==========================================================================
     МОБИЛЬНОЕ МЕНЮ
     ========================================================================== */

  function initMenu() {
    var burger = $('#burger');
    var menu = $('#menu');
    if (!burger || !menu) return;

    function setOpen(open) {
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', I18N.t(open ? 'nav.close' : 'nav.menu'));
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (header) header.classList.toggle('menu-open', open);
    }

    burger.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });

    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });

    // Меню живёт только на мобильных — при переходе на десктоп закрываем.
    window.matchMedia('(min-width: 1024px)').addEventListener
      ? window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); })
      : null;
  }

  /* ==========================================================================
     ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
     ========================================================================== */

  function positionLangThumb() {
    var thumb = $('#langThumb');
    var active = $('.lang__btn.is-active');
    if (!thumb || !active) return;
    thumb.style.width = active.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + (active.offsetLeft - 3) + 'px)';
  }

  function initLang() {
    $$('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18N.setLang(btn.getAttribute('data-lang-btn'));
      });
    });

    document.addEventListener('langapplied', function () {
      positionLangThumb();
      splitHeadings();
      initReveal();
      initFlip();
      initFaq();
      bindMagnetic();
    });
  }

  /* ==========================================================================
     ФЛИП-КАРТЫ КОМАНДЫ
     ========================================================================== */

  function initFlip() {
    $$('[data-flip]').forEach(function (card) {
      if (card.dataset.flipBound) return;
      card.dataset.flipBound = '1';

      // На тач-устройствах переворачиваем тапом.
      if (!canHover) {
        card.addEventListener('click', function () {
          card.classList.toggle('is-flipped');
        });
      }

      // Клавиатура: Enter / Space
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });

      // Лёгкий наклон за курсором
      if (canHover && !reduced) {
        var inner = $('.member__inner', card);
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
          var ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
          inner.style.transform = 'rotateY(' + (180 + ry) + 'deg) rotateX(' + rx + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
          inner.style.transform = '';
        });
      }
    });
  }

  /* ==========================================================================
     МАГНИТНЫЕ КНОПКИ + КАСТОМНЫЙ КУРСОР
     ========================================================================== */

  function bindMagnetic() {
    if (!canHover || reduced) return;

    $$('[data-magnetic]').forEach(function (el) {
      if (el.dataset.magBound) return;
      el.dataset.magBound = '1';

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      });

      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  function initCursor() {
    if (!canHover || reduced) return;

    var dot = $('.cursor');
    var ring = $('.cursor-ring');
    if (!dot || !ring) return;

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      document.body.classList.remove('cursor-hidden');
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      document.body.classList.add('cursor-hidden');
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
      requestAnimationFrame(loop);
    })();

    var HOT = 'a, button, [data-flip], input, textarea, .shot, .card';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(HOT)) document.body.classList.add('cursor-hot');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(HOT)) document.body.classList.remove('cursor-hot');
    });
  }

  /* ==========================================================================
     ФОРМА КОНТАКТОВ (mailto, бэкенда нет)
     ========================================================================== */

  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    var note = $('#formNote');

    function fieldError(name, msg) {
      var field = form.querySelector('[data-field="' + name + '"]');
      if (!field) return;
      field.classList.toggle('has-error', !!msg);
      var slot = $('[data-error]', field);
      if (slot) slot.textContent = msg || '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.name.value.trim();
      var email   = form.email.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();
      var ok = true;

      if (!name)  { fieldError('name', I18N.t('contact.errName')); ok = false; }
      else        { fieldError('name', ''); }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { fieldError('email', I18N.t('contact.errEmail')); ok = false; }
      else                                             { fieldError('email', ''); }

      if (!message) { fieldError('message', I18N.t('contact.errMessage')); ok = false; }
      else          { fieldError('message', ''); }

      if (!ok) return;

      var subj = subject || ('POPOQ GAMES — ' + name);
      var body = message + '\n\n— ' + name + ' (' + email + ')';
      window.location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(subj) +
        '&body=' + encodeURIComponent(body);

      if (note) {
        note.textContent = I18N.t('contact.sent');
        note.classList.add('is-shown');
      }
    });

    // Ошибка снимается, как только пользователь начал править поле.
    $$('input, textarea', form).forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && field.classList.contains('has-error')) {
          field.classList.remove('has-error');
          var slot = $('[data-error]', field);
          if (slot) slot.textContent = '';
        }
      });
    });
  }

  /* ==========================================================================
     ПРЕЛОАДЕР
     ========================================================================== */

  function initPreloader() {
    var pre = $('#preloader');
    if (!pre) { armReveals(); return; }   // без прелоадера анимации стартуют сразу

    var bar = $('#loadBar');
    var count = $('#loadCount');

    // Показываем только при первом заходе за сессию.
    var seen = false;
    try { seen = sessionStorage.getItem('popoq:seen') === '1'; } catch (e) { /* приватный режим */ }

    if (seen || reduced) {
      pre.classList.add('is-done');
      pre.remove();
      armReveals();
      return;
    }

    var done = false;
    var value = 0;
    var timer = setInterval(function () {
      value = Math.min(value + Math.random() * 18 + 7, 100);
      if (bar) bar.style.setProperty('--load', (value / 100).toFixed(3));
      if (count) count.textContent = Math.round(value);
      if (value >= 100) {
        clearInterval(timer);
        setTimeout(finish, 220);
      }
    }, 90);

    function finish() {
      if (done) return;
      done = true;
      clearInterval(timer);
      pre.classList.add('is-done');
      try { sessionStorage.setItem('popoq:seen', '1'); } catch (e) { /* приватный режим */ }

      // Контент оживает прямо под уезжающей шторкой.
      armReveals();
      setTimeout(function () { pre.remove(); }, 1200);
    }

    // Страховка: если что-то пойдёт не так — снимаем прелоадер принудительно.
    setTimeout(finish, 2500);
  }

  /* ==========================================================================
     СТАРТ
     ========================================================================== */

  function init() {
    renderStatic();

    // Слушатели языка вешаем ДО первого setLang: именно они запускают
    // split, reveal, флип-карты и магнитные кнопки после каждого рендера.
    initLang();

    // Каждый раз перед сменой языка перерисовываем динамические блоки.
    I18N.onBeforeApply(renderDynamic);
    I18N.setLang(I18N.detect());   // отрисует контент и применит переводы

    initPreloader();
    initMenu();
    initForm();
    initCursor();
    initSpy();
    initCounters();

    positionLangThumb();
    window.addEventListener('resize', positionLangThumb);

    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', requestScrollFrame);
    onScrollFrame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
