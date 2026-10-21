(function () {
  'use strict';
  var WA = '6281241471095';
  var MAIL = 'info@gamicorp-indonesia.com';
  var $ = function (s, r) { return (r || document).querySelector(s); };

  // Mobile menu
  var menu = $('#menu'), nav = $('#nav');
  if (menu && nav) {
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Build the buying-brief text from the form
  var form = $('#brief');
  function brief() {
    var v = function (id) { return (($(id) || {}).value || '').trim(); };
    var rows = [
      ['Species or product', v('#f-sp')],
      ['Quantity', v('#f-q')],
      ['Destination', v('#f-d')],
      ['Specification / documents', v('#f-s')]
    ].filter(function (r) { return r[1]; });
    var lines = ['Hello GAMI Marine, I would like to check availability.'];
    rows.forEach(function (r) { lines.push(r[0] + ': ' + r[1]); });
    return lines.join('\n');
  }
  function syncLinks() {
    var text = brief();
    var mail = $('#mail');
    if (mail) mail.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Seafood buying brief') + '&body=' + encodeURIComponent(text);
    var wa = $('#wa-direct');
    if (wa) wa.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
  }
  if (form) {
    form.addEventListener('input', syncLinks);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(brief()), '_blank', 'noopener');
    });
    syncLinks();
  }

  // "Ask about ..." links pre-fill the species field
  document.querySelectorAll('[data-ask]').forEach(function (a) {
    a.addEventListener('click', function () {
      var f = $('#f-sp');
      if (f && !f.value) { f.value = a.getAttribute('data-ask'); syncLinks(); }
    });
  });

  // Scroll reveal
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
