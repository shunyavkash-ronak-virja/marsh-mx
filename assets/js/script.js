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
  // RESET MENU FUNCTION
  // ================================
  function resetMenu() {
    wrappers.forEach((wrapper, index) => {
      wrapper.classList.remove("active", "is-previous");
      if (index === 0) wrapper.classList.add("active");
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
    });
  }

  if (menuCloseBtn && responsiveItemsWrapper) {
    menuCloseBtn.addEventListener("click", () => {
      responsiveItemsWrapper.classList.remove("active");
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

  resetMenu();
});

// Body Scroll JS
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

// Footer Slider
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

// Featured Slider
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

// Explore More Slider
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

// Shop By Brand Slider
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

// Testimonial Slider
const testimonialSlider = document.querySelectorAll(".testimonial-slider");
if (testimonialSlider.length) {
  document.addEventListener("DOMContentLoaded", function () {
    const splide = new Splide(".testimonial-slider.splide", {
      type: "loop",
      autoplay: true,
      arrows: false,
      perPage: 1,
      perMove: 1,
      speed: 800,
      interval: 5000,
    });
    splide.mount();
  });
}

/* ========================================
          productCategory JS
========================================*/
// Product Category Lists
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

// Select Box Js
// document.addEventListener("DOMContentLoaded", function () {
//   const element = document.getElementById("bikesFilter");
//   const choices = new Choices(element, {
//     searchEnabled: false,
//     itemSelectText: "",
//     shouldSort: false,
//     placeholder: true,
//     placeholderValue: "Sort",
//     removeItemButton: false,
//   });
// });

const selectBox = document.querySelectorAll(".select-box");
if (selectBox.length) {
  const bikesFilter = new Choices("#bikesFilter", {
    searchEnabled: false,
    itemSelectText: "",
    shouldSort: false,
    position: "bottom",
  });

  // Keep "sort" static
  document.querySelector("#bikesFilter").addEventListener("change", function () {
    bikesFilter.removeActiveItems();
  });
}

// Filter Toggle Js
const productItemsWrapper = document.querySelectorAll(".product-items-wrapper");
if (productItemsWrapper.length) {
  const filterToggleBtn = document.querySelector(".filter-toggle-btn");
  const productListsWrapper = document.querySelector(".product-lists-wrapper");
  const productListsCloseBtn = document.querySelector(".product-lists-close-btn");

  filterToggleBtn.addEventListener("click", () => {
    productListsWrapper.classList.toggle("active");
  });

  productListsCloseBtn.addEventListener("click", () => {
    productListsWrapper.classList.remove("active");
  });
}
