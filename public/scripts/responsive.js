const sideDrawerElement = document.getElementById("side-drawer");
const menuButtonElement = document.getElementById("menu-btn");

function openSideDrawer() {
  menuButtonElement.style.display = "block";
}
sideDrawerElement.addEventListener("click", openSideDrawer);
