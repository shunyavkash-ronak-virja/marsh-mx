document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (!header) return;

  // ================================
  // EXISTING SELECTORS
  // ================================
  const toggleBtn = document.querySelector(".header-toggle");
  const responsiveItemsWrapper = document.querySelector(".responsive-items-wrapper");
  const menuCloseBtn = document.querySelector(".header-menu-close");
  const wrappers = document.querySelectorAll(".stack-wrapper");
  const toggleLinks = document.querySelectorAll("[data-target-menu]");
  const backBtn = document.querySelector(".go-back-btn");

  let currentIndex = 0;

  // ================================
  // INIT MENU FUNCTION
  // ================================
  function initMenu() {
    wrappers[0].classList.add("active");
  }

  // ================================
  // RESET MENU FUNCTION
  // ================================
  function resetMenu() {
    wrappers.forEach((wrapper, index) => {
      wrapper.classList.remove("active", "is-previous");
      const menus = wrapper.querySelectorAll(".stack-item-menus");
      menus.forEach((menu) => menu.classList.remove("active"));
    });
    if (backBtn) backBtn.classList.remove("active");
    currentIndex = 0;
  }

  // ================================
  // UPDATE MENU (SLIDING SYSTEM)
  // ================================
  function updateMenu(index) {
    wrappers.forEach((wrapper, i) => {
      wrapper.classList.remove("active", "is-previous");
      if (i < index) wrapper.classList.add("is-previous");
      if (i === index) wrapper.classList.add("active");
    });

    if (backBtn) {
      if (index === 0) {
        backBtn.classList.remove("active");
      } else {
        backBtn.classList.add("active");
      }
    }

    currentIndex = index;
  }

  // ================================
  // MOBILE MENU TOGGLE
  // ================================
  if (toggleBtn && responsiveItemsWrapper) {
    toggleBtn.addEventListener("click", () => {
      responsiveItemsWrapper.classList.toggle("active");
      document.body.classList.add("body-hidden");
      initMenu();
    });
  }

  if (menuCloseBtn && responsiveItemsWrapper) {
    menuCloseBtn.addEventListener("click", () => {
      responsiveItemsWrapper.classList.remove("active");
      document.body.classList.remove("body-hidden");
      resetMenu();
    });
  }

  // ================================
  // OPEN SUBMENU (UPDATED WITH ACTIVE MENU SYSTEM)
  // ================================
  toggleLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetId = this.dataset.targetMenu;
      if (!targetId) return;

      const targetMenu = document.getElementById(targetId);
      if (!targetMenu) return;

      const targetWrapper = targetMenu.closest(".stack-wrapper");
      const targetIndex = Array.from(wrappers).indexOf(targetWrapper);
      if (targetIndex === -1) return;

      const menusInsideWrapper = targetWrapper.querySelectorAll(".stack-item-menus");
      menusInsideWrapper.forEach((menu) => menu.classList.remove("active"));

      targetMenu.classList.add("active");

      updateMenu(targetIndex);
    });
  });

  // ================================
  // GO BACK BUTTON
  // ================================
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        const currentWrapper = wrappers[currentIndex];

        const menus = currentWrapper.querySelectorAll(".stack-item-menus");
        menus.forEach((menu) => menu.classList.remove("active"));

        updateMenu(currentIndex - 1);
      }
    });
  }

  // ================================
  // STACK CONTENTS ACCORDION (TOGGLE VERSION)
  // ================================
  const stackContentTitles = document.querySelectorAll(".stack-contents-title");
  stackContentTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const parentWrapper = this.closest(".stack-contents-wrapper");
      if (!parentWrapper) return;
      const currentMenu = this.closest(".stack-item-menus");
      if (!currentMenu) return;
      const allWrappers = currentMenu.querySelectorAll(".stack-contents-wrapper");
      const isAlreadyActive = parentWrapper.classList.contains("active");
      allWrappers.forEach((wrapper) => {
        wrapper.classList.remove("active");
      });
      if (!isAlreadyActive) {
        parentWrapper.classList.add("active");
      }
    });
  });
});

// ================================
// BODY SCROLL JS
// ================================
document.addEventListener("DOMContentLoaded", function () {
  const headerWrapper = document.querySelector("header");
  addEventListener("scroll", () => {
    if (window.pageYOffset > 20) {
      headerWrapper.classList.add("body-scroll");
    } else {
      headerWrapper.classList.remove("body-scroll");
    }
  });
});

// ================================
// FOOTER SLIDER
// ================================
if (document.querySelector(".footer-slider.splide")) {
  new Splide(".footer-slider", {
    type: "loop",
    gap: 15,
    pagination: !1,
    arrows: !1,
    autoWidth: !0,
    autoScroll: { speed: 0.7 },
  }).mount(window.splide.Extensions);
}

// ================================
// FEATURED SLIDER
// ================================
const featuredSlider = document.querySelectorAll(".featured-slider");
if (featuredSlider.length) {
  document.addEventListener("DOMContentLoaded", function () {
    const splide = new Splide(".featured-slider.splide", {
      type: "loop",
      autoplay: true,
      gap: 32,
      fixedWidth: "auto",
      pagination: false,
      perPage: 2,
      perMove: 1,
      speed: 800,
      interval: 5000,
      breakpoints: {
        767: {
          gap: 26,
          perPage: 1,
        },
      },
    });
    splide.mount();
  });
}

// ================================
// EXPLORE MORE SLIDER
// ================================
const exploreSlider = document.querySelectorAll(".explore-slider");
if (exploreSlider.length) {
  document.addEventListener("DOMContentLoaded", function () {
    const splide = new Splide(".explore-slider.splide", {
      autoplay: true,
      type: "loop",
      fixedWidth: "auto",
      focus: "center",
      gap: 150,
      perPage: 2,
      pagination: false,
      arrows: false,
      perMove: 1,
      speed: 800,
      interval: 5000,
      breakpoints: {
        1279: {
          gap: 110,
        },
        991: {
          gap: 80,
        },
        767: {
          gap: 50,
        },
        575: {
          gap: 24,
        },
      },
    });
    splide.mount();
  });
}

// ================================
// SHOP BY BRAND SLIDER
// ================================
if (document.querySelector(".shop-brand-slider.splide")) {
  new Splide(".shop-brand-slider", {
    type: "loop",
    gap: 60,
    pagination: !1,
    perPage: 8,
    arrows: !1,
    autoWidth: true,
    autoScroll: { speed: 0.7 },
    breakpoints: {
      991: {
        gap: 45,
      },
      575: {
        gap: 30,
      },
    },
  }).mount(window.splide.Extensions);
}

// ================================
// TESTIMONIAL SLIDER
// ================================
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(
    ".testimonial-slider.splide, .testimonial-v2-slider.splide"
  );

  sliders.forEach((slider) => {
    new Splide(slider, {
      type: "loop",
      autoplay: true,
      arrows: false,
      perPage: 1,
      perMove: 1,
      speed: 800,
      interval: 5000,
    }).mount();
  });
});

/* ========================================
          productCategory JS
========================================*/
// ================================
// PRODUCT CATEGORY LISTS
// ================================
const productListsWrapper = document.querySelectorAll(".product-lists-wrapper");
if (productListsWrapper.length) {
  const productListsItemTitle = document.querySelectorAll(".product-lists-item-title");

  productListsItemTitle.forEach((title) => {
    title.addEventListener("click", () => {
      title.classList.toggle("active");
      const content = title.nextElementSibling;
      content.classList.toggle("active");
    });
  });
}

// ================================
// FILTER BOX JS
// ================================
const filterDropDown = document.querySelectorAll(".filter-drop-down");
if (filterDropDown.length) {
  const filterDropDown = document.querySelector(".filter-drop-down");
  const filterBoxLabel = document.querySelector(".filter-box-label");

  filterBoxLabel.addEventListener("click", () => {
    filterDropDown.classList.toggle("active");
  });
}
// ================================
// FILTER TOGGLE JS
// ================================
const productItemsWrapper = document.querySelectorAll(".product-items-wrapper");
if (productItemsWrapper.length) {
  const filterToggleBtn = document.querySelector(".filter-toggle-btn");
  const productListsWrapper = document.querySelector(".product-lists-wrapper");
  const productListsCloseBtn = document.querySelector(".product-lists-close-btn");

  filterToggleBtn.addEventListener("click", () => {
    productListsWrapper.classList.toggle("active");
    document.body.classList.add("body-hidden");
  });

  productListsCloseBtn.addEventListener("click", () => {
    productListsWrapper.classList.remove("active");
    document.body.classList.remove("body-hidden");
  });
}

/* ========================================
          ProductOpen JS
========================================*/
// ================================
// PRODUCT OVERVIEW
// ================================
const productOverviewWrapper = document.querySelectorAll(".product-overview-wrapper");
if (productOverviewWrapper.length) {
  document.addEventListener("DOMContentLoaded", function () {
    var main = new Splide(".product-overview-slider.splide", {
      type: "fade",
      rewind: true,
      pagination: false,
      arrows: false,
    });

    var thumbnails = new Splide(".product-overview-thumbnail.splide", {
      fixedWidth: 108,
      fixedHeight: 110,
      gap: 10,
      rewind: true,
      pagination: false,
      perPage: 3,
      breakpoints: {
        575: {
          perPage: 2,
          fixedWidth: 88,
          fixedHeight: 80,
        },
      },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
  });
}

// ================================
// GLOBAL SIDEABR JS
// ================================
const sidebar = document.querySelectorAll(".sidebar");
if (sidebar.length) {
  const sidebarBtns = document.querySelectorAll("[data-sidebar]");
  const sidebarCloseBtns = document.querySelectorAll(".sidebar-close-btn");
  const sidebar = document.querySelectorAll(".sidebar");

  sidebarBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.sidebar;
      sidebarOpen(id);
    });
  });

  sidebarCloseBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.closest(".sidebar").id;
      sidebarClose(id);
    });
  });

  sidebar.forEach((sidebar) => {
    sidebar.addEventListener("click", (event) => {
      if (event.target.classList.contains("sidebar")) {
        const id = sidebar.id;
        sidebarClose(id);
      }
    });
  });

  const sidebarOpen = (id) => {
    const sidebar = document.querySelector(`#${id}`);
    if (sidebar) sidebar.classList.add("active");
    document.body.classList.add("body-hidden");
  };

  const sidebarClose = (id) => {
    const sidebar = document.querySelector(`#${id}`);
    if (sidebar) sidebar.classList.remove("active");
    document.body.classList.remove("body-hidden");
  };
}

// ================================
// GLOBAL MODAL JS
// ================================
const modal = document.querySelectorAll(".modal");
if (modal.length) {
  const modalBtns = document.querySelectorAll("[data-modal]");
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");
  const modal = document.querySelectorAll(".modal");

  modalBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.modal;
      modalOpen(id);
    });
  });

  modalCloseBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.closest(".modal").id;
      modalClose(id);
    });
  });

  modal.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        const id = modal.id;
        modalClose(id);
      }
    });
  });

  const modalOpen = (id) => {
    const modal = document.querySelector(`#${id}`);
    if (modal) modal.classList.add("active");
    document.body.classList.add("body-hidden");
  };

  const modalClose = (id) => {
    const modal = document.querySelector(`#${id}`);
    if (modal) modal.classList.remove("active");
    document.body.classList.remove("body-hidden");
  };
}

// ================================
// FINANCE MODAL JS
// ================================
document.querySelectorAll(".finance-value-wrapper").forEach((wrapper) => {
  const range = wrapper.querySelector(".finance-range-input");
  const numberInput = wrapper.querySelector(".finance-num-input");
  const minusBtn = wrapper.querySelectorAll(".finance-progress-btn")[0];
  const plusBtn = wrapper.querySelectorAll(".finance-progress-btn")[1];

  const updateUI = () => {
    const min = +range.min || 0;
    const max = +range.max || 100;
    const percent = ((range.value - min) / (max - min)) * 100;

    range.style.setProperty("--value", percent + "%");
    numberInput.value = range.value;
  };

  range.addEventListener("input", updateUI);

  numberInput.addEventListener("input", () => {
    range.value = numberInput.value;
    updateUI();
  });

  plusBtn.addEventListener("click", () => {
    range.stepUp();
    updateUI();
  });

  minusBtn.addEventListener("click", () => {
    range.stepDown();
    updateUI();
  });

  updateUI();
});

// ================================
// NICE SELECT JS
// ================================
const select = document.querySelectorAll("select");
if (select.length) {
  $(document).ready(function () {
    $("select").niceSelect();
  });
}

// ================================
// PART EX MODAL
// ================================
const partExButtons = document.querySelectorAll(".part-ex-option[data-modal]");
if (partExButtons.length) {
  const partExModals = [
    document.getElementById("part-ex-contact"),
    document.getElementById("part-ex-bike-value"),
  ];

  partExButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.modal;
      partExModals.forEach((modal) => {
        modal.classList.remove("active");
      });

      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add("active");
      }
      const allRadios = document.querySelectorAll('input[name="part-option"]');
      allRadios.forEach((radio) => {
        radio.checked = false;
      });
      const activeRadio = targetModal.querySelector(
        'input[name="part-option"][data-modal="' + targetId + '"]',
      );
      const radioInsideBtn = btn.querySelector('input[type="radio"]');
      if (radioInsideBtn) {
        radioInsideBtn.checked = true;
      }
    });
  });
}

// ================================
// PART EX TAB
// ================================
const partExContent = document.querySelectorAll(".part-ex-content");
if (partExContent.length) {
  const partExContact = document.querySelectorAll("#part-ex-contact");
  const partExBikeValue = document.querySelectorAll("#part-ex-bike-value");
}

// ================================
// BIKE SPECIFICS JS
// ================================
const bikeSpecificsWrapper = document.querySelectorAll(".bike-specifics-wrapper");
if (bikeSpecificsWrapper.length) {
  const bikeSpecificsWrapper = document.querySelector(".bike-specifics-wrapper");
  const bikeSpecificsBtn = document.querySelector(".bike-specifics-btn");

  bikeSpecificsBtn.addEventListener("click", () => {
    bikeSpecificsWrapper.classList.toggle("active");
    bikeSpecificsBtn.classList.toggle("active");
  });
}

// ================================
// FANCYBOX JS
// ================================
const fancybox = document.querySelectorAll("[ -fancybox]");
if (fancybox.length) {
  document.addEventListener("DOMContentLoaded", () => {
    Fancybox.bind("[data-fancybox]", {});
  });
}