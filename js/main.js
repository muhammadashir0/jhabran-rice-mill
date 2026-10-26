(() => {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const pre = document.querySelector(".preloader");

  if (document.querySelector(".pdp") && header) header.classList.add("solid");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setNav = (open) => {
    nav?.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    menuBtn?.setAttribute("aria-expanded", open ? "true" : "false");
  };
  menuBtn?.addEventListener("click", () => {
    setNav(!nav?.classList.contains("open"));
  });
  document.querySelectorAll(".nav a").forEach((a) => {
    a.addEventListener("click", () => setNav(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });

  const videos = () => Array.from(document.querySelectorAll("video"));
  const armVideo = (v) => {
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.controls = false;
    v.setAttribute("muted", "");
    v.setAttribute("loop", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");
    v.removeAttribute("controls");
    v.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    if (!v.closest(".slide.is-on") && !v.hasAttribute("autoplay")) {
      v.preload = "none";
    }
    try { v.disablePictureInPicture = true; } catch (_) {}
  };
  const tryPlay = (v) => {
    if (v.dataset.off === "1") return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  const playVisible = () => {
    videos().forEach((v) => {
      const slide = v.closest(".slide");
      if (slide && !slide.classList.contains("is-on")) return;
      tryPlay(v);
    });
  };
  videos().forEach(armVideo);

  window.addEventListener("load", () => {
    pre?.classList.add("hide");
    playVisible();
  });
  pre?.classList.add("hide");

  ["touchstart", "pointerdown", "click", "scroll"].forEach((ev) => {
    window.addEventListener(ev, playVisible, { once: true, passive: true });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") playVisible();
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          v.dataset.off = "0";
          tryPlay(v);
        } else {
          v.dataset.off = "1";
          v.pause();
        }
      });
    }, { threshold: 0.2 });
    videos().forEach((v) => io.observe(v));
  }

  const form = document.querySelector("#enquire-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const lines = [
      `Assalam o Alaikum, I would like to enquire with Saith Hanif Rice Mills.`,
      ``,
      `Name: ${data.name || ""}`,
      `Company: ${data.company || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Country / destination: ${data.country || ""}`,
      `Product: ${data.product || ""}`,
      `Quantity: ${data.quantity || ""}`,
      `Message: ${data.message || ""}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/923133332101?text=${text}`, "_blank");
    const note = form.querySelector(".form-note");
    if (note) note.textContent = "Opening WhatsApp to +92 313 3332101. You may also email saithhanifsailaricemills@gmail.com.";
  });

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-filter]");
  const applyFilter = (key) => {
    filters.forEach((b) => b.classList.toggle("is-on", b.dataset.key === key));
    cards.forEach((card) => {
      const hay = (card.dataset.filter || "").toLowerCase();
      card.hidden = !(key === "all" || hay.includes(key));
    });
  };
  filters.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.key));
  });
  document.querySelectorAll("[data-filter-jump]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const key = el.getAttribute("data-filter-jump");
      if (!key) return;
      e.preventDefault();
      applyFilter(key);
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">×</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  const closeLb = () => {
    lb.classList.remove("is-on");
    document.body.style.overflow = "";
  };
  const openLb = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("is-on");
    document.body.style.overflow = "hidden";
  };
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });

  document.querySelectorAll("[data-gallery]").forEach((gal) => {
    const main = gal.querySelector(".bag-stage img");
    if (!main) return;
    gal.querySelectorAll("[data-full]").forEach((btn) => {
      btn.addEventListener("click", () => {
        main.src = btn.dataset.full;
        if (btn.dataset.alt) main.alt = btn.dataset.alt;
        gal.querySelectorAll("[data-full]").forEach((b) => b.classList.remove("is-on"));
        btn.classList.add("is-on");
      });
    });
  });

  const slidesRoot = document.querySelector("[data-slides]");
  if (slidesRoot) {
    const slides = Array.from(slidesRoot.querySelectorAll(".slide"));
    const dotsWrap = document.querySelector("[data-dots]");
    let i = 0;
    let timer;
    const dots = slides.map((_, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (idx + 1));
      b.addEventListener("click", () => { i = idx; show(i); arm(); });
      dotsWrap?.appendChild(b);
      return b;
    });
    const show = (n) => {
      dots.forEach((d) => d.classList.remove("is-on"));
      slides.forEach((s, idx) => {
        const on = idx === n;
        s.classList.toggle("is-on", on);
        const v = s.querySelector("video");
        if (!v) return;
        if (on) {
          v.muted = true;
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          v.pause();
        }
      });
      const dot = dots[n];
      if (dot) {
        void dot.offsetWidth;
        dot.classList.add("is-on");
      }
    };
    const arm = () => {
      clearInterval(timer);
      const delay = document.body.classList.contains("home") ? 4000 : 4500;
      timer = setInterval(() => {
        i = (i + 1) % slides.length;
        show(i);
      }, delay);
    };
    show(0);
    arm();
    document.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
      i = (i - 1 + slides.length) % slides.length;
      show(i);
      arm();
    });
    document.querySelector("[data-hero-next]")?.addEventListener("click", () => {
      i = (i + 1) % slides.length;
      show(i);
      arm();
    });
  }

  document.querySelectorAll(".pack-stage, .bag-stage, a.shot").forEach((stage) => {
    if (stage.hasAttribute("data-pack3d") || stage.classList.contains("pack3d-stage") || stage.closest(".pack3d-stage")) return;
    const img = stage.querySelector("img");
    if (!img) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "expand-pack";
    btn.setAttribute("aria-label", "Expand 3D pack");
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>';
    stage.appendChild(btn);
    const expand = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLb(img.currentSrc || img.src, img.alt);
    };
    btn.addEventListener("click", expand);
    img.addEventListener("click", expand);
  });

  const faqRoot = document.querySelector("[data-faq]");
  if (faqRoot) {
    faqRoot.querySelectorAll("details").forEach((d) => {
      d.addEventListener("toggle", () => {
        if (!d.open) return;
        faqRoot.querySelectorAll("details").forEach((other) => {
          if (other !== d) other.open = false;
        });
      });
    });
  }

  const picks = {
    steam: {
      html: "<p>For a home pot and pulao — <strong>Ziyarat Kainat Steam 1121</strong>, 25 kg.</p><p><a href=\"product-steam.html\">View Steam 1121</a><a href=\"product-classic-steam.html\">Classic Steam</a></p>",
    },
    sella: {
      html: "<p>For a degh — <strong>Ziyarat Kainat Sella 1121</strong> or Classic Sella. Sultan Kainat Basmati Sella if you want that mark.</p><p><a href=\"product-sella.html\">View Sella 1121</a><a href=\"product-classic.html\">Classic Sella</a><a href=\"product-sultan-sella.html\">Sultan Sella</a></p>",
    },
    other: {
      html: "<p>Short grain or catering broken — <strong>Ziyarat Short Grain</strong> or <strong>B-1</strong>. Sultan also packs short grain.</p><p><a href=\"product-short-grain.html\">Ziyarat Short Grain</a><a href=\"product-b1.html\">B-1 Broken</a><a href=\"product-sultan-short.html\">Sultan Short Grain</a></p>",
    },
  };
  const chooser = document.querySelector("[data-chooser]");
  const chooserOut = document.querySelector("[data-chooser-out]");
  chooser?.querySelectorAll("[data-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      chooser.querySelectorAll("[data-pick]").forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      const pick = picks[btn.dataset.pick];
      if (!pick || !chooserOut) return;
      chooserOut.hidden = false;
      chooserOut.innerHTML = pick.html;
    });
  });

  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        reveal.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".note-card, .step, .figure, .range-tile, .line, .product-card, .stat-card, .lead-card, .hist-panel, .field-box").forEach((el, idx) => {
      if (el.closest(".hero")) return;
      el.classList.add("inview");
      el.style.transitionDelay = `${Math.min(idx % 6, 5) * 70}ms`;
      reveal.observe(el);
    });
    document.querySelectorAll("[data-aos]").forEach((el, idx) => {
      if (el.closest(".hero")) {
        el.classList.add("is-in");
        return;
      }
      el.style.transitionDelay = `${Math.min(idx % 4, 3) * 120}ms`;
      reveal.observe(el);
    });
    setTimeout(() => {
      document.querySelectorAll("[data-aos], .inview").forEach((el) => el.classList.add("is-in"));
    }, 1200);

    const hist = document.querySelector("[data-hist]");
    if (hist) {
      const years = hist.querySelectorAll("[data-year]");
      const showY = (y) => {
        years.forEach((el) => el.classList.toggle("is-on", el.getAttribute("data-year") === y));
      };
      hist.querySelectorAll(".hist-years [data-year]").forEach((btn) => {
        btn.addEventListener("click", () => showY(btn.getAttribute("data-year")));
      });
    }

    const tl = document.querySelector("[data-timeline]");
    if (tl) {
      const track = tl.querySelector("[data-tl-track]");
      const jump = (dir) => {
        const w = Math.min(track.clientWidth * 0.45, 260);
        track.scrollBy({ left: dir * w, behavior: "smooth" });
      };
      tl.querySelector("[data-tl-prev]")?.addEventListener("click", () => jump(-1));
      tl.querySelector("[data-tl-next]")?.addEventListener("click", () => jump(1));
    }

    const countIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const b = e.target;
        const end = parseInt(b.getAttribute("data-count"), 10);
        if (!Number.isFinite(end)) return;
        const start = performance.now();
        const dur = 900;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          b.textContent = String(Math.round(end * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIo.unobserve(b);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach((b) => countIo.observe(b));
  } else {
    document.querySelectorAll(".inview").forEach((el) => el.classList.add("is-in"));
  }

  const tabBtns = document.querySelectorAll("[data-tab]");
  if (tabBtns.length) {
    const mill = document.querySelector(".mill-pane");
    const form = document.querySelector("#enquire-form");
    const show = (key) => {
      tabBtns.forEach((b) => b.classList.toggle("is-on", b.dataset.tab === key));
      if (mill) mill.hidden = key === "form";
      if (form) form.hidden = key === "talk";
      if (key === "mill" && mill) mill.hidden = false;
      if (key === "form" && form) form.hidden = false;
      if (key === "talk") {
        if (mill) mill.hidden = false;
        if (form) form.hidden = true;
      }
    };
    tabBtns.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
  }

  const world = document.querySelector("[data-world]");
  if (world) {
    const copy = {
      asia: "<p>Asian ports — South, East and South-East. Same mill, same sack. Write the destination with the pack.</p>",
      me: "<p>Gulf and the wider Middle East. Bags leave Jhabran for the port you name.</p>",
      eu: "<p>European ports. You appoint inspection at load. Cook the sample before you argue the price.</p>",
      all: "<p>From Jandiala Road, Jhabran the bags go to <strong>Asia</strong>, the <strong>Middle East</strong>, and <strong>Europe</strong>. Same mill, same sack. Write the destination port with the pack.</p>",
    };
    const panel = world.querySelector("[data-world-panel]");
    const setRegion = (key) => {
      const on = Boolean(key);
      world.classList.toggle("is-focus", on);
      world.querySelectorAll("[data-region]").forEach((el) => {
        const match = on && el.getAttribute("data-region") === key;
        el.classList.toggle("is-on", match);
        if (el.matches("button")) el.setAttribute("aria-selected", match ? "true" : "false");
      });
      if (panel) panel.innerHTML = copy[key] || copy.all;
    };
    world.querySelectorAll(".world-tabs [data-region], .dest[data-region], .sg-label[data-region], .land-route, .map-label").forEach((el) => {
      const go = () => setRegion(el.getAttribute("data-region"));
      el.addEventListener("click", go);
      el.addEventListener("mouseenter", go);
    });
    world.addEventListener("mouseleave", () => {
      if (window.matchMedia("(hover: hover)").matches) setRegion(null);
    });
  }
})();
