/*
 * Mercantil One — News store.
 *
 * Demo implementation on localStorage. The public interface mirrors the REST
 * contract in news/README.md, so in Mercantil One only this file is replaced by
 * fetch() calls; the advisor and admin views stay the same.
 */
(function (global) {
  'use strict';

  var KEY_NEWS = 'mo.news.items.v1';
  var KEY_READS = 'mo.news.reads.v1';
  var KEY_SEEDED = 'mo.news.seeded.v1';

  // Demo advisors. In Mercantil One these come from the users table (role = advisor).
  var ADVISORS = [
    { id: 'adv-001', name: 'Ana Rodríguez' },
    { id: 'adv-002', name: 'Carlos Méndez' },
    { id: 'adv-003', name: 'Laura Peña' },
    { id: 'adv-004', name: 'José Martínez' }
  ];

  var SEED = [
    {
      id: 'senderos-open-house-2026',
      title: 'SENDEROS OPEN HOUSE',
      summary: 'Te esperamos el 30 y 31 de octubre y el 1 de noviembre de 2026.',
      body:
        'Te invitamos al Open House de Senderos.\n\n' +
        'Fechas:\n' +
        '• Viernes 30 de octubre de 2026\n' +
        '• Sábado 31 de octubre de 2026\n' +
        '• Domingo 1 de noviembre de 2026\n\n' +
        'Invita a tus clientes y coordina sus visitas con tiempo.',
      category: 'Evento',
      author: 'Mercantil',
      imageUrl: '',
      location: '',
      eventStart: '2026-10-30',
      eventEnd: '2026-11-01',
      publishAt: '2026-10-29T00:00:00',
      expiresAt: '2026-11-02T00:00:00',
      pinned: true,
      status: 'published',
      createdAt: '2026-10-29T00:00:00',
      updatedAt: '2026-10-29T00:00:00'
    }
  ];

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }

  function seed() {
    if (load(KEY_SEEDED, false)) return;
    store(KEY_NEWS, SEED);
    store(KEY_READS, []);
    store(KEY_SEEDED, true);
  }

  function uid() {
    return 'n-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function ts(value) {
    return value ? new Date(value).getTime() : NaN;
  }

  // Published, already live and not expired.
  function isLive(item, now) {
    now = now || Date.now();
    if (item.status !== 'published') return false;
    if (item.publishAt && ts(item.publishAt) > now) return false;
    if (item.expiresAt && ts(item.expiresAt) <= now) return false;
    return true;
  }

  // Pinned first, then newest publication first.
  function byPriority(a, b) {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
    return (ts(b.publishAt || b.createdAt) || 0) - (ts(a.publishAt || a.createdAt) || 0);
  }

  var NewsStore = {
    advisors: function () { return ADVISORS.slice(); },

    list: function () {
      return load(KEY_NEWS, []).slice().sort(byPriority);
    },

    get: function (id) {
      return load(KEY_NEWS, []).filter(function (n) { return n.id === id; })[0] || null;
    },

    save: function (item) {
      var items = load(KEY_NEWS, []);
      var now = new Date().toISOString();
      if (item.id) {
        items = items.map(function (n) {
          return n.id === item.id ? Object.assign({}, n, item, { updatedAt: now }) : n;
        });
      } else {
        item = Object.assign({}, item, { id: uid(), createdAt: now, updatedAt: now });
        items.push(item);
      }
      store(KEY_NEWS, items);
      return item;
    },

    remove: function (id) {
      store(KEY_NEWS, load(KEY_NEWS, []).filter(function (n) { return n.id !== id; }));
      store(KEY_READS, load(KEY_READS, []).filter(function (r) { return r.newsId !== id; }));
    },

    // What the advisor sees on login: live news they have not opened yet.
    unreadFor: function (advisorId) {
      var read = {};
      load(KEY_READS, []).forEach(function (r) {
        if (r.advisorId === advisorId) read[r.newsId] = true;
      });
      return this.list().filter(function (n) { return isLive(n) && !read[n.id]; });
    },

    markRead: function (newsId, advisorId) {
      var reads = load(KEY_READS, []);
      var exists = reads.some(function (r) { return r.newsId === newsId && r.advisorId === advisorId; });
      if (!exists) {
        reads.push({ newsId: newsId, advisorId: advisorId, readAt: new Date().toISOString() });
        store(KEY_READS, reads);
      }
    },

    readsFor: function (newsId) {
      return load(KEY_READS, []).filter(function (r) { return r.newsId === newsId; });
    },

    resetReads: function (newsId) {
      store(KEY_READS, load(KEY_READS, []).filter(function (r) { return newsId && r.newsId !== newsId; }));
    },

    isLive: isLive
  };

  seed();
  global.NewsStore = NewsStore;
})(window);
