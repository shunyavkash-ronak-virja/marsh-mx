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

document.addEventListener("DOMContentLoaded", function () {
  const headerWrapper = document.querySelector("header");
  addEventListener("scroll", () => {
    if (window.pageYOffset > 26) {
      headerWrapper.classList.add("body-scroll");
    } else {
      headerWrapper.classList.remove("body-scroll");
    }
  });
});

if (document.querySelector(".footer-slider.splide")) {
  new Splide(".footer-slider", {
    type: "loop",
    gap: "15px",
    pagination: !1,
    arrows: !1,
    autoWidth: !0,
    autoScroll: { speed: 0.7 },
  }).mount(window.splide.Extensions);
}
