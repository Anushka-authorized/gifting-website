/* ============================================================
   for you, always ♡  ·  script.js
   Interactions for the pink scrapbook love website
============================================================ */

// ============================================================
// BACKGROUND FLOATING DECO
// ============================================================
function initBgDeco() {
  const container = document.getElementById('bg-deco');
  if (!container) return;
  const items = ['♡', '✦', '✧', '♡', '˚', '·', '♡'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'bg-deco-el';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -20px;
      font-size: ${Math.random() * 14 + 10}px;
      animation-duration: ${Math.random() * 14 + 10}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(el);
  }
}
initBgDeco();


// ============================================================
// TOAST
// ============================================================
let toastTimer = null;
function showToast(msg, duration = 2400) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}


// ============================================================
// TOUCH / CLICK — heart sparkle on tap
// ============================================================
function spawnTapHeart(x, y) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    pointer-events:none; z-index:9999;
    font-size:${Math.random()*10+14}px;
    color:${Math.random()>0.5?'#e8728f':'#f2b5c0'};
    animation: tapHeartRise 1s ease forwards;
    transform:translate(-50%,-50%);
  `;
  el.textContent = Math.random() > 0.5 ? '♡' : '✦';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// Inject tap heart animation
const tapCSS = document.createElement('style');
tapCSS.textContent = `
@keyframes tapHeartRise {
  0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
  100% { opacity:0; transform:translate(-50%,-130px) scale(1.4); }
}`;
document.head.appendChild(tapCSS);

document.addEventListener('click', e => {
  spawnTapHeart(e.clientX, e.clientY);
});
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  spawnTapHeart(t.clientX, t.clientY);
}, { passive: true });


// ============================================================
// NAVBAR — hamburger + drawer
// ============================================================
const hamburger  = document.getElementById('nav-hamburger');
const navDrawer  = document.getElementById('nav-drawer');
const drawerClose = document.getElementById('drawer-close');

hamburger.addEventListener('click', () => navDrawer.classList.remove('hidden'));
drawerClose.addEventListener('click', closeDrawer);

function closeDrawer() {
  navDrawer.classList.add('hidden');
}

// Nav scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 18px rgba(200,100,130,0.12)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });


// ============================================================
// SPECIAL THING POPUP
// ============================================================
const navSpecialBtn = document.getElementById('nav-special-btn');
const specialPopup  = document.getElementById('special-popup');
const specialClose  = document.getElementById('special-close');
const specialEnter  = document.getElementById('special-enter');

if (navSpecialBtn) {
  navSpecialBtn.addEventListener('click', () => {
    specialPopup.classList.remove('hidden');
  });
}
if (specialClose) {
  specialClose.addEventListener('click', () => specialPopup.classList.add('hidden'));
}
if (specialEnter) {
  specialEnter.addEventListener('click', () => {
    specialPopup.classList.add('hidden');
    document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
  });
}
// Click outside to close
if (specialPopup) {
  specialPopup.addEventListener('click', e => {
    if (e.target === specialPopup) specialPopup.classList.add('hidden');
  });
}


// ============================================================
// HERO — enter button
// ============================================================
const heroEnterBtn = document.getElementById('hero-enter-btn');
if (heroEnterBtn) {
  heroEnterBtn.addEventListener('click', () => {
    document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    showToast("entering the love story ♡");
  });
}


// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.12 });

// Add reveal class to major sections on load
window.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.card-soft, .story-note, .story-img-wrap, .dream-item, .mem-col, .forever-col, footer'
  );
  targets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});


// ============================================================
// REASONS POPUP
// ============================================================
const moreReasonsBtn   = document.getElementById('more-reasons-btn');
const reasonsPopup     = document.getElementById('reasons-popup');
const reasonsPopupClose = document.getElementById('reasons-popup-close');
const reasonsList      = document.getElementById('reasons-expanded-list');

const allReasons = [
  "the way you text first",
  "the way you remember tiny things i say",
  "your laugh — it's the best sound honestly",
  "the way you make silence feel comfortable",
  "how you care about everyone around you",
  "the way you overthink and still stay strong",
  "you make distance feel smaller just by existing",
  "the way you say my name differently",
  "how you stay up just to talk to me",
  "you feel like home somehow",
  "the way you laugh at your own jokes",
  "how you make everything feel okay",
  "you're the softest person i've ever known",
  "the way you check in without being asked",
  "you turned out to be my favorite surprise",
];

if (moreReasonsBtn && reasonsList) {
  moreReasonsBtn.addEventListener('click', () => {
    // Build list
    reasonsList.innerHTML = '';
    allReasons.forEach(r => {
      const div = document.createElement('div');
      div.className = 're-item';
      div.innerHTML = `<span class="li-heart">♥</span><span>${r}</span>`;
      reasonsList.appendChild(div);
    });
    reasonsPopup.classList.remove('hidden');
  });
}

if (reasonsPopupClose) {
  reasonsPopupClose.addEventListener('click', () => reasonsPopup.classList.add('hidden'));
}
if (reasonsPopup) {
  reasonsPopup.addEventListener('click', e => {
    if (e.target === reasonsPopup) reasonsPopup.classList.add('hidden');
  });
}

// Reason icon cells — click sparkle
document.querySelectorAll('.ri-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    showToast("♡ " + cell.querySelector('span:last-child').textContent);
  });
});


// ============================================================
// DREAM DATE — click feedback
// ============================================================
const dreamMessages = {
  '🌊': "marine drive at golden hour. us and the sea breeze 🌊",
  '☕': "coffee & talking for hours. the best kind of date ☕",
  '🎬': "movie night in our own world. cozy and us 🎬",
  '🌸': "cute little picnic with flowers and you 🌸",
  '🌃': "late night drive, windows down, our playlist 🌃",
};

document.querySelectorAll('.dream-item').forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.querySelector('.dream-ph span')?.textContent || '♡';
    const msg = dreamMessages[emoji] || "manifesting this with you ♡";
    showToast(msg, 2800);
  });
});


// ============================================================
// YES / NO BUTTONS (forever section)
// ============================================================
const yesAlwaysBtn = document.getElementById('yes-always-btn');
const noBtn        = document.getElementById('only-you-btn');
const noTooltip    = document.getElementById('no-tooltip');
const yesOverlay   = document.getElementById('yes-overlay');
const funnyOverlay = document.getElementById('funny-overlay');

function showNoTooltip(msg) {
  noTooltip.textContent = msg;
  noTooltip.classList.remove('hidden');
  noTooltip.style.animation = 'none';
  requestAnimationFrame(() => {
    noTooltip.style.animation = 'tooltipPop 0.35s cubic-bezier(.34,1.56,.64,1)';
  });
}

function openYesOverlay() {
  // Reset animations by forcing reflow
  yesOverlay.classList.remove('hidden');
  const frame = yesOverlay.querySelector('.reveal-image-frame');
  const burst = yesOverlay.querySelector('.reveal-sparkle-burst');
  const l1 = yesOverlay.querySelector('.reveal-line1');
  const l2 = yesOverlay.querySelector('.reveal-line2');
  const btn = yesOverlay.querySelector('.reveal-final-btn');
  [frame, burst, l1, l2, btn].forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
  burst.querySelectorAll('span').forEach(s => {
    s.style.animation = 'none';
    void s.offsetWidth;
    s.style.animation = '';
  });
}

function closeOverlay(overlay) {
  overlay.classList.add('hidden');
}

if (yesAlwaysBtn) {
  yesAlwaysBtn.addEventListener('click', () => {
    showToast("yes, always ♡ forever and then some", 3000);
    openYesOverlay();
  });
}

const noPhrasesSequence = [
  "wrong answer detected 😌",
  "still wrong",
  "🏃 nope nope nope"
];
let noClickCount = 0;

if (noBtn) {
  noBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    noClickCount++;

    if (noClickCount <= 3) {
      // Jump within viewport bounds
      const container = noBtn.parentElement.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      const maxX = Math.max(0, window.innerWidth - btnRect.width - 24);
      const maxY = Math.max(0, window.innerHeight - btnRect.height - 24);

      const targetX = Math.random() * maxX;
      const targetY = Math.random() * maxY;

      const offsetX = targetX - (btnRect.left);
      const offsetY = targetY - (btnRect.top);

      noBtn.style.position = 'fixed';
      noBtn.style.left = btnRect.left + 'px';
      noBtn.style.top = btnRect.top + 'px';
      noBtn.style.zIndex = '999';
      noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      if (noClickCount <= 3) {
        showNoTooltip(noPhrasesSequence[noClickCount - 1]);
      }

      if (navigator.vibrate) navigator.vibrate(30);

      if (noClickCount === 3) {
        setTimeout(() => showNoTooltip("fine 😔"), 500);
      }
    } else {
      // 4th click — funny reveal
      openFunnyOverlay();
    }
  });
}

function openFunnyOverlay() {
  funnyOverlay.classList.remove('hidden');
  const frame = funnyOverlay.querySelector('.reveal-image-frame');
  const burst = funnyOverlay.querySelector('.reveal-sparkle-burst');
  const l1 = funnyOverlay.querySelector('.reveal-line1');
  const l2 = funnyOverlay.querySelector('.funny-reveal-line2');
  const btn = funnyOverlay.querySelector('.reveal-final-btn');

  [frame, burst, l1].forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
  burst.querySelectorAll('span').forEach(s => {
    s.style.animation = 'none';
    void s.offsetWidth;
    s.style.animation = '';
  });
  l2.classList.remove('show');
  btn.classList.remove('show');

  // Pause, then reveal "there was never a no option" + button
  setTimeout(() => {
    l2.classList.add('show');
    setTimeout(() => btn.classList.add('show'), 500);
  }, 1800);
}

// Close buttons on overlays
document.querySelectorAll('.reveal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeOverlay(document.getElementById(btn.dataset.close));
  });
});

// Click outside reveal card to close
[yesOverlay, funnyOverlay].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay(overlay);
  });
});

// Funny overlay -> YES flow
const funnyToYesBtn = document.getElementById('funny-to-yes-btn');
if (funnyToYesBtn) {
  funnyToYesBtn.addEventListener('click', () => {
    closeOverlay(funnyOverlay);
    openYesOverlay();
  });
}

// Song "Play Our Song" button — placeholder, no functionality
const songPlayBtn = document.getElementById('song-play-btn');
if (songPlayBtn) {
  songPlayBtn.addEventListener('click', () => {
    showToast("♫ our song, playing in my heart");
  });
}


// ============================================================
// CINEMATIC OVERLAY
// ============================================================
function startCinematic() {
  const overlay = document.getElementById('cin-overlay');
  overlay.classList.remove('hidden');
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 1.2s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = '1'; }));

  initCinStars();
  setTimeout(() => {
    typeCinQuestion("are you ready to look at our meeting glimpses?", () => {
      const btns = document.getElementById('cin-btns');
      btns.style.display = 'flex';
      btns.style.opacity = '0';
      btns.style.transition = 'opacity 0.8s';
      requestAnimationFrame(() => requestAnimationFrame(() => { btns.style.opacity = '1'; }));
    });
  }, 900);
}

function initCinStars() {
  const canvas = document.getElementById('cin-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const stars = Array.from({length:110}, () => ({
    x:Math.random(), y:Math.random(),
    r:Math.random()*1.2+0.3,
    phase:Math.random()*Math.PI*2,
    spd:Math.random()*0.006+0.002
  }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const t = Date.now()/1000;
    stars.forEach(s => {
      const a = 0.2 + 0.65*(0.5+0.5*Math.sin(t*s.spd*10+s.phase));
      ctx.beginPath();
      ctx.arc(s.x*canvas.width, s.y*canvas.height, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,220,230,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function typeCinQuestion(text, onDone) {
  const el = document.getElementById('cin-q');
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) { el.textContent += text[i++]; }
    else { clearInterval(iv); if (onDone) onDone(); }
  }, 50);
}

// YES
document.getElementById('cin-yes').addEventListener('click', () => {
  document.getElementById('cin-step1').classList.add('hidden');
  document.getElementById('cin-step2').classList.remove('hidden');
  if (navigator.vibrate) navigator.vibrate([30,50,30]);
  setTimeout(() => {
    document.getElementById('cin-step2').classList.add('hidden');
    document.getElementById('cin-step3').classList.remove('hidden');
  }, 2800);
});

// NO — runs away
const cinNoBtn = document.getElementById('cin-no');
const noPhrases = [
  "wrong answer.",
  "be serious rn.",
  "chup chap yes click karo.",
  "this was not optional btw.",
  "okay be like that 🙄",
  "i'm waiting 👀",
  "bro just say yes omg",
];
let noCount = 0;

cinNoBtn.addEventListener('click', e => {
  e.stopPropagation();
  noCount++;
  showToast(noPhrases[Math.min(noCount-1, noPhrases.length-1)], 2000);
  const maxX = (window.innerWidth - 120) * 0.5;
  const maxY = (window.innerHeight - 60) * 0.3;
  const nx = (Math.random()-0.5)*maxX*2;
  const ny = (Math.random()-0.5)*maxY*2;
  cinNoBtn.style.transition = 'all 0.4s cubic-bezier(.34,1.56,.64,1)';
  cinNoBtn.style.transform = `translate(${nx}px,${ny}px) scale(${Math.max(0.4,1-noCount*0.12)})`;
  cinNoBtn.style.opacity = String(Math.max(0.12, 1-noCount*0.15));
  if (navigator.vibrate) navigator.vibrate(40);
});

// Video upload
document.getElementById('vid-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const player = document.getElementById('vid-player');
  player.src = url;
  player.classList.remove('hidden');
  document.getElementById('reel-inner').style.display = 'none';
});

// Final forever button in cin overlay
document.getElementById('cin-final-btn').addEventListener('click', () => {
  const overlay = document.getElementById('cin-overlay');
  overlay.style.transition = 'opacity 2s ease';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.style.opacity = '1';
    noCount = 0;
    cinNoBtn.style.transform = '';
    cinNoBtn.style.opacity = '1';
  }, 2000);
});


// ============================================================
// POLAROIDS — tap interaction
// ============================================================
document.querySelectorAll('.polaroid').forEach(p => {
  p.addEventListener('click', () => {
    showToast("♡ core memory saved");
  });
});


// ============================================================
// LITTLE THINGS LIST — hover glow
// ============================================================
document.querySelectorAll('.little-list li').forEach(li => {
  li.addEventListener('click', () => {
    const text = li.querySelector('span:nth-child(2)')?.textContent;
    if (text) showToast("♡ " + text);
  });
});

console.log("♡ for you, always · loaded with love");
