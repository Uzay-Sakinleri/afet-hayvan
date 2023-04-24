const loginBtn = document.querySelector<HTMLButtonElement>("#login_btn");
const authModal = document.querySelector<HTMLDivElement>("#auth_modal");
const closeModal = document.querySelector<HTMLSpanElement>("#close_modal");
loginBtn.addEventListener("click", () => {
    authModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    authModal.classList.add("hidden");
});

document.addEventListener("click" ,(e:MouseEvent) => {
    if(e.target === authModal)
    authModal.classList.add("hidden");
})
