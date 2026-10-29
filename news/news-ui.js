/* Mercantil One — News: formatting helpers shared by the advisor and admin views. */
(function (global) {
  'use strict';

  var MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
                     'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // 'YYYY-MM-DD' as a local date (new Date('YYYY-MM-DD') would be UTC midnight).
  function day(value) {
    var p = String(value).slice(0, 10).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  // Short badge text: "30 OCT – 1 NOV", "30 – 31 OCT", "30 OCT".
  function eventBadge(start, end) {
    if (!start) return '';
    var a = day(start), b = end ? day(end) : a;
    var ma = MONTHS[a.getMonth()].toUpperCase(), mb = MONTHS[b.getMonth()].toUpperCase();
    if (a.getTime() === b.getTime()) return a.getDate() + ' ' + ma;
    if (a.getMonth() === b.getMonth()) return a.getDate() + ' – ' + b.getDate() + ' ' + ma;
    return a.getDate() + ' ' + ma + ' – ' + b.getDate() + ' ' + mb;
  }

  // Long text: "Del 30 de octubre al 1 de noviembre de 2026".
  function eventRange(start, end) {
    if (!start) return '';
    var a = day(start), b = end ? day(end) : a;
    var fa = a.getDate() + ' de ' + MONTHS_LONG[a.getMonth()];
    var fb = b.getDate() + ' de ' + MONTHS_LONG[b.getMonth()] + ' de ' + b.getFullYear();
    if (a.getTime() === b.getTime()) return fb;
    if (a.getFullYear() !== b.getFullYear()) fa += ' de ' + a.getFullYear();
    return 'Del ' + fa + ' al ' + fb;
  }

  function timeAgo(value) {
    if (!value) return '';
    var s = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
    if (s < 60) return 'Ahora';
    if (s < 3600) return 'Hace ' + Math.floor(s / 60) + ' min';
    if (s < 86400) return 'Hace ' + Math.floor(s / 3600) + ' h';
    var d = Math.floor(s / 86400);
    return d === 1 ? 'Ayer' : 'Hace ' + d + ' días';
  }

  function dateTime(value) {
    if (!value) return '—';
    var d = new Date(value);
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() + ', ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  global.NewsUI = { esc: esc, eventBadge: eventBadge, eventRange: eventRange, timeAgo: timeAgo, dateTime: dateTime };
})(window);
