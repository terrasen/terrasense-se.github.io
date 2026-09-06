/* Terra Sense — living leaves canvas engine
   Five Swedish tree species tumbling in 3D on the wind, in three depth
   planes. Leaves that drift over text dive to the blurred far plane and
   rise again in open space. When the reader stops scrolling, free-drifting
   leaves calm down; settled formations stay visible. Per chapter
   (data-scene) the leaves gather into gentle formations — three clusters,
   the BBiC triangle, a heart — in the leaf corridor on wide screens and in
   dedicated breathing interludes (data-scene-mobile) on narrow screens. */
(function () {
  'use strict';

  var canvas = document.getElementById('leaves');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var TAU = Math.PI * 2;
  var W = 0, H = 0, DPR = 1;

  document.documentElement.classList.add('js-leaves');

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();

  /* ---------- species ---------- */

  var SPECIES = [
    {
      name: 'ek', wf: 0.52,
      colors: [[127, 160, 108], [156, 138, 92], [143, 158, 102]],
      trace: function (c, L, Wd) {
        c.moveTo(-L / 2, 0);
        c.quadraticCurveTo(-L * 0.42, -Wd * 0.70, -L * 0.28, -Wd * 0.50);
        c.quadraticCurveTo(-L * 0.16, -Wd * 1.05, -L * 0.02, -Wd * 0.62);
        c.quadraticCurveTo(L * 0.12, -Wd * 1.00, L * 0.24, -Wd * 0.55);
        c.quadraticCurveTo(L * 0.36, -Wd * 0.75, L * 0.50, 0);
        c.quadraticCurveTo(L * 0.36, Wd * 0.75, L * 0.24, Wd * 0.55);
        c.quadraticCurveTo(L * 0.12, Wd * 1.00, -L * 0.02, Wd * 0.62);
        c.quadraticCurveTo(-L * 0.16, Wd * 1.05, -L * 0.28, Wd * 0.50);
        c.quadraticCurveTo(-L * 0.42, Wd * 0.70, -L / 2, 0);
      }
    },
    {
      name: 'bjork', wf: 0.50,
      colors: [[224, 200, 126], [174, 203, 160], [204, 190, 120]],
      trace: function (c, L, Wd) {
        c.moveTo(-L / 2, 0);
        c.quadraticCurveTo(-L * 0.38, -Wd * 1.05, -L * 0.10, -Wd * 0.88);
        c.quadraticCurveTo(L * 0.18, -Wd * 0.45, L * 0.50, 0);
        c.quadraticCurveTo(L * 0.18, Wd * 0.45, -L * 0.10, Wd * 0.88);
        c.quadraticCurveTo(-L * 0.38, Wd * 1.05, -L / 2, 0);
      }
    },
    {
      name: 'lonn', wf: 0.55,
      colors: [[201, 162, 75], [191, 121, 81], [186, 143, 96]],
      trace: function (c, L) {
        var cx0 = -L * 0.05;
        function pt(deg, d) {
          var a = deg * Math.PI / 180;
          return [cx0 + Math.cos(a) * d, Math.sin(a) * d];
        }
        var lobes = [pt(-132, L * 0.38), pt(-72, L * 0.46), pt(0, L * 0.58), pt(72, L * 0.46), pt(132, L * 0.38)];
        var notches = [pt(-100, L * 0.17), pt(-38, L * 0.20), pt(38, L * 0.20), pt(100, L * 0.17)];
        var base = pt(180, L * 0.45);
        c.moveTo(base[0], base[1]);
        c.quadraticCurveTo(cx0 - L * 0.30, -L * 0.20, lobes[0][0], lobes[0][1]);
        for (var i = 0; i < 4; i++) {
          c.quadraticCurveTo(notches[i][0], notches[i][1], lobes[i + 1][0], lobes[i + 1][1]);
        }
        c.quadraticCurveTo(cx0 - L * 0.30, L * 0.20, base[0], base[1]);
      }
    },
    {
      name: 'asp', wf: 0.60,
      colors: [[157, 185, 138], [174, 203, 160], [167, 178, 122]],
      trace: function (c, L, Wd) {
        c.moveTo(-L / 2, 0);
        c.quadraticCurveTo(-L * 0.55, -Wd * 1.15, L * 0.02, -Wd * 0.95);
        c.quadraticCurveTo(L * 0.42, -Wd * 0.55, L * 0.50, 0);
        c.quadraticCurveTo(L * 0.42, Wd * 0.55, L * 0.02, Wd * 0.95);
        c.quadraticCurveTo(-L * 0.55, Wd * 1.15, -L / 2, 0);
      }
    },
    {
      name: 'salg', wf: 0.30,
      colors: [[157, 185, 138], [127, 160, 108], [150, 170, 118]],
      trace: function (c, L, Wd) {
        c.moveTo(-L / 2, 0);
        c.quadraticCurveTo(0, -Wd * 0.55, L / 2, -L * 0.06);
        c.quadraticCurveTo(0, Wd * 0.55, -L / 2, 0);
      }
    }
  ];

  function drawVeins(c, sp, L, Wd, alpha) {
    c.strokeStyle = 'rgba(250,246,238,' + (alpha * 0.5).toFixed(3) + ')';
    c.lineWidth = 0.8;
    if (sp.name === 'lonn') {
      var cx0 = -L * 0.05;
      c.lineWidth = 0.6;
      [[-72, 0.4], [0, 0.52], [72, 0.4], [-132, 0.32], [132, 0.32]].forEach(function (v) {
        var a = v[0] * Math.PI / 180;
        c.beginPath();
        c.moveTo(-L * 0.42, 0);
        c.lineTo(cx0 + Math.cos(a) * L * v[1], Math.sin(a) * L * v[1]);
        c.stroke();
      });
      return;
    }
    c.beginPath();
    c.moveTo(-L / 2, 0);
    c.quadraticCurveTo(0, sp.name === 'salg' ? -L * 0.03 : 0, L / 2, sp.name === 'salg' ? -L * 0.06 : 0);
    c.stroke();
    c.strokeStyle = 'rgba(250,246,238,' + (alpha * 0.3).toFixed(3) + ')';
    c.lineWidth = 0.55;
    var pairs = sp.name === 'ek' ? 4 : 3;
    for (var v2 = 1; v2 <= pairs; v2++) {
      var vx0 = -L / 2 + (L * v2) / (pairs + 1.4);
      var vlen = Wd * (1 - v2 * 0.16);
      c.beginPath();
      c.moveTo(vx0, 0); c.lineTo(vx0 + L * 0.12, -vlen * 0.85);
      c.moveTo(vx0, 0); c.lineTo(vx0 + L * 0.12, vlen * 0.85);
      c.stroke();
    }
  }

  function drawLeafBody(c, sp, L, Wd, r, g, b, alpha) {
    c.beginPath();
    c.moveTo(-L / 2 - L * 0.14, 0);
    c.lineTo(-L / 2 + L * 0.06, 0);
    c.strokeStyle = 'rgba(' + (r * 0.7 | 0) + ',' + (g * 0.7 | 0) + ',' + (b * 0.7 | 0) + ',' + alpha.toFixed(3) + ')';
    c.lineWidth = 0.9;
    c.stroke();
    c.beginPath();
    sp.trace(c, L, Wd);
    c.closePath();
    c.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
    c.fill();
    c.save();
    c.clip();
    c.fillStyle = 'rgba(40,55,35,' + (alpha * 0.18).toFixed(3) + ')';
    c.fillRect(-L * 0.7, 0, L * 1.4, Wd * 1.5);
    c.restore();
    drawVeins(c, sp, L, Wd, alpha);
  }

  /* ---------- depth planes ---------- */

  var PLANES = {
    far:  { scale: 0.55, alpha: 0.42 },
    mid:  { scale: 0.85, alpha: 0.80 },
    near: { scale: 1.18, alpha: 1.00 }
  };

  /* ---------- wind & reading calm ---------- */

  var gust = 0, gustDir = 1, lastGustAt = 0, nextIdleGust = 5000 + Math.random() * 6000;
  var lastScrollAt = performance.now();
  var energy = 1;
  function triggerGust(strength, dir) {
    gust = Math.max(gust, strength);
    gustDir = dir;
    lastGustAt = performance.now();
    nextIdleGust = 8000 + Math.random() * 9000;
  }
  var lastScrollY = window.scrollY, lastScrollT = performance.now();
  window.addEventListener('scroll', function () {
    var now = performance.now();
    var dy = Math.abs(window.scrollY - lastScrollY);
    var dt = now - lastScrollT;
    lastScrollY = window.scrollY; lastScrollT = now; lastScrollAt = now;
    if (dt > 0) {
      var v = dy / dt;
      if (v > 0.7 && now - lastGustAt > 900) {
        triggerGust(Math.min(2.6, 0.8 + v * 0.9), Math.random() < 0.5 ? -1 : 1);
      }
    }
  }, { passive: true });

  /* ---------- leaves ---------- */

  var COUNT = window.innerWidth < 700 ? 60 : 90;
  var FORM_RATIO = 0.62;

  function pickSize() {
    var r = Math.random();
    if (r < 0.6) return 7 + Math.random() * 4;
    if (r < 0.9) return 11 + Math.random() * 5;
    return 16 + Math.random() * 6;
  }

  /* pre-rendered blurred sprites — cheap depth-of-field per frame */
  function makeSprites(leaf) {
    var S = Math.ceil(leaf.size * 2.8);
    var quality = 2;
    function render(blurPx) {
      var cv = document.createElement('canvas');
      cv.width = cv.height = S * quality;
      var c = cv.getContext('2d');
      c.scale(quality, quality);
      c.translate(S / 2, S / 2);
      if (blurPx && 'filter' in c) c.filter = 'blur(' + blurPx + 'px)';
      drawLeafBody(c, leaf.sp, leaf.size, leaf.size * leaf.sp.wf, leaf.c[0], leaf.c[1], leaf.c[2], 1);
      return cv;
    }
    return { size: S, soft: render(1.2), blurry: render(2.6) };
  }

  function Leaf(i) {
    this.sp = SPECIES[i % SPECIES.length];
    this.size = pickSize() * (this.sp.name === 'salg' ? 1.25 : 1);
    this.c = this.sp.colors[i % this.sp.colors.length];
    /* formation leaves live on the sharp planes; the far plane is pure
       ambient texture. ~62% form (mid/near), ~30% far, ~8% free mid. */
    if (i < COUNT * FORM_RATIO) {
      this.forms = true;
      this.plane = (i % 4 === 3) ? 'near' : 'mid';
    } else {
      this.forms = false;
      this.plane = (i % 5 === 4) ? 'mid' : 'far';
    }
    this.alphaBase = 0.34 + Math.random() * 0.22;
    this.phase = Math.random() * TAU;
    this.pitch = Math.random() * TAU;
    this.roll = Math.random() * TAU;
    this.yaw = Math.random() * TAU;
    this.pitchV = 0.015 + Math.random() * 0.03;
    this.rollV = 0.008 + Math.random() * 0.014;
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = 0; this.vy = 0.2 + Math.random() * 0.4;
    this.target = null;
    this.settle = 0;
    this.dive = 0;
    this.sprites = makeSprites(this);
  }

  Leaf.prototype.step = function (dt, t, windX, en) {
    var jx = Math.sin(t * 0.0011 + this.phase * 3.1) * 0.012 * en;
    var jy = Math.cos(t * 0.0009 + this.phase * 2.3) * 0.010 * en;

    if (this.target) {
      var dx = this.target.x - this.x;
      var dy = this.target.y - this.y;
      var dist = Math.hypot(dx, dy);
      this.settle += ((dist < 46 ? 1 : 0) - this.settle) * 0.02 * dt;
      var k = 0.0016 + 0.0012 * this.settle;
      this.vx += (dx * k - this.vx * 0.045 + windX * 0.012 + jx) * dt;
      this.vy += (dy * k - this.vy * 0.045 + jy) * dt;
      var orb = 0.05 * this.settle * en;
      this.vx += -dy / (dist + 40) * orb * dt;
      this.vy += dx / (dist + 40) * orb * dt;
    } else {
      this.settle += (0 - this.settle) * 0.02 * dt;
      this.vx += (windX * 0.03 + Math.sin(t * 0.0007 + this.phase) * 0.01 * en - this.vx * 0.012) * dt;
      this.vy += ((0.34 + Math.sin(this.phase) * 0.08) * (0.55 + 0.45 * en) - this.vy) * 0.012 * dt;
    }

    this.x += this.vx * dt * 1.9;
    this.y += this.vy * dt * 1.9;

    if (!this.target) {
      if (this.y > H + 40) { this.x = Math.random() * W; this.y = -30 - Math.random() * 40; this.vx = 0; this.vy = 0.2 + Math.random() * 0.4; }
      if (this.x < -40) this.x = W + 30;
      if (this.x > W + 40) this.x = -30;
    }

    /* dive to the far plane while over content */
    var wantDive = 0;
    if (this.plane !== 'far') {
      for (var rI = 0; rI < contentRects.length; rI++) {
        var r = contentRects[rI];
        if (this.x > r.left - 14 && this.x < r.right + 14 && this.y > r.top - 14 && this.y < r.bottom + 14) { wantDive = 1; break; }
      }
    }
    this.dive += (wantDive - this.dive) * 0.045 * dt;

    var speed = Math.hypot(this.vx, this.vy);
    var calm = (1 - this.settle * 0.82) * (0.5 + 0.5 * en);
    this.pitch += (this.pitchV + speed * 0.02 + Math.abs(windX) * 0.02) * calm * dt;
    this.roll += (this.rollV + speed * 0.008) * calm * dt;
    this.yaw += (0.006 + windX * 0.004) * dt + Math.sin(t * 0.0005 + this.phase) * 0.004 * dt;

    /* a leaf coming to rest turns its face up (never freezes edge-on) */
    var rest = Math.max(this.settle, (1 - en) * 0.6);
    if (rest > 0.05) {
      this.pitch += -Math.sin(2 * this.pitch) * 0.05 * rest * dt;
      this.roll += -Math.sin(2 * this.roll) * 0.04 * rest * dt;
    }
  };

  Leaf.prototype.draw = function (c, en) {
    var plane = PLANES[this.plane];
    var flip = Math.cos(this.pitch);
    var squash = Math.max(0.08, Math.abs(flip));
    var d = this.dive;
    var scale = plane.scale * (1 - 0.32 * d);
    /* reading calm dims only free ambient leaves — never a settled formation */
    var alphaEnergy = (this.plane === 'far' || this.target) ? 1 : (0.68 + 0.32 * en);
    var alpha = this.alphaBase * plane.alpha * (0.55 + 0.45 * squash) * (1 - 0.55 * d) * alphaEnergy;
    if (alpha < 0.01) return;

    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.yaw + this.vx * 0.25);
    c.scale(scale, scale * squash);

    var useSprite = this.plane === 'far' || d > 0.08;
    if (useSprite) {
      var img = (this.plane === 'far' || d > 0.55) ? this.sprites.blurry : this.sprites.soft;
      c.globalAlpha = alpha;
      var S = this.sprites.size;
      c.drawImage(img, -S / 2, -S / 2, S, S);
      c.globalAlpha = 1;
    } else {
      var shade = flip >= 0 ? 0.82 + 0.28 * flip : 0.62 + 0.2 * (-flip);
      var r = Math.min(255, this.c[0] * shade) | 0;
      var g = Math.min(255, this.c[1] * shade) | 0;
      var b = Math.min(255, this.c[2] * shade) | 0;
      drawLeafBody(c, this.sp, this.size, this.size * this.sp.wf * (0.55 + 0.45 * Math.abs(Math.cos(this.roll))), r, g, b, alpha);
    }
    c.restore();
  };

  var leaves = [];
  for (var i = 0; i < COUNT; i++) leaves.push(new Leaf(i));

  /* ---------- content rects (leaves dive under these) ---------- */

  var CONTENT_SELECTOR = '.ts-header__inner, .ts-chapter__text, .ts-card, .ts-bbic, .ts-kbt, .ts-strip, .ts-actions, .ts-statline, .ts-contact-details, .ts-more, .ts-post, .ts-hero .reveal';
  var contentEls = Array.prototype.slice.call(document.querySelectorAll(CONTENT_SELECTOR));
  var contentRects = [];
  function updateRects() {
    contentRects = [];
    for (var e = 0; e < contentEls.length; e++) {
      var r = contentEls[e].getBoundingClientRect();
      if (r.bottom > -30 && r.top < H + 30 && r.width > 0) contentRects.push(r);
    }
  }

  /* ---------- formations ---------- */

  function anchor(scene) {
    var wide = W > 900;
    return {
      cx: wide ? W * 0.72 : W * 0.5,
      cy: wide ? (scene === 'clusters' ? H * 0.38 : H * 0.48) : H * 0.52,
      s: Math.min(W * (wide ? 0.22 : 0.34), H * 0.28)
    };
  }

  function shapePoints(scene, n) {
    var a = anchor(scene);
    var cx = a.cx, cy = a.cy, s = a.s;
    var pts = [], i, t;
    if (scene === 'triangle') {
      var nCircle = Math.floor(n * 0.3);
      var nEdge = n - nCircle;
      var A = [0, -1.02], B = [-0.98, 0.78], C = [0.98, 0.78];
      var edges = [[A, B], [B, C], [C, A]];
      for (i = 0; i < nEdge; i++) {
        var e = edges[i % 3];
        var f = (Math.floor(i / 3) + 0.5) / Math.ceil(nEdge / 3);
        pts.push({
          x: cx + (e[0][0] + (e[1][0] - e[0][0]) * f) * s,
          y: cy + (e[0][1] + (e[1][1] - e[0][1]) * f) * s
        });
      }
      for (i = 0; i < nCircle; i++) {
        t = (i / nCircle) * TAU;
        pts.push({ x: cx + Math.cos(t) * s * 0.34, y: cy + 0.08 * s + Math.sin(t) * s * 0.34 });
      }
    } else if (scene === 'heart') {
      for (i = 0; i < n; i++) {
        t = (i / n) * TAU;
        var hx = 16 * Math.pow(Math.sin(t), 3);
        var hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        pts.push({ x: cx + (hx / 16) * s * 1.05, y: cy + (hy / 16) * s * 1.05 });
      }
    } else if (scene === 'clusters') {
      var centers = [[0, -0.75], [-0.55, 0.55], [0.55, 0.55]];
      for (i = 0; i < n; i++) {
        var cc = centers[i % 3];
        var aa = Math.random() * TAU, rr = Math.sqrt(Math.random()) * 0.26;
        pts.push({
          x: cx + (cc[0] + Math.cos(aa) * rr) * s,
          y: cy + (cc[1] + Math.sin(aa) * rr) * s
        });
      }
    }
    return pts;
  }

  var currentScene = 'ambient';
  function assignTargets(scene) {
    currentScene = scene;
    var formers = leaves.filter(function (l) { return l.forms; });
    if (scene === 'ambient' || !scene) {
      leaves.forEach(function (l) { l.target = null; });
      return;
    }
    var pts = shapePoints(scene, formers.length);
    formers.forEach(function (l, idx) { l.target = pts[idx % pts.length]; l.settle = 0; });
    leaves.forEach(function (l) { if (!l.forms) l.target = null; });
  }

  /* Wide screens: chapters carry scenes (leaf corridor on the right).
     Narrow screens: breathing interludes (data-scene-mobile) carry the
     formations; chapters marked ambient still release the leaves. */
  var io = null;
  function setupObserver() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var wide = W > 900;
    var els = wide
      ? document.querySelectorAll('[data-scene]')
      : document.querySelectorAll('[data-scene-mobile], [data-scene="ambient"]');
    if (!els.length) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          assignTargets(e.target.getAttribute(wide ? 'data-scene' : 'data-scene-mobile') || e.target.getAttribute('data-scene'));
        }
      });
    }, { threshold: wide ? 0.5 : 0.45 });
    els.forEach(function (el) { io.observe(el); });
  }
  setupObserver();
  window.addEventListener('resize', function () { resize(); setupObserver(); assignTargets(currentScene); });

  /* ---------- tinted bands ---------- */

  var tinted = Array.prototype.slice.call(document.querySelectorAll('.ts-chapter--tinted'));
  var bandColor = getComputedStyle(document.documentElement).getPropertyValue('--paper-warm').trim() || '#f3ecdd';

  /* ---------- loop ---------- */

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var last = performance.now();

  function drawFrame(now, dt, windX) {
    updateRects();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bandColor;
    for (var b = 0; b < tinted.length; b++) {
      var rect = tinted[b].getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < H) ctx.fillRect(0, rect.top, W, rect.height);
    }
    var order = ['far', 'mid', 'near'];
    for (var o = 0; o < 3; o++) {
      for (var j = 0; j < leaves.length; j++) {
        var l = leaves[j];
        if (l.plane !== order[o]) continue;
        if (dt > 0) l.step(dt, now, windX, energy);
        l.draw(ctx, energy);
      }
    }
  }

  function tick(now) {
    var dt = Math.min(3, (now - last) / 16.7);
    last = now;
    gust *= Math.pow(0.985, dt);
    if (now - lastGustAt > nextIdleGust) triggerGust(0.5 + Math.random() * 0.7, Math.random() < 0.5 ? -1 : 1);
    var windX = gustDir * gust + Math.sin(now * 0.00035) * 0.14;
    var energyTarget = (now - lastScrollAt < 1600) ? 1 : 0.45;
    energy += (energyTarget - energy) * 0.015 * dt;
    drawFrame(now, dt, windX);
    requestAnimationFrame(tick);
  }

  if (reduced) {
    drawFrame(performance.now(), 0, 0);
    window.addEventListener('scroll', function () { drawFrame(performance.now(), 0, 0); }, { passive: true });
  } else {
    requestAnimationFrame(tick);
  }
})();
