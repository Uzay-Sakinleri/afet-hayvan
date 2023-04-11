const docElem = document.documentElement;
const icon =  docElem.querySelector("#change-mode-icon");
if (localStorage.theme === "dark" || (!("theme" in localStorage) || window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  docElem.classList.add("dark");
  icon.classList.add("fa-solid", "fa-moon");
} else {
  icon.classList.add("fa-regular", "fa-sun");
}
