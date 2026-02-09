document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (!header) return;

  // ================================
  // EXISTING SELECTORS
  // ================================

  const toggleBtn = document.querySelector(".header-toggle");
  const responsiveItemsWrapper = document.querySelector(".responsive-items-wrapper");
  const menuCloseBtn = document.querySelector(".header-menu-close-icon");

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
  // OPEN SUBMENU (ID MATCH SYSTEM)
  // ================================

  toggleLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetId = this.dataset.targetMenu;
      if (!targetId) return;

      const targetMenu = document.getElementById(targetId);
      console.log(targetMenu);

      if (!targetMenu) return;

      const targetWrapper = targetMenu.closest(".stack-wrapper");
      const targetIndex = Array.from(wrappers).indexOf(targetWrapper);

      if (targetIndex !== -1) {
        updateMenu(targetIndex);
      }
    });
  });

  // ================================
  // GO BACK BUTTON
  // ================================

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        updateMenu(currentIndex - 1);
      }
    });
  }

  // ================================
  // INITIAL STATE
  // ================================

  resetMenu();
});

//     const toggleLinks = document.querySelectorAll("[data-target-menu]");
//     const wrappers = document.querySelectorAll(".stack-wrapper");

//     toggleLinks.forEach((link) => {
//       link.addEventListener("click", function () {
//         const targetId = this.dataset.targetMenu;
//         const targetMenu = document.getElementById(targetId);
//         if (!targetMenu) return;
//         const targetWrapper = targetMenu.closest(".stack-wrapper");
//         const firstWrapper = wrappers[0];
//         firstWrapper.classList.add("is-previous");
//         targetWrapper.classList.add("active");
//       });
//     });
//   });
