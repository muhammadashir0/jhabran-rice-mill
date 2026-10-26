(() => {
  const WA = "923133332101";
  const PACKS = {
    "steam-1121": {
      brand: "Ziyarat", name: "Kainat Steam Rice 1121", urdu: "عمدہ خوشبودار چاول",
      variety: "1121 Kainat extra-long", process: "Steam", weight: "25 kg",
      color: "#145c32", accent: "#c6a15b", cut: "assets/products/cut/studio-steam-1121.png",
      waName: "Ziyarat Kainat Steam Rice 1121"
    },
    "sella-1121": {
      brand: "Ziyarat", name: "Kainat Sella Rice 1121", urdu: "عمدہ پکائی کے لیے بہترین خوشبودار چاول",
      variety: "1121 Kainat extra-long", process: "Sella", weight: "25 kg",
      color: "#6b1d68", accent: "#e8d5a3", cut: "assets/products/cut/studio-sella-1121.png",
      waName: "Ziyarat Kainat Sella Rice 1121"
    },
    "classic-sella": {
      brand: "Ziyarat", name: "Classic Kainat Basmati Sella", urdu: "کائینات باسمتی سیلہ رائس",
      variety: "Kainat basmati", process: "Sella", weight: "25 kg",
      color: "#b8942a", accent: "#1a1408", cut: "assets/products/cut/studio-classic-sella.png",
      waName: "Ziyarat Classic Kainat Basmati Sella"
    },
    "classic-steam": {
      brand: "Ziyarat", name: "Classic Kainat Basmati Steam", urdu: "کائینات باسمتی سٹیم رائس",
      variety: "Kainat basmati", process: "Steam", weight: "25 kg",
      color: "#d8d2c6", accent: "#1a1408", cut: "assets/products/cut/studio-classic-steam.png",
      waName: "Ziyarat Classic Kainat Basmati Steam"
    },
    "basmati": {
      brand: "Ziyarat", name: "Ziyarat Basmati Rice", urdu: "باسمتی رائس",
      variety: "Basmati", process: "Steam", weight: "25 kg",
      color: "#c45c1a", accent: "#e8d5a3", cut: "assets/products/cut/studio-basmati.png",
      waName: "Ziyarat Basmati Rice"
    },
    "short-grain": {
      brand: "Ziyarat", name: "Ziyarat Short Grain", urdu: "شارٹ گرین",
      variety: "Short grain", process: "Steam", weight: "25 kg",
      color: "#c9a227", accent: "#1a1408", cut: "assets/products/cut/studio-short.png",
      waName: "Ziyarat Short Grain"
    },
    "b1": {
      brand: "Ziyarat", name: "Ziyarat B-1 Broken", urdu: "ادھواڑ B-1",
      variety: "B-1 broken", process: "Broken", weight: "25 kg",
      color: "#1a4f9c", accent: "#e8d5a3", cut: "assets/products/cut/studio-b1.png",
      waName: "Ziyarat B-1 Broken"
    },
    "awami": {
      brand: "Ziyarat", name: "Basmati Awami Rice", urdu: "باسمتی عوامی رائس",
      variety: "Basmati Awami", process: "Steam", weight: "25 kg",
      color: "#7a1c24", accent: "#e8d5a3", cut: "assets/products/cut/studio-awami.png",
      waName: "Ziyarat Basmati Awami Rice"
    },
    "sultan-sella": {
      brand: "Sultan", name: "Sultan Kainat Basmati Sella", urdu: "سلطان کائینات باسمتی سیلہ رائس",
      variety: "Kainat basmati", process: "Sella", weight: "25 kg",
      color: "#c6a15b", accent: "#7a1f1f", cut: "assets/products/cut/studio-sultan-sella.png",
      waName: "Sultan Kainat Basmati Sella"
    },
    "sultan-short": {
      brand: "Sultan", name: "Sultan Short Grain", urdu: "سلطان شارٹ گرین",
      variety: "Short grain", process: "Steam", weight: "25 kg",
      color: "#12243a", accent: "#c6a15b", cut: "assets/products/cut/studio-sultan-short.png",
      waName: "Sultan Short Grain"
    }    ,
    "wazir-sella": {
      brand: "Wazir", name: "Wazir Kainat Basmati Sella", urdu: "وزیر کائینات باسمتی سیلہ",
      variety: "Kainat basmati", process: "Sella", weight: "25 kg",
      color: "#6b1d3a", accent: "#e8d5a3", cut: "assets/products/cut/studio-wazir-sella.png",
      waName: "Wazir Kainat Basmati Sella"
    },
    "wazir-steam": {
      brand: "Wazir", name: "Wazir Kainat Steam 1121", urdu: "وزیر کائینات سٹیم 1121",
      variety: "1121 Kainat extra-long", process: "Steam", weight: "25 kg",
      color: "#0e4d4d", accent: "#e8d5a3", cut: "assets/products/cut/studio-wazir-steam.png",
      waName: "Wazir Kainat Steam 1121"
    }
  };

  const SWATCHES = [
    { hex: "#145c32", label: "Mill green" },
    { hex: "#6b1d68", label: "Sella purple" },
    { hex: "#b8942a", label: "Classic gold" },
    { hex: "#12243a", label: "Export navy" },
    { hex: "#7a1c24", label: "Awami red" },
    { hex: "#1a4f9c", label: "B-1 blue" },
    { hex: "#161616", label: "Black" },
    { hex: "#d8d2c6", label: "Ivory" }
  ];

  const darken = (hex, f = 0.58) => {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.round(((n >> 16) & 255) * f);
    const g = Math.round(((n >> 8) & 255) * f);
    const b = Math.round((n & 255) * f);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const roundRect = (ctx, x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  let plateImg = null;
  const loadPlate = () => {
    if (plateImg) return Promise.resolve(plateImg);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => { plateImg = img; resolve(img); };
      img.onerror = () => resolve(null);
      img.src = "assets/studio/plate-basmati.jpg";
    });
  };

  const weaveCanvas = (color, w = 512, h = 1024) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.055)";
    ctx.lineWidth = 1;
    const step = 11;
    for (let y = -h; y < h * 2; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y + w); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y - w); ctx.stroke();
    }
    const g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "rgba(0,0,0,0.28)");
    g.addColorStop(0.18, "rgba(0,0,0,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.06)");
    g.addColorStop(0.82, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    return c;
  };

  const drawPrivateLabel = (pack, state) => {
    const W = 1024, H = 1536;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    const col = state.color || pack.color;
    const col2 = darken(col, 0.62);
    const col3 = darken(col, 0.42);
    const sultan = (pack.brand || "").toLowerCase() === "sultan" && !(state.name || "").trim();

    const body = ctx.createLinearGradient(0, 0, W, 0);
    body.addColorStop(0, col3);
    body.addColorStop(0.18, col);
    body.addColorStop(0.5, col2);
    body.addColorStop(0.82, col);
    body.addColorStop(1, col3);
    ctx.fillStyle = body;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.09;
    ctx.strokeStyle = "#e8d5a3";
    ctx.lineWidth = 1.2;
    for (let y = -40; y < H + 40; y += 28) {
      for (let x = -40; x < W + 40; x += 28) {
        ctx.strokeRect(x, y, 14, 14);
      }
    }
    ctx.restore();

    const foil = ctx.createLinearGradient(0, 0, W, 0);
    foil.addColorStop(0, "#8a6a2a");
    foil.addColorStop(0.5, "#f0e0b0");
    foil.addColorStop(1, "#8a6a2a");

    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, W, 210);
    ctx.fillRect(0, H - 130, W, 130);
    ctx.fillRect(0, 0, 36, H);
    ctx.fillRect(W - 36, 0, 36, H);

    ctx.fillStyle = col2;
    ctx.fillRect(36, 210, W - 72, 8);
    ctx.fillRect(36, H - 138, W - 72, 8);

    const mark = ((state.name || "").trim() || pack.brand || "YOUR MARK").slice(0, 22);
    ctx.beginPath();
    roundRect(ctx, 170, 48, W - 340, 128, 64);
    ctx.fillStyle = sultan ? "#7a1f1f" : col2;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#1a1408";
    ctx.stroke();
    ctx.fillStyle = sultan ? "#f6f0e4" : "#e8d5a3";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "600 64px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(mark, W / 2, 112);

    ctx.fillStyle = "#f6f0e4";
    ctx.font = "700 36px Manrope, sans-serif";
    ctx.fillText((pack.name || "").replace(pack.brand, "").trim().toUpperCase() || pack.name.toUpperCase(), W / 2, 290);
    if (pack.urdu) {
      ctx.font = "500 34px 'Noto Nastaliq Urdu', serif";
      ctx.fillStyle = "#e8d5a3";
      ctx.fillText(pack.urdu, W / 2, 350);
    }

    const show1121 = /1121/i.test(pack.name + pack.variety);
    if (show1121) {
      ctx.fillStyle = "#e8d5a3";
      ctx.font = "600 150px 'Cormorant Garamond', Georgia, serif";
      ctx.fillText("1121", W / 2, 470);
    }

    if (plateImg) {
      const pw = 520, ph = 300;
      const px = (W - pw) / 2;
      const py = show1121 ? 540 : 400;
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(W / 2, py + ph / 2, pw / 2, ph / 2, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(plateImg, px, py, pw, ph);
      ctx.restore();
      ctx.beginPath();
      ctx.ellipse(W / 2, py + ph / 2, pw / 2, ph / 2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#e8d5a3";
      ctx.lineWidth = 5;
      ctx.stroke();
    }

    ctx.fillStyle = "#e8d5a3";
    ctx.font = "700 26px Manrope, sans-serif";
    ctx.fillText(`${pack.process.toUpperCase()}  ·  ${state.weight || pack.weight}  ·  SORTEX CLEAN`, W / 2, H - 200);

    ctx.fillStyle = "#1a1408";
    ctx.font = "700 28px Manrope, sans-serif";
    ctx.fillText("SAITH HANIF RICE MILLS  JHABRAN", W / 2, H - 70);
    return c;
  };

  const drawNameplate = (text) => {
    const c = document.createElement("canvas");
    c.width = 1024; c.height = 260;
    const ctx = c.getContext("2d");
    const foil = ctx.createLinearGradient(0, 0, 1024, 0);
    foil.addColorStop(0, "#8a6a2a");
    foil.addColorStop(0.5, "#f0e0b0");
    foil.addColorStop(1, "#8a6a2a");
    ctx.fillStyle = foil;
    roundRect(ctx, 40, 36, 944, 188, 90);
    ctx.fill();
    ctx.fillStyle = "#123226";
    roundRect(ctx, 70, 56, 884, 148, 74);
    ctx.fill();
    ctx.strokeStyle = "#1a1408";
    ctx.lineWidth = 3;
    roundRect(ctx, 70, 56, 884, 148, 74);
    ctx.stroke();
    ctx.fillStyle = "#e8d5a3";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "600 62px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(text.toUpperCase().slice(0, 22), 512, 118);
    ctx.font = "600 16px Manrope, sans-serif";
    ctx.fillText("Packed at Saith Hanif Rice Mills, Jhabran", 512, 168);
    return c;
  };

  const makeSackGeometry = (w = 1.08, h = 1.74, d = 0.38) => {
    const g = new THREE.BoxGeometry(w, h, d, 12, 22, 4);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const yn = y / (h / 2);
      const bulge = 1 + 0.075 * Math.cos(yn * Math.PI * 0.5);
      const taper = yn > 0.6 ? 1 - (yn - 0.6) * 0.7 : 1;
      const fold = yn > 0.86 ? (yn - 0.86) * 0.14 : 0;
      pos.setXYZ(i, x * bulge * taper, y - fold, z * bulge * taper);
    }
    g.computeVertexNormals();
    return g;
  };

  const texFromCanvas = (canvas, renderer) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    tex.needsUpdate = true;
    return tex;
  };

  const openWA = (text) => {
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const mount = async (stage) => {
    if (!window.THREE) return;
    const id = stage.getAttribute("data-pack3d");
    let pack = PACKS[id] || PACKS["sella-1121"];
    const designMode = stage.getAttribute("data-mode") === "design";
    await Promise.all([loadPlate(), document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve()]);

    stage.querySelector(".pack3d-fallback")?.remove();
    const canvas = document.createElement("canvas");
    canvas.className = "pack3d-canvas";
    canvas.setAttribute("aria-label", `360 view of ${pack.name}`);
    stage.prepend(canvas);

    if (!stage.querySelector(".pack3d-hint")) {
      const hint = document.createElement("div");
      hint.className = "pack3d-hint";
      hint.textContent = "Drag to turn · 360°";
      stage.appendChild(hint);
    }
    if (!stage.querySelector(".pack3d-full")) {
      const fs = document.createElement("button");
      fs.type = "button";
      fs.className = "pack3d-full";
      fs.setAttribute("aria-label", "Full screen");
      fs.textContent = "Full";
      fs.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) stage.requestFullscreen?.();
        else document.exitFullscreen?.();
      });
      stage.appendChild(fs);
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0c1218, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0c1218, 6, 14);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.12, 3.15);

    const env = new THREE.TextureLoader().load("assets/studio/env-navy-gold.jpg", (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LINEAR_FILTER;
      scene.background = t;
    });
    void env;

    scene.add(new THREE.AmbientLight(0x889488, 0.42));
    const key = new THREE.DirectionalLight(0xffe1a8, 1.45);
    key.position.set(-2.4, 3.6, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 12;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc6a15b, 0.62);
    rim.position.set(3.2, 1.4, -2.2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xa8c4d8, 0.28);
    fill.position.set(1.6, 0.2, 3);
    scene.add(fill);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 48),
      new THREE.ShadowMaterial({ opacity: 0.38 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.9;
    floor.receiveShadow = true;
    scene.add(floor);

    const state = {
      name: "",
      color: pack.color,
      weight: pack.weight,
      variety: pack.name
    };

    const geo = makeSackGeometry();
    const sideMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(pack.color),
      roughness: 0.72,
      metalness: 0.04
    });
    const topMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(darken(pack.color, 0.45)),
      roughness: 0.8,
      metalness: 0.02
    });
    const frontMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.55,
      metalness: 0.06,
      transparent: true,
      alphaTest: 0.12
    });
    const backMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(darken(pack.color, 0.7)),
      roughness: 0.75,
      metalness: 0.04
    });
    // +x, -x, +y, -y, +z, -z
    const mesh = new THREE.Mesh(geo, [sideMat, sideMat, topMat, topMat, frontMat, backMat]);
    mesh.castShadow = true;
    mesh.position.y = -0.02;
    const bag = new THREE.Group();
    bag.add(mesh);

    const plateGeo = new THREE.PlaneGeometry(0.92, 0.25);
    const plateMat = new THREE.MeshStandardMaterial({
      transparent: true,
      roughness: 0.35,
      metalness: 0.35
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, 0.52, 0.205);
    plateMesh.visible = false;
    bag.add(plateMesh);
    scene.add(bag);

    const applyWeave = (hex) => {
      const c = weaveCanvas(hex);
      const tex = texFromCanvas(c, renderer);
      sideMat.map = tex;
      sideMat.color.set("#ffffff");
      sideMat.needsUpdate = true;
      backMat.map = tex;
      backMat.color.set("#ffffff");
      backMat.needsUpdate = true;
      topMat.color.set(darken(hex, 0.5));
    };
    applyWeave(pack.color);

    const loader = new THREE.TextureLoader();
    let photoTex = null;
    loader.load(pack.cut, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      photoTex = t;
      if (!usesCanvas()) {
        frontMat.map = t;
        frontMat.needsUpdate = true;
      }
    });

    const usesCanvas = () => {
      const colorChanged = state.color.toLowerCase() !== pack.color.toLowerCase();
      const weightChanged = state.weight !== pack.weight;
      return colorChanged || weightChanged;
    };

    const refreshFront = () => {
      if (usesCanvas()) {
        const c = drawPrivateLabel(pack, state);
        frontMat.map = texFromCanvas(c, renderer);
        frontMat.transparent = false;
        frontMat.alphaTest = 0;
        frontMat.needsUpdate = true;
        applyWeave(state.color);
        plateMesh.visible = false;
      } else if (photoTex) {
        frontMat.map = photoTex;
        frontMat.transparent = true;
        frontMat.alphaTest = 0.12;
        frontMat.needsUpdate = true;
        applyWeave(pack.color);
        if (state.name.trim()) {
          plateMat.map = texFromCanvas(drawNameplate(state.name.trim()), renderer);
          plateMat.needsUpdate = true;
          plateMesh.visible = true;
        } else {
          plateMesh.visible = false;
        }
      }
    };

    const root = document;
    const nameInput = root.querySelector("[data-pack-name]");
    const weightSel = root.querySelector("[data-pack-weight]");
    const colorBox = root.querySelector("[data-pack-colors]");
    const waBtn = root.querySelector("[data-pack-wa]");
    const resetBtn = root.querySelector("[data-pack-reset]");
    const packSel = root.querySelector("[data-pack-select]");

    if (colorBox && !colorBox.childElementCount) {
      SWATCHES.forEach((s) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "swatch";
        b.style.background = s.hex;
        b.title = s.label;
        b.setAttribute("aria-label", s.label);
        if (s.hex.toLowerCase() === pack.color.toLowerCase()) b.classList.add("is-on");
        b.addEventListener("click", () => {
          colorBox.querySelectorAll(".swatch").forEach((x) => x.classList.remove("is-on"));
          b.classList.add("is-on");
          state.color = s.hex;
          refreshFront();
        });
        colorBox.appendChild(b);
      });
    }
    if (weightSel) {
      [...weightSel.options].forEach((o) => {
        if (o.value === pack.weight || o.textContent.trim() === pack.weight) o.selected = true;
      });
      weightSel.addEventListener("change", () => {
        state.weight = weightSel.value;
        refreshFront();
      });
    }
    if (nameInput) {
      nameInput.addEventListener("input", () => {
        state.name = nameInput.value;
        refreshFront();
      });
    }
    if (packSel) {
      if (!packSel.childElementCount) {
        Object.entries(PACKS).forEach(([k, p]) => {
          const o = document.createElement("option");
          o.value = k;
          o.textContent = `${p.brand} · ${p.name}`;
          if (k === id) o.selected = true;
          packSel.appendChild(o);
        });
      }
      packSel.addEventListener("change", () => {
        pack = PACKS[packSel.value] || pack;
        state.color = pack.color;
        state.weight = pack.weight;
        state.variety = pack.name;
        if (weightSel) weightSel.value = pack.weight;
        photoTex = null;
        loader.load(pack.cut, (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          photoTex = t;
          refreshFront();
        });
        refreshFront();
      });
    }
    resetBtn?.addEventListener("click", () => {
      state.name = "";
      state.color = pack.color;
      state.weight = pack.weight;
      if (nameInput) nameInput.value = "";
      if (weightSel) weightSel.value = pack.weight;
      colorBox?.querySelectorAll(".swatch").forEach((x) => {
        x.classList.toggle("is-on", x.style.background.replace(/\s/g, "") === pack.color);
      });
      refreshFront();
    });
    waBtn?.addEventListener("click", () => {
      const mark = state.name.trim() || pack.brand;
      const lines = [
        "Assalam o Alaikum",
        "I previewed a pack on the mill website.",
        "",
        `Mark on sack: ${mark}`,
        `Based on: ${pack.waName}`,
        `Sack colour: ${state.color}`,
        `Weight: ${state.weight}`,
        `Process: ${pack.process}`,
        "Origin: Saith Hanif Rice Mills, Jhabran",
        "",
        "Please quote bags / a container."
      ];
      openWA(lines.join("\n"));
    });

    let dragging = false, px = 0, py = 0;
    let rotY = 0.42, rotX = 0.1, destY = 0.42, destX = 0.1;
    let dist = 3.15, destDist = 3.15;
    let auto = true, idle = 0;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const onDown = (e) => {
      dragging = true;
      auto = false;
      idle = 0;
      const t = e.touches ? e.touches[0] : e;
      px = t.clientX; py = t.clientY;
      stage.classList.add("is-drag");
    };
    const onMove = (e) => {
      if (!dragging) return;
      const t = e.touches ? e.touches[0] : e;
      destY += (t.clientX - px) * 0.008;
      destX += (t.clientY - py) * 0.005;
      destX = Math.max(-0.45, Math.min(0.55, destX));
      px = t.clientX; py = t.clientY;
    };
    const onUp = () => { dragging = false; stage.classList.remove("is-drag"); };
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      destDist = Math.max(2.2, Math.min(4.4, destDist + e.deltaY * 0.002));
    }, { passive: false });

    const resize = () => {
      const w = Math.max(1, stage.clientWidth);
      const h = Math.max(1, stage.clientHeight);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    new ResizeObserver(resize).observe(stage);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      idle += 1;
      if (!reduce && auto && idle > 40) destY += 0.0035;
      if (!reduce && idle > 240) auto = true;
      rotY += (destY - rotY) * 0.12;
      rotX += (destX - rotX) * 0.12;
      dist += (destDist - dist) * 0.12;
      bag.rotation.y = rotY;
      bag.rotation.x = rotX;
      camera.position.z = dist;
      camera.lookAt(0, 0.05, 0);
      renderer.render(scene, camera);
    };
    tick();
    refreshFront();
  };

  const boot = () => {
    document.querySelectorAll("[data-pack3d]").forEach((el) => {
      mount(el).catch(() => {});
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.Pack3D = { PACKS, WA, openWA };
})();
