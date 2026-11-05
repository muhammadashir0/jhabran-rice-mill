(() => {
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
    mapsSearch: "https://www.google.com/maps/search/?api=1&query=Saith+Hanif+Rice+Mills%2C+Sheikhupura-Hafizabad+Road%2C+Grain+Market+Jhabran%2C+Sheikhupura%2C+Punjab%2C+Pakistan",
    mapsDir: "https://www.google.com/maps/dir/?api=1&destination=Sheikhupura-Hafizabad+Road%2C+Grain+Market+Jhabran%2C+Sheikhupura%2C+Punjab%2C+Pakistan",
    mapsEmbed: "https://maps.google.com/maps?q=Saith%20Hanif%20Rice%20Mills%2C%20Grain%20Market%20Jhabran%2C%20Sheikhupura-Hafizabad%20Road%2C%20Sheikhupura&z=15&hl=en&output=embed",
    brands: ["Ziyarat", "Sultan", "Wazir"],
    url: "https://muhammadashir0.github.io/jhabran-rice-mill/"
  });

  const fillCompany = () => {
    const c = window.SHRM;
    if (!c) return;
    document.querySelectorAll("[data-company-address]").forEach((el) => {
      el.innerHTML = c.addressLines.join("<br>");
    });
    document.querySelectorAll("[data-company-phone]").forEach((el) => {
      el.textContent = c.phoneDisplay;
      if (el.tagName === "A") el.setAttribute("href", "tel:" + c.phoneTel);
    });
    document.querySelectorAll("[data-company-email]").forEach((el) => {
      el.textContent = c.email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + c.email);
    });
    document.querySelectorAll("[data-company-tagline]").forEach((el) => {
      el.textContent = c.tagline;
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillCompany);
  } else {
    fillCompany();
  }
})();
