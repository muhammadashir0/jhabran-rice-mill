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
    v.autoplay = true;
    v.loop = true;
    v.playsInline = true;
    v.controls = false;
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "true");
    v.removeAttribute("controls");
    v.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
    try { v.disablePictureInPicture = true; } catch (_) {}
  };
  const tryPlay = (v) => {
    if (v.dataset.off === "1") return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  const playVisible = () => {
    videos().forEach((v) => tryPlay(v));
  };
  videos().forEach(armVideo);

  window.addEventListener("load", () => {
    pre?.classList.add("hide");
    playVisible();
  });
  setTimeout(() => {
    pre?.classList.add("hide");
    playVisible();
  }, 800);

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
    window.open(`https://wa.me/923457144455?text=${text}`, "_blank");
    const note = form.querySelector(".form-note");
    if (note) note.textContent = "Opening WhatsApp with your enquiry. You may also email saithhanifsailaricemills@gmail.com.";
  });

  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-filter]");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-on"));
      btn.classList.add("is-on");
      const key = btn.dataset.key;
      cards.forEach((card) => {
        const hay = (card.dataset.filter || "").toLowerCase();
        card.hidden = !(key === "all" || hay.includes(key));
      });
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

  document.querySelectorAll(".pack-stage, .bag-stage, a.shot").forEach((stage) => {
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
})();
