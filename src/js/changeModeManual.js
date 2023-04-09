const docElem = document.documentElement;
const icon = docElem.querySelector("#change-mode-icon");
docElem.querySelector("#icon-btn").addEventListener("click", () => {
  if(docElem.classList.contains("dark")) {
    docElem.classList.remove("dark");
    icon.classList.replace("fa-solid", "fa-regular");
    icon.classList.replace("fa-moon", "fa-sun");
  }
  else {
    docElem.classList.add("dark");
    icon.classList.replace("fa-regular", "fa-solid");
    icon.classList.replace("fa-sun", "fa-moon");
  }
})
