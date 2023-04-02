const iconBtn = document.querySelector("#icon-btn").addEventListener("click", () => {
  const changeIcon  = document.querySelector("#change-mode-icon");
  const body = document.body;
  const loginBtn = document.querySelector("#login-btn");
  if(document.body.classList.contains("bg-[#EDECDF]")) {
  changeIcon.classList.remove("fa-regular", "fa-sun","text-black");
  changeIcon.classList.add("fa-solid", "fa-moon", "text-white");
  body.classList.replace("bg-[#EDECDF]", "bg-[#242423]");
  body.classList.add("text-white");
  body.classList.replace("border-black","border-white");
  loginBtn.classList.replace("bg-[#9DD4AB]" ,"bg-[#84C2B8]")
  }
  else {
  changeIcon.classList.remove("fa-solid", "fa-moon", "text-white");
  changeIcon.classList.add("fa-regular", "fa-sun", "text-black");
  body.classList.replace("bg-[#242423]", "bg-[#EDECDF]");
  body.classList.remove("text-white");
  body.classList.replace("border-white", "border-black");
  loginBtn.classList.replace("bg-[#84C2B8]" ,"bg-[#9DD4AB]")
  }
});
