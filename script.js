(function () {
  'use strict';

  /* ---------- año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- animación de entrada ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- link activo del menú ---------- */
  var links = document.querySelectorAll('.nav nav a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[entry.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ---------- lightbox ---------- */
  var dlg = document.getElementById('lightbox');
  var lbImg = dlg.querySelector('img');
  var lbCap = dlg.querySelector('.lb-cap');
  var btnPrev = dlg.querySelector('.lb-prev');
  var btnNext = dlg.querySelector('.lb-next');
  var lbOpen = dlg.querySelector('.lb-open');
  var list = [];
  var idx = 0;

  function show(i) {
    idx = (i + list.length) % list.length;
    var btn = list[idx];
    var img = btn.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbOpen.href = lbImg.src;
    lbCap.textContent = btn.getAttribute('data-caption') || '';
    var multi = list.length > 1;
    btnPrev.hidden = !multi;
    btnNext.hidden = !multi;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.zoom');
    if (!btn) return;
    var group = btn.getAttribute('data-group');
    list = Array.prototype.slice.call(document.querySelectorAll('.zoom[data-group="' + group + '"]'));
    show(list.indexOf(btn));
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  });

  btnPrev.addEventListener('click', function () { show(idx - 1); });
  btnNext.addEventListener('click', function () { show(idx + 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* ---------- "Más juegos": abrir si el link apunta ahí ---------- */
  var more = document.getElementById('mas-juegos');
  function openMoreFromHash() {
    if (more && location.hash === '#mas-juegos') {
      more.open = true;
      more.scrollIntoView();
    }
  }
  openMoreFromHash();
  window.addEventListener('hashchange', openMoreFromHash);

  /* ---------- copiar correo ---------- */
  var copyBtn = document.getElementById('copy-mail');
  var status = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.getAttribute('data-mail');
      function ok() { status.textContent = '¡Correo copiado!'; }
      function fail() { status.textContent = 'No se pudo copiar. Escríbeme a ' + mail; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(ok, fail);
      } else {
        fail();
      }
      setTimeout(function () { status.textContent = ''; }, 3500);
    });
  }
})();
