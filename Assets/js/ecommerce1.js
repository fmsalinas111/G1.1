
iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;

const getProducts = async () => {
  try {
    const results = await fetch(URL = base_url+'Ecommerce/getProducts/'+iCo);
    const products = await results.json();
    return products;
  } catch (err) {    console.log(err);  }
};

const getCategories = async () => {
  try {
    const results = await fetch(URL = base_url+'Ecommerce/getCategory/'+iCo);
    const categories = await results.json();
    return categories;  
  } catch (err) {    console.log(err);  }
};

/*=============
Load Category Products
============= */
const categoryCenter = document.querySelector(".category__center");
const categoryTitle = document.querySelector(".title__container");
window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);

  const categories = await getCategories();
  displayCategItems(categories);
});

const displayProductItems = items => {
  let displayProduct = items.map(
    product => ` 
      <div class="product category__products ${product.categoria}" category="${product.categoria}">
        <div class="product__header">
          <img src="${base_url}Assets/images/uploads/${product.image}" alt="product">
        </div>
        <div class="product__footer">
          <h3>${product.producto}</h3>
          <div class="rating">
            <svg>
              <use xlink:href="${base_url}Assets/images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="${base_url}Assets/images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="${base_url}Assets/images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="${base_url}Assets/images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="${base_url}Assets/images/sprite.svg#icon-star-empty"></use>
            </svg>
          </div>
          <div class="product__price">
            <h4>$${product.precio}</h4>
          </div>
          <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
        </div>
      <ul>
          <li>
            <a data-tip="Quick View" data-place="left" href="#">
              <svg>
                <use xlink:href="${base_url}Assets/images/sprite.svg#icon-eye"></use>
              </svg>
            </a>
          </li>
          <li>
            <a data-tip="Add To Wishlist" data-place="left" href="#">
              <svg>
                <use xlink:href="${base_url}Assets/images/sprite.svg#icon-heart-o"></use>
              </svg>
            </a>
          </li>
          <li>
            <a data-tip="Add To Compare" data-place="left" href="#">
              <svg>
                <use xlink:href="${base_url}Assets/images/sprite.svg#icon-loop2"></use>
              </svg>
            </a>
          </li>
      </ul>
      </div>
      `
  );
  displayProduct = displayProduct.join("");
  if (categoryCenter)     categoryCenter.innerHTML = displayProduct;
  
};
//All Products
const displayCategItems=items=>{
  let displayCat = items.map(
    category=>`
      <div class="section__titles">
        <div class="section__title filter-btn" data-id="${category.categoria}">
          <span class="dot"></span>
          <h1 class="primary__title">${category.categoria}</h1>
        </div>
      </div>   `
  );
  displayCat = displayCat.join("");
  if (categoryTitle)  categoryTitle.innerHTML = `<div class="section__titles category__titles ">
        <div class="section__title filter-btn" data-id="*">
          <span class="dot"></span>
          <h1 class="primary__title">Todos</h1>
        </div>
      </div>  ${displayCat}`;

};


/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;
    const id = target.dataset.id;
    const products = await getProducts();
    if (id) { // remove active from buttons
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
        
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter(product => {
        if (product.categoria === id)  return product;
      });
      if (id === "*") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach(event => {
  if (picContainer) {
    picContainer.addEventListener(event, e => {
      const target = e.target.closest("img");
      if (!target) return;
      const id = target.id.slice(3);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", e => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach(btn => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // hide other active
      Array.from(contents).forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}


/*
=============
Navigation
=============
 */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
PopUp
=============
 
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });
}

*/

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", e => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});


/*
=============
Glide Js Carousel
=============
 */

const slider1 = document.getElementById("glide_1");
const slider2 = document.getElementById("glide_2");
const slider3 = document.getElementById("glide_3");
const slider4 = document.getElementById("glide_4");
const slider5 = document.getElementById("glide_5");

/*
=============
Hero
=============
 */
if (slider1) {
  new Glide(slider1, {
    type: "carousel",
    startAt: 0,
    autoplay: 3000,
    hoverpause: true,
    perView: 1,
    animationDuration: 800,
    animationTimingFunc: "linear",
  }).mount();
}

/*
=============
Latest Products
=============
 */

if (slider2) {
  new Glide("#glide_2", {
    type: "carousel",
    startAt: 0,
    perView: 4,
    rewin: false,
    animationDuration: 800,
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    breakpoints: {
      1200: {
        perView: 3,
      },
      768: {
        perView: 2,
      },
    },
  }).mount();
}

/*
=============
Related Products
=============
 */

if (slider3) {
  new Glide("#glide_3", {
    type: "carousel",
    startAt: 0,
    perView: 4,
    rewin: false,
    animationDuration: 800,
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    breakpoints: {
      1200: {
        perView: 3,
      },
      768: {
        perView: 2,
      },
    },
  }).mount();
}

// Testimonial

if (slider4) {
  new Glide("#glide_4", {
    type: "carousel",
    startAt: 0,
    perView: 1,
    rewin: false,
    animationDuration: 800,
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
  }).mount();
}

// News
if (slider5) {
  new Glide("#glide_5", {
    type: "carousel",
    startAt: 0,
    perView: 3,
    rewin: false,
    autoplay: 3000,
    animationDuration: 800,
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    breakpoints: {
      998: {
        perView: 2,
      },
      768: {
        perView: 1,
      },
    },
  }).mount();
}

AOS.init();
