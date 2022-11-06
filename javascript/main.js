const search = document.querySelector(".content-search input");
const showInput = document.querySelector(".header_tools .header_search");
const glasses = document.querySelector(".content-search .glasses");
const ulItem = document.querySelector(".content-search .history-search");
const inputSearch = document.querySelector(".input-search");
const closed = document.querySelector(".close i");
const addBtn = document.querySelectorAll(".addto");
const shop_cart = document.querySelector(".cart");
const buy_cart = document.querySelector(".buy-cart");
const cart = document.querySelector(".buy-cart .shop-cart");
const shopList = document.querySelector(".shop-item");
const close_cart = document.querySelector(".buy-cart .close");
const total = document.querySelector(".buy-infor_total-value");
const iconnavi = document.querySelector(".navigation ");
const changeIcon = iconnavi.querySelector("i");
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll(".nav_list");
const delete_item = document.querySelectorAll(".item-button i");
const buysth = Array.from(document.querySelectorAll('.buyfood'));
const AllitemList = Array.from(document.querySelectorAll(".food-name")).map(
  (item) => item.innerText
);
const handleNoti = document.querySelector("#handle-notifi");
// remove Input-search
showInput.addEventListener("click", function () {
  inputSearch.classList.replace("scrollYafter", "scrollYbefore");
});
// Close Input-search
closed.addEventListener("click", function () {
  inputSearch.classList.replace("scrollYbefore", "scrollYafter");
});
// Handle smooth 
function smooth() {
  var smoothto = document.getElementById('order');
  window.scroll({
    top: smoothto.offsetTop,
    behavior: 'smooth'
  })
}
// Buy one 
buysth.forEach(item => {
  item.addEventListener('click', function (e) {
    var buyone = {
      name: item.parentElement.parentElement.querySelector('.food-name').innerText,
      price: item.parentElement.parentElement.querySelector('.price').innerText
    }
    localStorage.setItem('buyone', JSON.stringify(buyone));
    smooth()
  })
})
// Close Notifi
function closeNotifi() {
  updateNoti().closeNoti.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.parentElement.style.animation = "hide_noti 3s ease forwards";
      setTimeout(() => {
        handleNoti.removeChild(e.target.parentElement);
      }, 3000);
    });
  });
}
// Create Success Noti
function createSucces() {
  const success = document.createElement("div");
  success.className = "success-noti notification";
  success.innerHTML = `
  <i class="search-icon_noti noti-success fa-solid fa-circle-check"></i>
  <span class="search-noti_title">
    <h4 class="search-noti_name">Successfull</h4>
    <p class="search-noti_phara">Done! Your result in menu</p>
  </span>
  <i class="noti_close fa-solid fa-xmark"></i>
  <div class="count-down noti-success-count"></div>
  `;
  handleNoti.appendChild(success);
  updateNoti().succesNoti.forEach((item) => {
    item.style.animation = "show_noti 3s ease forwards";
    setTimeout(() => {
      item.style.animation = "hide_noti 3s ease forwards";
      setTimeout(() => {
        handleNoti.removeChild(item);
      }, 5500);
    }, 5000);
  });
  closeNotifi();
}
// Create Notification
function createNotifica() {
  const noti = document.createElement("div");
  noti.className = "search-noti notification";
  noti.innerHTML = `
  <i class="search-icon_noti noti-infor fa-solid fa-circle-info"></i>
  <span class="search-noti_title">
    <h4 class="search-noti_name">Notificaltion</h4>
    <p class="search-noti_phara">This result isn't in menu</p>
  </span>
  <i class="noti_close fa-solid fa-xmark"></i>
  <div class="count-down noti-infor-count "></div>
  `;
  handleNoti.appendChild(noti);
  updateNoti().searchNoti.forEach((item) => {
    item.style.animation = "show_noti 3s ease forwards";
    setTimeout(() => {
      item.style.animation = "hide_noti 3s ease forwards";
      console.log("hello");
      setTimeout(() => {
        handleNoti.removeChild(item);
      }, 5500);
    }, 5000);
  });
  closeNotifi();
}
// Input search
search.addEventListener("keydown", function (e) {
  var values = e.target.value.trim();
  var parent = e.target;
  if (values != "" && e.code === "Enter") {
    var li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
    <h6 class="item-value">${values}</h6>
    <i class="delete fa-solid fa-xmark"></i>
    `;
    ulItem.appendChild(li);
    e.target.value = "";
    updateList();
    removeHistory();
    setTimeout(() => {
      inputSearch.classList.replace("scrollYbefore", "scrollYafter");
    }, 500);
    setTimeout(() => {
      checkResult(values.toString()) !== undefined
        ? createSucces()
        : createNotifica();
    }, 800);
    updateItem();
    e.preventDefault();
  }
  beforeResult(parent);
});
// handle Click on glasses
glasses.addEventListener("click", function (e) {
  var values = e.target.parentElement.querySelector(".search").value.trim();
  if (values != "") {
    var li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
    <h6 class="item">${values}</h6>
    <i class="delete fa-solid fa-xmark"></i>
    `;
    ulItem.appendChild(li);
    e.target.parentElement.querySelector(".search").value = "";
    setTimeout(() => {
      inputSearch.classList.replace("scrollYbefore", "scrollYafter");
    }, 500);
    setTimeout(() => {
      checkResult(values.toString()) !== undefined
        ? createSucces()
        : createNotifica();
    }, 800);
    updateList();
    removeHistory();
  }
});
// Check result
function checkResult(value) {
  const result = AllitemList.find((item) => {
    return item === value;
  });
  return result;
}
// Update history
function updateList() {
  const delList = Array.from(
    document.querySelectorAll(".content-search .delete")
  );
  return delList;
}
//
function updateItem() {
  const listItem = Array.from(
    document.querySelectorAll(".content-search .list-item h6")
  );

  return listItem;
}
// Handle Result
function beforeResult(e) {
  updateItem().forEach((item) => {
    item.addEventListener("click", function () {
      const itemValue = item.innerText;
      e.value = itemValue;
    });
  });
}
// Remove
function removeHistory() {
  updateList().forEach((item) => {
    item.addEventListener("click", function () {
      var parentClose = item.parentElement;
      parentClose.remove();
    });
  });
}
// update Noti
function updateNoti() {
  const closeNoti = Array.from(document.querySelectorAll(".noti_close"));
  const succesNoti = Array.from(
    document.querySelectorAll("#handle-notifi .success-noti")
  );
  const searchNoti = Array.from(
    document.querySelectorAll("#handle-notifi .search-noti")
  );
  const warnNoti = Array.from(
    document.querySelectorAll("#handle-notifi .warning-noti")
  );
  const errorNoti = Array.from(
    document.querySelectorAll("#handle-notifi .shopping-noti")
  );
  const boughtNoti = Array.from(
    document.querySelectorAll("#handle-notifi .bought-noti")
  );

  return { closeNoti, succesNoti, searchNoti, warnNoti, errorNoti, boughtNoti };
}
// Swiper slide animation
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
const swiper = new Swiper(".home-slide", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});
// Swiper for comment

const swiper1 = new Swiper(".comment-slide", {
  freeMode: {
    enabled: true,
    sticky: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  loop: true,
});
//   show cart
shop_cart.addEventListener("click", function () {
  buy_cart.style.transform = "translateX(0)";
  cart.style.transform = "translateX(0)";
});
// close cart
close_cart.addEventListener("click", function () {
  buy_cart.style.transform = "translateX(200%)";
  cart.style.transform = "translateX(200%)";
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
// Document Render
function render() {
  for (var i = 0; i < delete_item.length; i++) {
    var delbutton = delete_item[i];
    delbutton.addEventListener("click", removeItem);
  }
  const grow = document.querySelectorAll(".grow");
  for (var i = 0; i < grow.length; i++) {
    var growbtn = grow[i];
    growbtn.addEventListener("click", growing);
  }
  const decrease = document.querySelectorAll(".increase");
  for (var i = 0; i < grow.length; i++) {
    var lowerbtn = decrease[i];
    lowerbtn.addEventListener("click", lowing);
  }
  for (var i = 0; i < addBtn.length; i++) {
    var addto = addBtn[i];
    addto.addEventListener("click", addItemtoCart);
  }
}
const buyNowbtn = document.querySelector(".buy-cart button");
buyNowbtn.addEventListener("click", buyNowbtnClick);
// Grow the quanlity
function growing(e) {
  var curentItemQuanlity =
    e.target.parentElement.querySelector(".item-quanlity");
  var curentQuanlity = curentItemQuanlity.textContent * 1;
  curentItemQuanlity.innerText = ++curentQuanlity;
  cartTotal();
}
// Lower the quanlity
function lowing(e) {
  var curentItemQuanlity =
    e.target.parentElement.querySelector(".item-quanlity");
  var curentQuanlity = curentItemQuanlity.textContent * 1;
  if (curentQuanlity == 1) {
    curentQuanlity = 1;
  } else curentItemQuanlity.innerText = --curentQuanlity;
  cartTotal();
}
// Remove item from list-cart
function removeItem(e) {
  var cart_num = document.querySelector(".quanlity-cart");
  var quanlityCart = parseInt(cart_num.textContent);
  cart_num.innerText = --quanlityCart;
  const delebuttonParent = e.target.parentElement.parentElement.parentElement;
  delebuttonParent.remove();
  cartTotal();
}
// Add item to cart
function addItemtoCart(e) {
  var cart_num = document.querySelector(".quanlity-cart");
  var quanlityCart = parseInt(cart_num.textContent);
  cart_num.innerText = ++quanlityCart;
  var item = e.target.parentElement.parentElement;
  var itemName = item.querySelector(".food-name").innerText;
  var itemPrice = item.querySelector(".price").innerText;
  var itemImagesrc = item.querySelector(".image img").src;
  renderItem(itemName, itemPrice, itemImagesrc, cart_num, quanlityCart);
  cartTotal();
}
// Add cart to html
function renderItem(name, price, src, number, quanlity) {
  var allItemName = document.querySelectorAll(".item-name");
  for (var i = 0; i < allItemName.length; i++) {
    if (allItemName[i].innerText == name) {
      const warn = document.createElement("div");
      warn.className = "warning-noti notification";
      warn.innerHTML = `<i class="search-icon_noti noti-waring fa-solid fa-bell"></i>
      <span class="search-noti_title">
        <h4 class="search-noti_name">Warning</h4>
        <p class="search-noti_phara">This product has been in your shop cart</p>
      </span>
      <i class="noti_close fa-solid fa-xmark"></i>
      <div class="count-down noti-warn-count"></div>
      `;
      handleNoti.appendChild(warn);
      updateNoti().warnNoti.forEach((item) => {
        item.style.animation = "show_noti 3s ease forwards";
        setTimeout(() => {
          item.style.animation = "hide_noti 3s ease forwards";
          setTimeout(() => {
            handleNoti.removeChild(item);
          }, 5500);
        }, 5000);
      });
      closeNotifi();
      number.innerText = --quanlity;
      return;
    }
  }
  var itemCart = document.createElement("span");
  itemCart.className = "shopping-item cart-grid cart-wide";
  itemCart.innerHTML = `
    <div class="cart-row">
    <div class="shopping-image cart-col cart-p-4">
    <img src= ${src}>
  </div>
  <div class="shoppping-infor cart-col cart-p-4">
    <span class="prodcut-name information">
      <h1 class="item-name">
        ${name}
      </h1>
    </span>
    <span class="product-price information">
    <p class="item-price">${price}</p>
    </span>
  </div>
  <span class="item-button cart-col cart-p-4">
    <i class="fa-solid fa-trash-can"></i>
    <span class="item-button_quanlity">
      <button class="increase ">-</button>
      <span class="item-quanlity">1</span>
      <button class="grow">+</button>
  </span>
    </div>
  `;
  shopList.appendChild(itemCart);
  shopList.querySelectorAll(".item-button i").forEach((item) => {
    item.addEventListener("click", removeItem);
  });
  shopList.querySelectorAll(".grow").forEach((item) => {
    item.addEventListener("click", growing);
  });
  shopList.querySelectorAll(".increase").forEach((item) => {
    item.addEventListener("click", lowing);
  });
}
// Update cart
function cartTotal() {
  var totalMoney = 0;
  var shopList = document.querySelector(".shop-item");
  var shopItem = shopList.querySelectorAll(".shopping-item");
  var product_price = document.querySelectorAll(".information .item-price");
  shopItem.forEach((item) => {
    var priceItem = item.querySelector(".product-price p");
    var itemQuanlity = item.querySelector(
      ".item-button_quanlity .item-quanlity"
    );
    var curentQuanlity = itemQuanlity.innerText * 1;
    var price = parseFloat(priceItem.textContent.replace("$", ""));
    totalMoney += price * curentQuanlity;
  });
  total.innerText = "$" + Math.round(totalMoney * 100) / 100;
}
// Buy product
function createError() {
  const error = document.createElement("div");
    error.className = "shopping-noti notification";
    error.innerHTML = `<i class="search-icon_noti noti-shopping fa-solid fa-circle-exclamation"></i>
    <span class="search-noti_title">
      <h4 class="search-noti_name">Error!</h4>
      <p class="search-noti_phara">You should buy something! Please</p>
    </span>
    <i class="noti_close fa-solid fa-xmark"></i>
    <div class="count-down noti-shop-count"></div>`;
    handleNoti.appendChild(error);
    updateNoti().errorNoti.forEach((item) => {
      item.style.animation = "show_noti 3s ease forwards";
      setTimeout(() => {
        item.style.animation = "hide_noti 3s ease forwards";
        setTimeout(() => {
          handleNoti.removeChild(item);
        }, 5500);
      }, 5000);
    });
    closeNotifi();
    return;
}

function doneBuy() {
  const bought = document.createElement("div");
  bought.className = "bought-noti notification";
  bought.innerHTML = ` <i class="search-icon_noti noti-bought fa-solid fa-cart-shopping"></i>
  <span class="search-noti_title">
    <h4 class="search-noti_name">Done</h4>
    <p class="search-noti_phara">Thank for your purchase!</p>
  </span>
  <i class="noti_close fa-solid fa-xmark"></i>
  <div class="count-down noti-done-count"></div>`;
  handleNoti.appendChild(bought);
  updateNoti().boughtNoti.forEach((item) => {
    item.style.animation = "show_noti 3s ease forwards";
    setTimeout(() => {
      item.style.animation = "hide_noti 3s ease forwards";
      setTimeout(() => {
        handleNoti.removeChild(item);
      }, 5500);
    }, 5000);
  });

}
var curentList;
var curentItemQuanlity;
function buyNowbtnClick() {
  curentItemQuanlity = document.querySelector('.quanlity-cart').innerText;
  var listProduct = document.querySelectorAll(".shop-item .shopping-item");
  var cart_num = document.querySelector(".quanlity-cart");
  if (listProduct.length == 0) {
    createError();
  } else {
    doneBuy();
    closeNotifi();
    cart_num.innerText = 0;
    var localListItem = [...listProduct].map((item) => {
      return {
        itName: item.querySelector(".item-name").textContent,
        itPrice: item.querySelector(".product-price p").textContent,
      };
    });
    localStorage.setItem("list", JSON.stringify(localListItem));
    curentList = document.querySelector(".shop-item").innerHTML;
    while (shopList.hasChildNodes()) {
      shopList.removeChild(shopList.firstChild);
    }
    cartTotal();
    smooth();
  }
  buy_cart.style.transform = 'translateX(200%)';
}
// loader + nextPage
const loader = () => {
  var load = document.querySelector(".load-container") 
  load.classList.add("load-hiden");
}
function load() {
  setTimeout(loader, 3000);
}
window.onload = load();
// Responsive on tablet, mobile close
iconnavi.addEventListener("click", function () {
  if (nav.style.transform === "translateY(0px)") {
    nav.style.transform = "translateY(-200%)";
    changeIcon.className = "fa-solid fa-bars";
  } else {
    nav.style.transform = "translateY(0)";
    changeIcon.className = "fa-solid fa-xmark";
    changeIcon.style.fontSize = 20 + "px";
    changeIcon.style.fontWeight = "bolder";
  }
});
// Handle remove noti

// HandleNavlist
navList.forEach((item) => {
  item.addEventListener("click", function () {
    nav.style.transform = "translateY(-200%)";
    changeIcon.className = "fa-solid fa-bars";
  });
});
// buy validator
function BuyValidator(e) {
  function Validator(inputElement, rule) {
    var errorElement =
      inputElement.parentElement.querySelector(".form-message");
    var errorMessage;
    var rules = selectorRules[rule.selector];

    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("form-error");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("form-error");
    }

    return !errorMessage;
  }
  var formElement = document.querySelector(e.form);
  var selectorRules = {};
  if (formElement) {
    formElement.onsubmit = (op) => {
      
      op.preventDefault();

      var isFormValid = true;

      e.rules.forEach((rule) => {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = Validator(inputElement, rule)
        if(!isValid) {
          isFormValid = false;  
        }
      })
      if(isFormValid) {
        var inputData = formElement.querySelectorAll('[name]');
        if(typeof e.onsubmit === 'function') {
          var formValues = Array.from(inputData).reduce((values, input) => {
            return (values[input.name] = input.value) && values;
        }, {})
        e.onsubmit(formValues);
        }
        Array.from(inputData).forEach(item => {
          item.value = '';
        })

      }
    };
    e.rules.forEach((rule) => {
      var inputElement = formElement.querySelector(rule.selector);
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.check);
      } else {
        selectorRules[rule.selector] = [rule.check];
      }
      if (inputElement) {
        inputElement.onblur = () => {
          Validator(inputElement, rule);
        };
        inputElement.oninput = () => {
          var errorElement =
            inputElement.parentElement.querySelector(".form-message");
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("form-error");
        };
      }
    });
  }
}

// Error => return message error
// Not error => return undefined
BuyValidator.isRequired = (selector) => {
  return {
    selector: selector,
    check: function (value) {
      return value.trim() ? undefined : `You need to fill this form`;
    },
  };
};
BuyValidator.isNumber = (selector) => {
  return {
    selector: selector,
    check: function (value) {
      return (typeof value === "number" ||
        (typeof value === "string" && value.trim() !== "")) &&
        !isNaN(value)
        ? undefined
        : "This fill must be number";
    },
  };
};
BuyValidator({
  form: "#form-order",
  rules: [
    BuyValidator.isRequired("#fullname"),
    BuyValidator.isRequired("#number"),
    BuyValidator.isNumber("#number"),
    BuyValidator.isRequired("#address"),
    BuyValidator.isRequired("#message"),
  ],
  onsubmit: function (data) {
    localStorage.setItem('userdata', JSON.stringify(data));
    doneBuy();
  },
});

// Lay dia chi hien tai
const localtionBtn = document.querySelector(".address-localtion");
const inputAddress = document.getElementById("address");
localtionBtn.addEventListener('click', (e) => {
  getlocal();
  e.preventDefault();
});
function getlocal() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}

function showPosition(pos) {
  var coord = pos.coords;
  var long = coord.longitude;
  var lat = coord.latitude;
  var latlog = new google.maps.LatLng(lat, long);
  const mapImg = document.querySelector('.mapImg');
  mapImg.style.height = '350px';
  mapImg.style.width = '60%';
  var localOptions = {
    center: latlog,
    zoom: 9,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
  };
  var map = new google.maps.Map(mapImg, localOptions);
  var marker = new google.maps.Marker({position: latlog,map: map});
  var geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + long + '&language=en';
 
}
function showError(pos) {
  alert("Have an error!");
};

// Continue shopping
const ordermore = document.querySelector('.order-now');
ordermore.addEventListener('click', function () {
  if(curentList == undefined) {
    createError();
    buy_cart.style.transform = 'translateX(200%)';
    return;
  } else {
    document.querySelector('.quanlity-cart').innerText = curentItemQuanlity;
    shopList.innerHTML = curentList;
    const delete_item = document.querySelectorAll(".item-button i");
    cartTotal();
    Array.from(delete_item).forEach((item) => {
      item.addEventListener('click', function () {
        var cart_num = document.querySelector(".quanlity-cart");
        var quanlityCart = parseInt(cart_num.textContent);
        cart_num.innerText = --quanlityCart;
        item.parentElement.parentElement.parentElement.remove();
        cartTotal();
      })
    });
    render();
  }
})  
