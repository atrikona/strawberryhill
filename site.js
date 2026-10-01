/* Shared behaviour for every page: menu, Industries dropdown, reveal on scroll,
   header tightening, industry image swap (homepage), FAQ accordion + search, contact form. */
(function () {
  var d = document;

  /* ----- mobile menu ----- */
  var mt = d.getElementById('menuToggle');
  if (mt) {
    mt.addEventListener('click', function () {
      var nl = d.getElementById('navLinks');
      nl.classList.toggle('open');
      mt.setAttribute('aria-expanded', nl.classList.contains('open'));
    });
  }

  /* ----- Industries dropdown (click for touch, hover/focus handled in CSS) ----- */
  var dds = d.querySelectorAll('.nav-dd');
  function closeDropdowns() {
    dds.forEach(function (dd) {
      dd.classList.remove('open');
      var b = dd.querySelector('.nav-dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  dds.forEach(function (dd) {
    var b = dd.querySelector('.nav-dd-btn');
    dd.addEventListener('click', function (e) { if (e.target.closest('details')) e.stopPropagation(); });
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var was = dd.classList.contains('open');
      closeDropdowns();
      if (!was) { dd.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    });
  });
  dds.forEach(function (dd) {
    dd.addEventListener('mouseleave', function () {
      dd.querySelectorAll('details').forEach(function (x) { x.removeAttribute('open'); });
    });
  });
  d.addEventListener('click', closeDropdowns);
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDropdowns(); });

  /* ----- reveal on scroll ----- */
  var els = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* ----- header tightens after scrolling ----- */
  var hdr = d.querySelector('header.site');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- homepage: hovering/focusing an industry swaps the large image ----- */
  var links = d.querySelectorAll('#indList a');
  if (links.length) {
    var panels = d.querySelectorAll('#stage .h-panel');
    var show = function (i) {
      panels.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-i') === i); });
      links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-i') === i); });
    };
    links.forEach(function (a) {
      var i = a.getAttribute('data-i');
      a.addEventListener('mouseenter', function () { show(i); });
      a.addEventListener('focus', function () { show(i); });
    });
  }


  /* ----- footer: disclosures toggle ----- */
  var db = d.getElementById('sfDiscBtn'), dt = d.getElementById('sfDisc');
  if (db && dt) {
    db.addEventListener('click', function () {
      var open = dt.classList.toggle('open');
      db.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) dt.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ----- services: tabbed explorer ----- */
  var stabs = [].slice.call(d.querySelectorAll('.svc-tab'));
  if (stabs.length) {
    var spanels = [].slice.call(d.querySelectorAll('.svc-panel'));
    var pick = function (i) {
      stabs.forEach(function (t) { var on = t.getAttribute('data-i') === i; t.classList.toggle('on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
      spanels.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-i') === i); });
    };
    stabs.forEach(function (t, k) {
      t.setAttribute('tabindex', '0');
      t.addEventListener('click', function () { pick(t.getAttribute('data-i')); });
      t.addEventListener('mouseenter', function () { if (window.matchMedia('(hover:hover) and (min-width:1001px)').matches) pick(t.getAttribute('data-i')); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? k + 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? k - 1 : -1;
        if (n >= 0 && n < stabs.length) { e.preventDefault(); stabs[n].focus(); pick(stabs[n].getAttribute('data-i')); }
      });
    });
  }

  /* ----- FAQ: accordion + instant search ----- */
  var items = [].slice.call(d.querySelectorAll('.faq-item'));
  function setOpen(item, open) {
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    item.classList.toggle('open', open);
    q.setAttribute('aria-expanded', open ? 'true' : 'false');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : null;
  }
  items.forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      if (!d.body.classList.contains('faq-searching')) items.forEach(function (o) { setOpen(o, false); });
      setOpen(item, !wasOpen);
    });
  });

  var input = d.getElementById('faqSearch');
  if (input) {
    var box = input.parentNode;
    var groups = [].slice.call(d.querySelectorAll('.faq-group'));
    var empty = d.getElementById('faqEmpty');
    var status = d.getElementById('faqStatus');
    var stop = { the:1, and:1, for:1, you:1, your:1, our:1, can:1, how:1, what:1, why:1, does:1, are:1, with:1, this:1, that:1, have:1, need:1, about:1, into:1, from:1, will:1, get:1, any:1, not:1, but:1, its:1 };
    var data = items.map(function (it) {
      return {
        el: it,
        q: it.querySelector('.faq-q span').textContent.toLowerCase(),
        all: it.textContent.toLowerCase()
      };
    });
    var stems = function (s) {
      return s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
        .filter(function (w) { return w.length > 2 && !stop[w]; })
        .map(function (w) { return w.replace(/(ing|ed|es|s|e)$/, ''); })
        .filter(function (w) { return w.length > 1; });
    };
    var run = function () {
      var raw = input.value.trim();
      box.classList.toggle('has-q', raw.length > 0);
      d.body.classList.toggle('faq-searching', raw.length > 0);
      if (!raw) {
        items.forEach(function (it) { it.style.display = ''; it.classList.remove('hit'); setOpen(it, false); });
        groups.forEach(function (g) { g.style.display = ''; });
        if (empty) empty.style.display = 'none';
        if (status) status.textContent = '';
        return;
      }
      var ws = stems(raw);
      var syn = { cost:['pricing','price'], price:['pricing'], fee:['pricing'], much:[], expensive:['pricing'], afford:['pricing'], quote:['pricing'],
        audit:['irs'], notice:['irs'], letter:['irs'], quickbooks:['software'], xero:['software'], switch:['switching'], cancel:['contract'], commitment:['contract'],
        lock:['contract'], remote:['near','located'], location:['located'], safe:['secure'], privacy:['secure'], call:['talk'], meeting:['talk'], messy:['behind'], catch:['behind'] };
      var extra = [];
      raw.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).forEach(function (w) { (syn[w] || []).forEach(function (x) { if (extra.indexOf(x) < 0) extra.push(x); }); });
      ws = ws.concat(extra);
      var scored = data.map(function (o) {
        var s = 0;
        ws.forEach(function (w) {
          if (o.q.indexOf(w) > -1) s += 3;
          else if (o.all.indexOf(w) > -1) s += 1;
        });
        return { o: o, s: s };
      });
      var max = 0;
      scored.forEach(function (x) { if (x.s > max) max = x.s; });
      var keep = [];
      if (max > 0) {
        scored.filter(function (x) { return x.s >= Math.max(1, max - 1); })
          .sort(function (a, b) { return b.s - a.s; })
          .slice(0, 4).forEach(function (x) { keep.push(x.o.el); });
      }
      items.forEach(function (it) {
        var on = keep.indexOf(it) > -1;
        it.style.display = on ? '' : 'none';
        it.classList.toggle('hit', on);
        setOpen(it, on);
      });
      groups.forEach(function (g) {
        var any = [].slice.call(g.querySelectorAll('.faq-item')).some(function (it) { return it.style.display !== 'none'; });
        g.style.display = any ? '' : 'none';
      });
      if (empty) empty.style.display = keep.length ? 'none' : 'block';
      if (status) status.textContent = keep.length ? (keep.length === 1 ? 'Best match:' : 'Best matches:') : '';
    };
    input.addEventListener('input', run);
    var clear = d.getElementById('faqClear');
    if (clear) clear.addEventListener('click', function () { input.value = ''; run(); input.focus(); });
    d.querySelectorAll('.faq-chips button').forEach(function (b) {
      b.addEventListener('click', function () { input.value = b.getAttribute('data-q'); run(); input.focus(); });
    });
  }

  /* ----- contact form ----- */
  var sel = d.getElementById('interest');
  if (sel) {
    var params = new URLSearchParams(window.location.search);
    var want = params.get('service') || params.get('plan');
    if (want) {
      var map = { bookkeeping: 'Bookkeeping & Accounting', payroll: 'Payroll', advisory: 'Advisory & FP&A', readiness: 'Growth & Transition Readiness' };
      var target = (map[want] || want).toLowerCase();
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.toLowerCase() === target) { sel.selectedIndex = i; break; }
      }
    }
  }
  var f = d.getElementById('interestForm');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = d.getElementById('submitBtn');
      var ok = d.getElementById('formConfirm');
      var bad = d.getElementById('formError');
      ok.classList.remove('show'); bad.classList.remove('show');
      // If the form endpoint hasn't been configured yet, just show confirmation.
      if (f.action.indexOf('YOUR_FORM_ID') !== -1) {
        var g = function (n) { var el = f.elements[n]; return el ? el.value.trim() : ''; };
        var body = 'Name: ' + g('First name') + ' ' + g('Last name') + '\nBusiness: ' + g('Business') + '\nEmail: ' + g('email') + '\nPhone: ' + g('Phone') + '\nInterested in: ' + g('Interested in') + '\n\n' + g('Message');
        var subj = 'Website inquiry from ' + g('Business');
        window.location.href = 'mailto:atrikona@strawberryhillaccounting.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
        ok.innerHTML = 'Your email app should open with your message ready to send. If it doesn&rsquo;t, email us at <a href="mailto:atrikona@strawberryhillaccounting.com">atrikona@strawberryhillaccounting.com</a>.';
        ok.classList.add('show'); return;
      }
      btn.disabled = true; btn.textContent = 'Sending...';
      fetch(f.action, { method: 'POST', body: new FormData(f), headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (r.ok) { ok.classList.add('show'); f.reset(); } else { bad.classList.add('show'); } })
        .catch(function () { bad.classList.add('show'); })
        .finally(function () { btn.disabled = false; btn.textContent = 'Send'; });
    });
  }
})();
