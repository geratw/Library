const rects = document.querySelectorAll(".target rect");
const images = document.querySelectorAll(".gallery_element");
const imagePaths = ["images/image_1.png", "images/image_2.png", "images/image_3.png", "images/image_4.png", "images/image_5.png"];
const btns = document.querySelectorAll(".target");

btns.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    images.forEach(function (image, imageIndex) {
      image.style.transition = "opacity 0.3s ease";
      image.style.opacity = "0";
      setTimeout(function () {
        image.src = imagePaths[imageIndex + index];
        image.style.opacity = "1";
      }, 300);
    });

    rects.forEach(function (rect) {
      rect.setAttribute("fill", "#0C0C0E");
    });

    this.querySelector("rect").setAttribute("fill", "#BB945F");
  });
});

const currentImage = document.getElementById("current-image");

const matchForFirst = currentImage.src.substring(currentImage.src.lastIndexOf("/") + 1).match(/\d+/);
const colorLeftArrow = document.getElementById("color-left-arrow");
const colorRightArrow = document.getElementById("color-right-arrow");

const digit = parseInt(matchForFirst[0]);
if (digit < 2) {
  colorLeftArrow.style.display = "none";
}

function handleArrowClick(increment) {
  const filename = currentImage.src.substring(currentImage.src.lastIndexOf("/") + 1);
  const match = filename.match(/\d+/);

  if (match) {
    const digit = parseInt(match[0]);
    if ((increment === 1 && digit > 4) || (increment === -1 && digit < 2)) {
      return;
    }
    const incrementedDigit = digit + increment;
    const newString = filename.replace(match[0], incrementedDigit);
    currentImage.setAttribute("src", `images/${newString}`);
    colorLeftArrow.style.display = increment === -1 ? (digit > 2 ? "block" : "none") : "block";
    colorRightArrow.style.display = increment === 1 ? (digit < 4 ? "block" : "none") : "block";
  }
}

const rightArrow = document.querySelector(".right_arrow");
rightArrow.addEventListener("click", () => handleArrowClick(1));

const leftArrow = document.querySelector(".left_arrow");
leftArrow.addEventListener("click", () => handleArrowClick(-1));

// -------------------------------btn buy book-------------------------------

// -------------------------------Favorites-------------------------------

const radios = document.querySelectorAll(".radio_input");
const favoritesTops = document.querySelectorAll(".favorites_top");

function handleRadioChange(event) {
  const selectedSeason = event.target.value;
  favoritesTops.forEach((top) => {
    if (top.id === selectedSeason) {
      top.classList.remove("inactive");
      top.classList.add("active");
    } else {
      top.classList.add("inactive");
      top.classList.remove("active");
    }
  });
}

radios.forEach((radio) => {
  radio.addEventListener("change", handleRadioChange);
});

// -------------------------------burger-------------------------------

const burgerToggle = document.getElementById("burger_toggle");
const exitBurgerToggle = document.getElementById("exit_burger_toggle");
const burgerMenuAll = document.querySelector(".burger_menu_all");

burgerToggle.addEventListener("click", function () {
  const currentDisplay = getComputedStyle(burgerMenuAll).display;
  if (currentDisplay === "grid") {
    burgerMenuAll.style.display = "none";
  } else {
    burgerMenuAll.style.display = "grid";
  }
});

exitBurgerToggle.addEventListener("click", function () {
  burgerMenuAll.style.display = "none";
});

// -------------------------------icon_user-------------------------------
const userShow = document.querySelector(".icon_user_container");
const profile = document.querySelector(".profile");

userShow.addEventListener("click", function () {
  const currentDisplay = getComputedStyle(profile).display;
  if (currentDisplay === "block") {
    profile.style.display = "none";
  } else {
    profile.style.display = "block";
  }
});

const loginIn = document.getElementById("log-in");
const registerIn = document.getElementById("register");
const loginShow = document.querySelector(".login-menu");
const overlay = document.querySelector(".overlay");
const Reg = document.querySelector(".register-menu");
const linkNoAccount = document.querySelector(".link-no-account");
const linkHaveAccount = document.querySelector(".link-have-account");
const btnLog = document.querySelector(".btn_log");
const btnSing = document.querySelector(".btn_sing");

function register() {
  const computedStyle = getComputedStyle(overlay);
  if (computedStyle.display === "none") {
    localStorage.setItem("isLoggedIn", "true")
    Reg.style.display = "block";
    overlay.style.display = "block";
  }
}

registerIn.addEventListener("click", register);
btnSing.addEventListener("click", register);

function login() {
  const computedStyle = getComputedStyle(overlay);
  if (computedStyle.display === "none") {
    loginShow.style.display = "block";
    overlay.style.display = "block";
  }
}

btnLog.addEventListener("click", login);
loginIn.addEventListener("click", login);

linkHaveAccount.addEventListener("click", function () {
  Reg.style.display = "none";
  loginShow.style.display = "block";
});

linkNoAccount.addEventListener("click", function () {
  Reg.style.display = "block";
  loginShow.style.display = "none";
});

// close
const closeLog = document.getElementById("close");
const closeReg = document.getElementById("close-register");
const closeMyProfile = document.getElementById("close-my-profile");

closeLog.addEventListener("click", function () {
  overlay.style.display = "none";
  loginShow.style.display = "none";
});

closeReg.addEventListener("click", function () {
  overlay.style.display = "none";
  Reg.style.display = "none";
});

// -------------------------------login-------------------------------
const loginForm = document.querySelector(".login-form");
let counterLogins = localStorage.getItem("loginCount");

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".register-form");

  registerForm.onsubmit = (event) => {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const passwordReg = document.getElementById("password").value;
    const emailRegister = document.getElementById("email-reguster").value;

    let valueReg = localStorage.getItem("loginCount");
    valueReg === null ? (valueReg = 0) : (valueReg = parseInt(valueReg));
    valueReg++;
    localStorage.setItem("loginCount", valueReg);

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("username", emailRegister);
    localStorage.setItem("password", passwordReg);

    location.reload();
  };
});

loginForm.onsubmit = (event) => {
  counterLogins === null ? (counterLogins = 0) : (counterLogins = parseInt(counterLogins));
  counterLogins++;
  event.preventDefault();
  const username = document.getElementById("email-login").value;
  const passwordLog = document.getElementById("Password-login").value;
  if (username === localStorage.getItem("username") && passwordLog === localStorage.getItem("password")) {
    localStorage.setItem("loginCount", counterLogins);
    localStorage.setItem("isLoggedIn", "true");
    location.reload();
  } else {
    Swal.fire({
      title: "Invalid Login or Password",
      text: "Please check your login and password and try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
  setTimeout(() => {}, 1000);
};

const logOut = document.getElementById("log-out");

logOut.addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("countBook", 0);
  location.reload();
});

const headInput = document.querySelector(".head-input");
const headInputLogin = document.querySelector(".head-input-login");
const getCardHead = document.querySelector(".get_card");
const getCardDiscription = document.querySelector(".discription_get_card");

const btnProfile = document.querySelector(".btn_profile");

if (localStorage.getItem("isLoggedIn") === "true") {
  headInput.style.display = "none";
  headInputLogin.style.display = "flex";
  getCardHead.innerHTML = "Visit your profile";
  getCardDiscription.innerHTML = `With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.`;
  btnLog.style.display = "none";
  btnSing.style.display = "none";
  btnProfile.style.display = "block";
} else {
  headInput.style.display = "flex";
  headInputLogin.style.display = "none";
}

// my profile --------------------
const openMyProfile = document.getElementById("my-profile");
const myProfile = document.querySelector(".my-profile");
const btnMyProfile = document.querySelector(".btn_profile");

function openMyProfileShow() {
  myProfile.style.display = "grid";
  overlay.style.display = "block";
}

btnMyProfile.addEventListener("click", openMyProfileShow);

openMyProfile.addEventListener("click", openMyProfileShow);

closeMyProfile.addEventListener("click", function () {
  overlay.style.display = "none";
  myProfile.style.display = "none";
});

//---------------------------Digital Library Cards-------------------------------------

const findCard = document.querySelector(".form-find-card");
const readerNameInMyProfile = "John Doe";
const cardNumberInMyProfile = "F00234030";
const btnCheckCard = document.querySelector(".btn_check_card");
const statusMyProfileInFind = document.querySelector(".status-my-profile-in-find");

findCard.onsubmit = (event) => {
  event.preventDefault();
  const readerNameSearch = document.getElementById("reader-name");
  const cardNumberSearch = document.getElementById("card-number");

  if (
    readerNameSearch.value === readerNameInMyProfile &&
    cardNumberSearch.value === cardNumberInMyProfile &&
    localStorage.getItem("isLoggedIn") === "true"
  ) {
    btnCheckCard.style.display = "none";
    statusMyProfileInFind.style.display = "grid";

    setTimeout(() => {
      location.reload();
    }, 10000);
  } else {
    readerNameSearch.value = "";
    cardNumberSearch.value = "";
  }
};

//---------------------------buy a library card-------------------------------------

const buyCard = document.querySelector(".buy-card");
const closeBuy = document.getElementById("close-buy-card");

closeBuy.addEventListener("click", function () {
  overlay.style.display = "none";
  buyCard.style.display = "none";
});

const copyCard = document.getElementById("copy-card-number");

const cardNumberForCopy = document.getElementById("card-number-for-copy").innerHTML;

copyCard.addEventListener("click", function () {
  navigator.clipboard.writeText(cardNumberForCopy);
  setTimeout(() => {
    Swal.fire({
      title: "Successfully copied!",
      text: "The text was copied to the clipboard.",
      icon: "success",
      confirmButtonText: "OK",
    });
  }, 10);
});

//---------------------------count visits-------------------------------------
const countVisits = document.getElementById("count-visits");
const countVisitsCard = document.getElementById("counter-visits-card");
countVisitsCard.innerHTML = localStorage.getItem("loginCount");
countVisits.innerHTML = localStorage.getItem("loginCount");

//--------------------------BUY A LIBRARY CARD--------------------------------------

const buyButtons = document.querySelectorAll(".btn_buy_book");
const buyCardSection = document.querySelector(".buy-card");

buyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (localStorage.getItem("isLoggedIn") === "false") {
      loginShow.style.display = "block";
      overlay.style.display = "block";
    } else {
      buyCardSection.style.display = "block";
      overlay.style.display = "block";
    }
  });
});

const countBookInner = document.querySelector(".discription-card-my-profile");

function toggleButton(button) {
  if (button.innerHTML === "Buy" && localStorage.getItem("isLoggedIn") === "true") {
    button.innerHTML = "Own";
    button.classList.remove("btn_buy_book");
    button.classList.add("btn_own_book");
    button.disabled = true;
    let counterBooks = localStorage.getItem("countBook");
    counterBooks === null ? (counterBooks = 0) : (counterBooks = parseInt(counterBooks));
    counterBooks++;
    localStorage.setItem("countBook", counterBooks);
    countBookInner.innerHTML = counterBooks;
    console.log("count books: " + localStorage.getItem("countBook"));
  }
}

console.log("status login: " + localStorage.getItem("isLoggedIn"));
console.log("first name: " + localStorage.getItem("firstName"));
console.log("last name: " + localStorage.getItem("lastName"));
console.log("username(email): " + localStorage.getItem("username"));
console.log("password: " + localStorage.getItem("password"));
console.log("login counter: " + localStorage.getItem("loginCount"));
console.log("count books: " + localStorage.getItem("countBook"));

overlay.addEventListener("click", () => {
  buyCardSection.style.display = "none";
  overlay.style.display = "none";
  Reg.style.display = "none";
  loginShow.style.display = "none";
  myProfile.style.display = "none";
});
