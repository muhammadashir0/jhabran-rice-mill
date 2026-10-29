(() => {
  document.documentElement.classList.add("js");
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

  const setSub = (item, open) => {
    item.classList.toggle("open", open);
    item.querySelector(".nav-toggle")?.setAttribute("aria-expanded", open ? "true" : "false");
  };
  document.querySelectorAll(".nav-item.has-sub").forEach((item) => {
    const btn = item.querySelector(".nav-toggle");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !item.classList.contains("open");
      document.querySelectorAll(".nav-item.has-sub").forEach((other) => {
        if (other !== item) setSub(other, false);
      });
      setSub(item, open);
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.has-sub")) {
      document.querySelectorAll(".nav-item.has-sub").forEach((item) => setSub(item, false));
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setNav(false);
      document.querySelectorAll(".nav-item.has-sub").forEach((item) => setSub(item, false));
    }
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
    if (!v.closest("[data-slides]") && !v.closest(".slide.is-on") && !v.hasAttribute("autoplay")) {
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
    videos().forEach((v) => {
      if (v.closest("[data-slides]")) return;
      io.observe(v);
    });
  }

  const form = document.querySelector("#enquire-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const lines = [
      `Assalam o Alaikum, I would like to enquire with Saith Hanif Rice Mills.`,
      ``,
      `Name: ${data.name || ""}`,
      `Company: ${data.company || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Country / destination: ${data.country || ""}`,
      `Product: ${data.product || data.variety || ""}`,
      `Packaging: ${data.packaging || ""}`,
      `Quantity: ${data.quantity || ""}`,
      `Destination port: ${data.port || ""}`,
      `Message: ${data.message || ""}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/923133332101?text=${text}`, "_blank");
    const note = form.querySelector(".form-note");
    if (note) {
      note.setAttribute("aria-live", "polite");
      note.textContent = "Opening WhatsApp to +92 313 3332101. You may also email saithhanifsailaricemills@gmail.com.";
    }
  });

  document.querySelectorAll("[data-size]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-size");
      document.querySelectorAll("[data-size]").forEach((b) => b.classList.toggle("is-on", b === btn));
      const sel = document.querySelector("[data-pack-weight]");
      if (sel) {
        [...sel.options].forEach((o) => {
          if (o.textContent.trim() === v) o.selected = true;
        });
        sel.dispatchEvent(new Event("change"));
      }
    });
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
    const hero = slidesRoot.closest(".hero") || slidesRoot;
    const slides = Array.from(slidesRoot.querySelectorAll(".slide"));
    const dotsWrap = document.querySelector("[data-dots]");
    const countEl = document.querySelector("[data-hero-count]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 9000 : (document.body.classList.contains("home") ? 7000 : 4500);
    hero.style.setProperty("--hero-ms", delay + "ms");
    let i = 0;
    let timer = 0;
    let hovering = false;
    const pad = (n) => String(n).padStart(2, "0");

    const runVideo = (v, on) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.controls = false;
      if (on) {
        v.preload = "auto";
        const kick = () => {
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        };
        if (v.readyState >= 2) kick();
        else {
          v.addEventListener("canplay", kick, { once: true });
          try { v.load(); } catch (_) {}
        }
      } else {
        v.pause();
      }
    };

    const preloadSlide = (idx) => {
      const s = slides[idx];
      if (!s) return;
      const v = s.querySelector("video");
      if (v) {
        v.preload = "auto";
        if (v.readyState < 1) {
          try { v.load(); } catch (_) {}
        }
      }
      const img = s.querySelector("img");
      if (img && !img.complete) {
        const warm = new Image();
        warm.src = img.currentSrc || img.src;
      }
    };

    const dots = slides.map((_, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (idx + 1));
      b.addEventListener("click", () => go(idx));
      dotsWrap?.appendChild(b);
      return b;
    });

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        const on = idx === i;
        s.classList.toggle("is-on", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
        runVideo(s.querySelector("video"), on);
      });
      dots.forEach((d) => d.classList.remove("is-on"));
      const dot = dots[i];
      if (dot) {
        void dot.offsetWidth;
        dot.classList.add("is-on");
      }
      if (countEl) countEl.textContent = pad(i + 1) + " / " + pad(slides.length);
      hero.classList.toggle("is-campaign", slides[i].classList.contains("slide-campaign"));
      preloadSlide((i + 1) % slides.length);
    };

    const arm = () => {
      clearInterval(timer);
      if (reduce) return;
      timer = setInterval(() => {
        if (hovering) return;
        show(i + 1);
      }, delay);
    };

    const go = (n) => {
      show(n);
      arm();
    };

    show(0);
    arm();

    document.querySelector("[data-hero-prev]")?.addEventListener("click", () => go(i - 1));
    document.querySelector("[data-hero-next]")?.addEventListener("click", () => go(i + 1));
    hero.querySelectorAll(".hero-arrow, .hero-pager, .hero-content").forEach((el) => {
      el.addEventListener("mouseenter", () => { hovering = true; });
      el.addEventListener("mouseleave", () => { hovering = false; });
    });

    let touchX = 0;
    hero.addEventListener("touchstart", (e) => {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    hero.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) < 48) return;
      go(dx < 0 ? i + 1 : i - 1);
    }, { passive: true });

    document.addEventListener("keydown", (e) => {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(timer);
        slides[i]?.querySelector("video")?.pause();
      } else {
        runVideo(slides[i]?.querySelector("video"), true);
        arm();
      }
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
      if (el.closest(".hero")) return;
      el.style.transitionDelay = `${Math.min(idx % 4, 3) * 120}ms`;
      reveal.observe(el);
    });
    setTimeout(() => {
      document.querySelectorAll("[data-aos]:not(.is-in), .inview:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.92) el.classList.add("is-in");
      });
    }, 600);
    setTimeout(() => {
      document.querySelectorAll("[data-aos], .inview").forEach((el) => el.classList.add("is-in"));
    }, 5000);

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
      asia: "<p>We welcome trade enquiries that name an Asian discharge port. Write the product, quantity and port.</p>",
      me: "<p>We welcome trade enquiries that name a Middle East discharge port. Write the product, quantity and port.</p>",
      eu: "<p>We welcome trade enquiries that name a European discharge port. Write the product, quantity and port.</p>",
      all: "<p>Select a region, then send the mill the pack, quantity and port. Availability and shipment are confirmed for each order.</p>",
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
