/*************** main nav btns ***************/
const closeMenu = document.getElementById("closeMenu");
const openMenu = document.getElementById("openMenu");
const mainNav = document.querySelector(".main-nav");

closeMenu.addEventListener("click", () => {
  mainNav.classList.remove("open");
});

openMenu.addEventListener("click", () => {
  mainNav.classList.add("open");
});
