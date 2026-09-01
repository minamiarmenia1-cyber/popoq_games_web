/* ============================================================================
   POPOQ GAMES — ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО ПРАВИТЬ ДЛЯ СМЕНЫ КОНТЕНТА
   ----------------------------------------------------------------------------
   Здесь лежат: ссылки студии, список игр, состав команды и все тексты (EN/RU).
   Чтобы поставить реальные картинки — просто поменяй пути в `cover`, `shots`,
   `front` и `photo` на свои файлы из assets/games/ и assets/team/.
   ========================================================================== */

window.CONTENT = {
  /* --- Студия и ссылки -------------------------------------------------- */
  studio: {
    name: 'POPOQ GAMES',
    email: 'hello@popoqgames.com',
    founded: '2026',
    // Поставь сюда реальные ссылки. '#' = ссылка пока не активна.
    links: {
      steam: '#',
      discord: '#',
      instagram: '#',
      tiktok: '#'
    }
  },

  /* --- Игры ------------------------------------------------------------- */
  /* Чтобы добавить новую игру — скопируй объект и добавь в массив.          */
  games: [
    {
      id: 'project-one',
      featured: true,
      code: '01',
      title: 'PROJECT ONE',
      cover: 'assets/placeholders/game-hero-16x9.svg',
      shots: [
        'assets/placeholders/game-shot-1.svg',
        'assets/placeholders/game-shot-2.svg',
        'assets/placeholders/game-shot-3.svg',
        'assets/placeholders/game-shot-4.svg'
      ],
      steam: '#',
      status: { en: 'IN DEVELOPMENT', ru: 'В РАЗРАБОТКЕ' },
      tagline: {
        en: 'Our first game. Coming to Steam.',
        ru: 'Наша первая игра. Скоро в Steam.'
      },
      description: {
        en: 'A hand-crafted experience built by three people who care about every pixel. We are polishing it right now — wishlist it on Steam and you will be the first to know when it drops.',
        ru: 'Игра, собранная вручную тремя людьми, которым важен каждый пиксель. Сейчас доводим её до ума — добавь в список желаемого в Steam, и ты узнаешь о релизе первым.'
      },
      specs: [
        { label: { en: 'Genre', ru: 'Жанр' }, value: { en: 'TBA', ru: 'Скоро' } },
        { label: { en: 'Players', ru: 'Игроки' }, value: { en: '1 Player', ru: '1 игрок' } },
        { label: { en: 'Release', ru: 'Релиз' }, value: { en: 'TBA', ru: 'Скоро' } },
        { label: { en: 'Platform', ru: 'Платформа' }, value: { en: 'PC / Steam', ru: 'PC / Steam' } }
      ]
    },
    {
      id: 'project-two',
      featured: false,
      code: '02',
      title: '???',
      cover: 'assets/placeholders/game-next.svg',
      shots: [],
      steam: null,
      status: { en: 'CONCEPT', ru: 'КОНЦЕПТ' },
      tagline: {
        en: 'Something new is already on the table.',
        ru: 'Кое-что новое уже в работе.'
      },
      description: {
        en: 'We are a studio, not a one-game project. The next one is already sketched out.',
        ru: 'Мы студия, а не проект одной игры. Следующая уже в набросках.'
      },
      specs: []
    }
  ],

  /* --- Команда ---------------------------------------------------------- */
  /* front = пиксельный аватар (лицо карточки)                              */
  /* photo = реальное фото (оборот карточки, показывается при наведении)    */
  team: [
    {
      id: 'dev',
      name: 'GARNIK PAPYAN',
      handle: '@developer',
      front: 'assets/placeholders/team-front-1.svg',
      photo: 'assets/placeholders/team-back-1.svg',
      role: { en: 'Developer & Game Creator', ru: 'Разработчик и создатель игры' },
      bio: {
        en: 'Writes the code, builds the systems, ships the builds.',
        ru: 'Пишет код, собирает системы, выпускает билды.'
      }
    },
    {
      id: 'design-1',
      name: 'MANE PAPYAN',
      handle: '@designer',
      front: 'assets/placeholders/team-front-2.svg',
      photo: 'assets/placeholders/team-back-2.svg',
      role: { en: 'Designer & Creator', ru: 'Дизайнер и создатель' },
      bio: {
        en: 'Shapes the world, the characters and everything you look at.',
        ru: 'Формирует мир, персонажей и всё, на что ты смотришь.'
      }
    },
    {
      id: 'design-2',
      name: 'ANHELINA POHOSIAN',
      handle: '@designer',
      front: 'assets/placeholders/team-front-3.svg',
      photo: 'assets/placeholders/team-back-3.svg',
      role: { en: 'Designer & Creator', ru: 'Дизайнер и создатель' },
      bio: {
        en: 'Owns the feel, the interface and the details nobody notices — until they are gone.',
        ru: 'Отвечает за ощущение, интерфейс и детали, которых не замечают — пока их нет.'
      }
    }
  ],

  /* --- Тексты интерфейса ------------------------------------------------ */
  i18n: {
    en: {
      'meta.title': 'POPOQ GAMES — Independent Game Studio',
      'meta.description': 'POPOQ GAMES is a three-person independent game studio. Our first game is coming to Steam.',

      'nav.home': 'Home',
      'nav.games': 'Games',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.menu': 'Menu',
      'nav.close': 'Close',

      'cta.wishlist': 'Wishlist on Steam',
      'cta.discover': 'See the game',
      'cta.team': 'Meet the team',
      'cta.email': 'Send message',
      'cta.discord': 'Join our Discord',

      'hero.eyebrow': 'Independent game studio',
      'hero.line1': 'POPOQ',
      'hero.line2': 'GAMES',
      'hero.lead': 'Three people. One first game. A studio built to make things that feel good to play.',
      'hero.scroll': 'Scroll',

      'marquee.text': 'POPOQ GAMES ✦ WISHLIST ON STEAM ✦ FIRST GAME COMING ✦ MADE BY THREE PEOPLE ✦',

      'games.label': '01 — Games',
      'games.title': 'What we are building',
      'games.lead': 'One game in the oven, more on the way. Everything you see below is made in-house.',
      'games.gallery': 'Screenshots',
      'games.soon': 'Announcement soon',

      'about.label': '02 — Studio',
      'about.title': 'A small studio with a long plan',
      'about.p1': 'POPOQ GAMES is an independent studio of three. No publisher telling us what to cut, no roadmap written by a spreadsheet — just a developer and two designers making the game we actually want to play.',
      'about.p2': 'Our first title is heading to Steam. It is not the last one. Everything we ship is built the same way: small team, full control, obsessive polish.',
      'about.stat1': 'People in the studio',
      'about.stat2': 'Game in development',
      'about.stat3': 'Publishers involved',

      'team.label': '03 — Creators',
      'team.title': 'The people behind it',
      'team.lead': 'Hover a card to flip it — like turning a block in Minecraft.',
      'team.leadTouch': 'Tap a card to flip it — like turning a block in Minecraft.',
      'team.hint': 'Hover to flip',
      'team.hintTouch': 'Tap to flip',

      'contact.label': '04 — Contact',
      'contact.title': 'Say hello',
      'contact.lead': 'Press, collaborations, bug reports or just a nice word — write to us. We read everything.',
      'contact.name': 'Your name',
      'contact.email': 'Your email',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.namePh': 'How should we call you?',
      'contact.emailPh': 'you@example.com',
      'contact.subjectPh': 'What is this about?',
      'contact.messagePh': 'Tell us everything…',
      'contact.direct': 'Or write directly',
      'contact.community': 'Community',
      'contact.communityText': 'The fastest way to reach us and to see the game grow in real time.',
      'contact.sent': 'Your mail app is opening — we will reply as soon as we can.',
      'contact.errName': 'Please tell us your name.',
      'contact.errEmail': 'Please enter a valid email.',
      'contact.errMessage': 'Please write a message.',

      'footer.tagline': 'Independent game studio.',
      'footer.nav': 'Navigation',
      'footer.social': 'Follow us',
      'footer.rights': 'All rights reserved.',
      'footer.top': 'Back to top',

      'ui.loading': 'Loading',
      'ui.lang': 'Language'
    },

    ru: {
      'meta.title': 'POPOQ GAMES — независимая игровая студия',
      'meta.description': 'POPOQ GAMES — независимая игровая студия из трёх человек. Наша первая игра скоро выйдет в Steam.',

      'nav.home': 'Главная',
      'nav.games': 'Игры',
      'nav.about': 'О нас',
      'nav.contact': 'Контакты',
      'nav.menu': 'Меню',
      'nav.close': 'Закрыть',

      'cta.wishlist': 'В желаемое в Steam',
      'cta.discover': 'Смотреть игру',
      'cta.team': 'Наша команда',
      'cta.email': 'Отправить письмо',
      'cta.discord': 'Зайти в Discord',

      'hero.eyebrow': 'Независимая игровая студия',
      'hero.line1': 'POPOQ',
      'hero.line2': 'GAMES',
      'hero.lead': 'Три человека. Одна первая игра. Студия, созданная делать то, во что приятно играть.',
      'hero.scroll': 'Вниз',

      'marquee.text': 'POPOQ GAMES ✦ ДОБАВЬ В ЖЕЛАЕМОЕ В STEAM ✦ ПЕРВАЯ ИГРА УЖЕ СКОРО ✦ СДЕЛАНО ВТРОЁМ ✦',

      'games.label': '01 — Игры',
      'games.title': 'Что мы делаем',
      'games.lead': 'Одна игра на подходе, дальше будут ещё. Всё, что ты видишь ниже, сделано нами.',
      'games.gallery': 'Скриншоты',
      'games.soon': 'Анонс скоро',

      'about.label': '02 — Студия',
      'about.title': 'Маленькая студия с длинным планом',
      'about.p1': 'POPOQ GAMES — независимая студия из трёх человек. Никакого издателя, который скажет что вырезать, никакой дорожной карты из таблицы — просто разработчик и два дизайнера делают игру, в которую хотят играть сами.',
      'about.p2': 'Наша первая игра идёт в Steam. И она не последняя. Всё, что мы выпускаем, делается одинаково: маленькая команда, полный контроль, одержимость деталями.',
      'about.stat1': 'Человека в студии',
      'about.stat2': 'Игра в разработке',
      'about.stat3': 'Издателей над нами',

      'team.label': '03 — Создатели',
      'team.title': 'Люди, которые это делают',
      'team.lead': 'Наведи на карточку — она перевернётся, как блок в Minecraft.',
      'team.leadTouch': 'Нажми на карточку — она перевернётся, как блок в Minecraft.',
      'team.hint': 'Наведи, чтобы перевернуть',
      'team.hintTouch': 'Нажми, чтобы перевернуть',

      'contact.label': '04 — Контакты',
      'contact.title': 'Напиши нам',
      'contact.lead': 'Пресса, сотрудничество, баг-репорты или просто доброе слово — пиши. Мы читаем всё.',
      'contact.name': 'Имя',
      'contact.email': 'Почта',
      'contact.subject': 'Тема',
      'contact.message': 'Сообщение',
      'contact.namePh': 'Как к тебе обращаться?',
      'contact.emailPh': 'you@example.com',
      'contact.subjectPh': 'О чём речь?',
      'contact.messagePh': 'Расскажи всё…',
      'contact.direct': 'Или напиши напрямую',
      'contact.community': 'Сообщество',
      'contact.communityText': 'Самый быстрый способ до нас достучаться и следить за игрой в реальном времени.',
      'contact.sent': 'Открываем твой почтовый клиент — ответим как только сможем.',
      'contact.errName': 'Напиши, как тебя зовут.',
      'contact.errEmail': 'Проверь адрес почты.',
      'contact.errMessage': 'Напиши сообщение.',

      'footer.tagline': 'Независимая игровая студия.',
      'footer.nav': 'Навигация',
      'footer.social': 'Мы в соцсетях',
      'footer.rights': 'Все права защищены.',
      'footer.top': 'Наверх',

      'ui.loading': 'Загрузка',
      'ui.lang': 'Язык'
    }
  }
};
