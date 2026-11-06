(() => {
  const CATALOG = [
    {
      id: "steam-1121",
      brand: "Ziyarat",
      name: "Kainat Steam Rice 1121",
      variety: "1121 Kainat extra-long",
      process: "Steam",
      url: "product-steam.html",
      image: "assets/products/studio-steam-1121.jpg?v=35",
      filters: ["ziyarat", "steam", "kainat", "1121"],
      blurb: "Extra-long 1121, steamed. Separate grains for everyday cooking.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "sella-1121",
      brand: "Ziyarat",
      name: "Kainat Sella Rice 1121",
      variety: "1121 Kainat extra-long",
      process: "Sella",
      url: "product-sella.html",
      image: "assets/products/studio-sella-1121.jpg?v=35",
      filters: ["ziyarat", "sella", "kainat", "1121"],
      blurb: "Extra-long 1121, parboiled. Holds shape in bulk cooking.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "classic-sella",
      brand: "Ziyarat",
      name: "Classic Kainat Basmati Sella",
      variety: "Kainat basmati",
      process: "Sella",
      url: "product-classic.html",
      image: "assets/products/studio-classic-sella.jpg?v=35",
      filters: ["ziyarat", "sella", "classic", "kainat"],
      blurb: "Gold Classic. Kainat basmati sella, extra-long.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "classic-steam",
      brand: "Ziyarat",
      name: "Classic Kainat Basmati Steam",
      variety: "Kainat basmati",
      process: "Steam",
      url: "product-classic-steam.html",
      image: "assets/products/studio-classic-steam.jpg?v=35",
      filters: ["ziyarat", "steam", "classic", "kainat"],
      blurb: "Classic steam. Extra-long Kainat basmati.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "basmati",
      brand: "Ziyarat",
      name: "Ziyarat Basmati Rice",
      variety: "Basmati",
      process: "Steam",
      url: "product-basmati.html",
      image: "assets/products/studio-basmati.jpg?v=35",
      filters: ["ziyarat", "basmati"],
      blurb: "Everyday basmati. Not the 1121 extra-long sack.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "short-grain",
      brand: "Ziyarat",
      name: "Ziyarat Short Grain",
      variety: "Short grain",
      process: "Steam",
      url: "product-short-grain.html",
      image: "assets/products/studio-short.jpg?v=35",
      filters: ["ziyarat", "short"],
      blurb: "Short grain. A closer cook — not extra-long 1121.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "b1",
      brand: "Ziyarat",
      name: "Ziyarat B-1 Broken",
      variety: "B-1 broken",
      process: "Broken",
      url: "product-b1.html",
      image: "assets/products/studio-b1.jpg?v=35",
      filters: ["ziyarat", "broken"],
      blurb: "Broken rice for catering. Packed as broken, not whole grain.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "awami",
      brand: "Ziyarat",
      name: "Basmati Awami Rice",
      variety: "Basmati Awami",
      process: "Steam",
      url: "product-awami.html",
      image: "assets/products/studio-awami.jpg?v=35",
      filters: ["ziyarat", "basmati", "awami"],
      blurb: "Everyday basmati. Below Classic and 1121.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "sultan-sella",
      brand: "Sultan",
      name: "Sultan Kainat Basmati Sella",
      variety: "Kainat basmati",
      process: "Sella",
      url: "product-sultan-sella.html",
      image: "assets/products/studio-sultan-sella.jpg?v=35",
      filters: ["sultan", "sella", "kainat"],
      blurb: "Sultan mark. Kainat basmati sella, extra-long.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "sultan-short",
      brand: "Sultan",
      name: "Sultan Short Grain",
      variety: "Short grain",
      process: "Steam",
      url: "product-sultan-short.html",
      image: "assets/products/studio-sultan-short.jpg?v=35",
      filters: ["sultan", "short"],
      blurb: "Sultan short grain. Not extra-long 1121.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "wazir-sella",
      brand: "Wazir",
      name: "Wazir Kainat Basmati Sella",
      variety: "Kainat basmati",
      process: "Sella",
      url: "product-wazir-sella.html",
      image: "assets/products/studio-wazir-sella.jpg?v=35",
      filters: ["wazir", "sella", "kainat"],
      blurb: "Wazir mark. Kainat basmati sella, extra-long.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    },
    {
      id: "wazir-steam",
      brand: "Wazir",
      name: "Wazir Kainat Steam 1121",
      variety: "1121 Kainat extra-long",
      process: "Steam",
      url: "product-wazir-steam.html",
      image: "assets/products/studio-wazir-steam.jpg?v=35",
      filters: ["wazir", "steam", "kainat", "1121"],
      blurb: "Wazir mark. Extra-long steam 1121.",
      packaging: "5 / 10 / 20 / 25 kg, confirmed per order"
    }
  ];

  window.SHRM = Object.assign(window.SHRM || {}, {
    mill: "Saith Hanif Rice Mills",
    founded: 1979,
    heritageYears: 47,
    heritageSpan: "1979–2026",
    tagline: "A Legacy of Excellence Since 1979.",
    phoneDisplay: "+92 313 3332101",
    phoneTel: "+923133332101",
    whatsapp: "923133332101",
    email: "saithhanifsailaricemills@gmail.com",
    address: "Sheikhupura–Hafizabad Road, Grain Market Jhabran, Sheikhupura, Punjab, Pakistan.",
    addressLines: [
      "Sheikhupura–Hafizabad Road",
      "Grain Market Jhabran",
      "Sheikhupura, Punjab, Pakistan"
    ],
    mapsQuery: "Saith Hanif Rice Mills, Sheikhupura-Hafizabad Road, Grain Market Jhabran, Sheikhupura, Punjab, Pakistan",
    mapsSearch: "https://www.google.com/maps/search/?api=1&query=Saith+Hanif+Rice+Mills%2C+Sheikhupura-Hafizabad+Road%2C+Grain+Market+Jhabran%2C+Sheikhupura%2C+Punjab%2C+Pakistan",
    mapsDir: "https://www.google.com/maps/dir/?api=1&destination=Sheikhupura-Hafizabad+Road%2C+Grain+Market+Jhabran%2C+Sheikhupura%2C+Punjab%2C+Pakistan",
    mapsEmbed: "https://maps.google.com/maps?q=Saith%20Hanif%20Rice%20Mills%2C%20Grain%20Market%20Jhabran%2C%20Sheikhupura-Hafizabad%20Road%2C%20Sheikhupura&z=15&hl=en&output=embed",
    brands: ["Ziyarat", "Sultan", "Wazir"],
    catalog: CATALOG
  });
})();

