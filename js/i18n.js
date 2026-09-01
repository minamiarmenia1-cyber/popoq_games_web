/* ============================================================================
   POPOQ GAMES — i18n.js
   Переключение EN/RU. Все тексты живут в js/content.js
   ========================================================================== */

window.I18N = (function () {
  var DICT = window.CONTENT.i18n;
  var SUPPORTED = Object.keys(DICT);       // ['en', 'ru']
  var STORE_KEY = 'popoq:lang';
  var current = 'en';

  /* Хук: app.js кладёт сюда функцию перерисовки динамических блоков
     (карточки игр и команды), чтобы они тоже меняли язык. */
  var beforeApply = null;

  function detect() {
    var saved;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { saved = null; }
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    // Русский показываем носителям ru/be/uk/kk — остальным английский.
    if (['ru', 'be', 'uk', 'kk'].indexOf(nav) !== -1) return 'ru';
    return 'en';
  }

  /** Перевод по ключу. Если ключа нет — падаем на английский, затем на сам ключ. */
  function t(key, lang) {
    var l = lang || current;
    return (DICT[l] && DICT[l][key]) || DICT.en[key] || key;
  }

  /** Локализованное поле объекта: {en:'…', ru:'…'} либо простая строка. */
  function pick(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang || current] || value.en || '';
  }

  function apply() {
    var doc = document.documentElement;
    doc.lang = current;
    doc.setAttribute('data-lang', current);

    document.title = t('meta.title');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // Кнопки переключателя
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-btn') === current;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('langapplied', { detail: { lang: current } }));
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    current = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* приватный режим */ }

    if (typeof beforeApply === 'function') beforeApply(current);
    apply();
  }

  return {
    get lang() { return current; },
    supported: SUPPORTED,
    t: t,
    pick: pick,
    apply: apply,
    setLang: setLang,
    detect: detect,
    onBeforeApply: function (fn) { beforeApply = fn; }
  };
})();
