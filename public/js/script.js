// sidebar

// menu sidebar
const buttonMenubar = document.querySelectorAll(".header .menubar");
if (buttonMenubar.length > 0) {
  const sidebarContent = document.querySelector("header .sidebar-content-closer");
  const sidebar = document.querySelectorAll(".header .sidebar-content");
  const menuCloser = document.querySelector(".header .menu-closer");
  const sidebarMenu = document.querySelector(".header .mobile-menu__sidebar-menu");
  buttonMenubar.forEach((button) => {
    button.addEventListener("click", () => {
      sidebarContent.classList.add("active");
      sidebar.forEach((item) => {
        item.classList.add("active");
      });
      menuCloser.classList.add("active");
      sidebarMenu.classList.add("active");
    });
  })

  const buttonSideWidget = document.querySelectorAll(".header .close-side-widget");
  if (buttonSideWidget.length > 0) {
    buttonSideWidget.forEach((button) => {
      button.addEventListener("click", () => {
        sidebarContent.classList.remove("active");
        sidebar.forEach((item) => {
          item.classList.remove("active");
        });
        menuCloser.classList.remove("active");
        sidebarMenu.classList.remove("active");
      });
    })
  }

  sidebar.forEach((items) => {
    items.addEventListener("click", () => {
      sidebarContent.classList.remove("active");
      items.classList.remove("active");
      menuCloser.classList.remove("active");
      sidebarMenu.classList.remove("active");
    });
  });
}
// End menu sidebar

// cart sidebar
const buttonCart = document.querySelectorAll(".header .cart");
if (buttonCart.length > 0) {
  const sidebarCartCloser = document.querySelector("header .sidebar-cart-closer");
  const sidebarCart = document.querySelector(".header .sidebar-cart");
  const closeCartButton = document.querySelector(".header .close-cart-button");

  buttonCart.forEach((button) => {
    button.addEventListener("click", () => {
      sidebarCartCloser.classList.add("active");
      sidebarCart.classList.add("active");
    })
  });

  sidebarCartCloser.addEventListener("click", () => {
    sidebarCartCloser.classList.remove("active");
    sidebarCart.classList.remove("active");
  })

  closeCartButton.addEventListener("click", () => {
    sidebarCartCloser.classList.remove("active");
    sidebarCart.classList.remove("active");
  })
}
// End cart sidebar

// End sidebar

// menu fixed
const header = document.querySelector(".header");
if (header) {
  let sticyHeader = document.querySelector(".sticy-header"); // Chọn menu
  let scrollToTop = document.querySelector(".scrollToTop"); // Chọn menu
  let menuOffset = header.offsetHeight;
  window.addEventListener("resize", () => {
    menuOffset = header.offsetHeight;
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > menuOffset) {
      sticyHeader.classList.add("active", "animate__animated", "animate__fadeInDown");
      scrollToTop.classList.add("bottom-[30px]", "translate-y-[0]");
    } else {
      sticyHeader.classList.remove("active", "animate__animated", "animate__fadeInDown");
      scrollToTop.classList.remove("bottom-[30px]", "translate-y-[0]");
    }
  });

  scrollToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
}
// End menu fixed

// toggle menu
const menuArrow = document.querySelectorAll(".header .mobile-menu__sidebar-menu .pages-dropdown-menu .menuarrow");

if (menuArrow.length > 0) {
  menuArrow.forEach((button) => {
    button.addEventListener("click", async () => {
      button.classList.toggle("rotate-90");
      let dropdown = button.parentElement.nextElementSibling;
      if (dropdown) {
        if (dropdown.style.display === "block") {
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          setTimeout(() => {
            dropdown.style.maxHeight = "0";
            dropdown.style.opacity = "0";
          }, 10);

          setTimeout(() => {
            dropdown.style.display = "none";
          }, 300);
        } else {
          dropdown.style.display = "block";
          dropdown.style.opacity = "0";
          dropdown.style.maxHeight = "0";

          setTimeout(() => {
            let height = dropdown.scrollHeight + "px";
            dropdown.style.maxHeight = height;
            dropdown.style.opacity = "1";
          }, 10);
        }
      }
    });
  });
}
// End toggle menu

// swiper
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

// categories tab 
var bestSellerTabSwiper = new Swiper(".bestSellerSwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: ".bestSellerSwiper-button-next",
    prevEl: ".bestSellerSwiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  },
});

var newArrivalTabSwiper = new Swiper(".newArrivalSwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: ".newArrivalSwiper-button-next",
    prevEl: ".newArrivalSwiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  },
});

var topRatedTabSwiper = new Swiper(".topRatedSwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: ".topRatedSwiper-button-next",
    prevEl: ".topRatedSwiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  },
});
// categories tab 

// product bestseller
var productBestSellerSwiper = new Swiper(".product-bestseller .bestSellerSwiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".product-bestseller .bestSellerSwiper-button-next",
    prevEl: ".product-bestseller .bestSellerSwiper-button-prev",
  }
});

const listButtonSwiperBestseller = document.querySelectorAll(".product-bestseller .button-swiper");

if (listButtonSwiperBestseller.length > 0) {
  listButtonSwiperBestseller.forEach(button => {
    button.addEventListener("click", function () {
      productBestSellerSwiper.autoplay.stop();
    });
  })
}
// end product bestseller

// review
var reviewSwiper = new Swiper(".review-area .reviewSwiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  breakpoints: {
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  },
  navigation: {
    nextEl: ".reviewSwiper-button-next",
    prevEl: ".reviewSwiper-button-prev",
  }
});

const listButtonSwiperReview = document.querySelectorAll(".review-area .button-swiper");

if (listButtonSwiperReview.length > 0) {
  listButtonSwiperReview.forEach(button => {
    button.addEventListener("click", function () {
      reviewSwiper.autoplay.stop();
    });
  })
}
// end review

const eventSwiper = document.querySelector(".mySwiper");

if (eventSwiper) {
  eventSwiper.addEventListener("mouseenter", function () {
    swiper.autoplay.stop();
  });

  eventSwiper.addEventListener("mouseleave", function () {
    swiper.autoplay.start();
  });
}

var productDetailSwiper2 = new Swiper(".product-detail-swiper2", {
  loop: false,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  slideActiveClass: 'thumb-active',
});

var productDetailSwiper3 = new Swiper(".product-detail-swiper3", {
  loop: false,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  slideActiveClass: 'thumb-active',
});

var productDetailSwiper = new Swiper(".product-detail-swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: productDetailSwiper2,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  on: {
    slideChange: function () {
      let activeIndex = this.realIndex;
      productDetailSwiper2.slides.forEach(slide => slide.classList.remove('thumb-active'));
      productDetailSwiper2.slides[activeIndex].classList.add('thumb-active');
    }
  }
});

const dataSrc = document.querySelectorAll(".product-detail [data-src]");
if (dataSrc.length > 0) {
  dataSrc.forEach(item => {
    item.addEventListener("click", () => {
      dataSrc.forEach(element => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
        }
      })
      item.classList.add("open")

      const linkSize = item.getAttribute("data-src");
      const listImg = document.querySelectorAll(".product-detail-swiper .swiper-slide img");
      let index = Array.from(listImg).findIndex(img => img.getAttribute("src") === linkSize);

      if (index !== -1) {
        productDetailSwiper.slideTo(index)
      }
    })
  })
}
// End swiper

// select

const niceSelect = document.querySelector(".nice-select");

if (niceSelect) {
  const list = niceSelect.querySelector("ul");
  const icon = niceSelect.querySelector(".icon");

  niceSelect.addEventListener("click", () => {
    list.classList.toggle("open");
    icon.classList.toggle("rotate");
  });
}


// End select

// Pagination
const buttonPagination = document.querySelectorAll(".product-grid .pagination a");
if (buttonPagination.length > 0) {
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      buttonPagination.forEach((element) => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      })
      button.classList.add("active")
    })
  })
}
// End Pagination

// Magnific Popup
$(document).ready(function () {
  $('.image-popup').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });
});
//End Magnific Popup

//tab product detail
const dataTab = document.querySelectorAll(".tab-area .nav-item button");
if (dataTab.length > 0) {
  dataTab.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".tab-area .nav-item button.active").classList.remove("active");
      document.querySelector(".tab-area .tab-pane.active").classList.remove("active");
      item.classList.add("active");
      document.getElementById(item.dataset.tab).classList.add("active");
    })
  })
}
//End tab product detail

// categories tab 
const navLinks = document.querySelectorAll(".categories-tab .nav .nav-link");
if (navLinks.length > 0) {
  navLinks.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("id");
      const activeLink = document.querySelector(".categories-tab .nav .nav-link.active");

      if (activeLink) activeLink.classList.remove("active");

      button.classList.add("active");

      const activeTab = document.querySelector(".categories-tab .tab-content .tab-pane.active");
      if (activeTab) {
        activeTab.classList.remove("opacity-100");
        activeTab.classList.add("opacity-0");
        activeTab.addEventListener("transitionend", () => {
          activeTab.classList.remove("active");
          const newTab = document.querySelector(`.categories-tab .tab-content .tab-pane[aria-labelledby="${id}"]`);
          if (newTab) {
            newTab.classList.add("active");

            setTimeout(() => {
              newTab.classList.add("opacity-100");
              newTab.classList.remove("opacity-0");
            }, 10);
          }
        }, {
          once: true
        });
      }
    })
  })
}
// end categories tab 