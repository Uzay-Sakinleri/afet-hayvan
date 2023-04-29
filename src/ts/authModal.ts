const closeModalRegister = document.querySelector<HTMLSpanElement>("#close_modal_register");
const closeModalLogin = document.querySelector<HTMLSpanElement>("#close_modal_login");
const registerFormBtn = document.querySelector<HTMLButtonElement>("#register_form_btn");
const loginFormBtn = document.querySelector<HTMLButtonElement>("#login_form_btn");
const loginBtn = document.querySelector<HTMLButtonElement>("#login_btn");

export const providerArea = document.querySelector<HTMLDivElement>("#provider_area");
export const loginForm = document.querySelector<HTMLFormElement>("#login_form");
export const registerForm = document.querySelector<HTMLFormElement>("#register_form");
export const authModal = document.querySelector<HTMLDivElement>("#auth_modal");
export const registerDiv = document.querySelector<HTMLDivElement>("#register_div");
export const loginDiv = document.querySelector<HTMLDivElement>("#login_div");

loginBtn.addEventListener("click", () => {
    authModal.classList.replace("hidden", "grid");
});

closeModalRegister.addEventListener("click", () => {
    authModal.classList.replace("grid", "hidden");
    registerForm.querySelectorAll("input").forEach(e => e.value = "");
    registerForm.querySelector(".result")?.remove();
});

closeModalLogin.addEventListener("click", () =>  {
    authModal.classList.replace("grid", "hidden");
    loginForm.querySelectorAll("input").forEach(e => e.value = "");
    loginForm.querySelector(".result")?.remove();
});

document.addEventListener("click", (e: MouseEvent) => {
    if (e.target === authModal)
        authModal.classList.replace("grid", "hidden");
});

registerFormBtn.addEventListener("click", () => {
    loginDiv.classList.replace("flex", "hidden");
    loginForm.querySelectorAll("input").forEach(e => e.value = "");
    loginForm.querySelector(".result")?.remove();
    registerDiv.classList.replace("hidden", "flex");
});

loginFormBtn.addEventListener("click", () => {
    registerDiv.classList.replace("flex", "hidden");
    registerForm.querySelectorAll("input").forEach(e => e.value = "");
    registerForm.querySelector(".result")?.remove();
    loginDiv.classList.replace("hidden", "flex");
});
