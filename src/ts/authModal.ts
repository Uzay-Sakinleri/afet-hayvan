const closeModalRegister = document.querySelector<HTMLSpanElement>("#close_modal_register");
const closeModalLogin = document.querySelector<HTMLSpanElement>("#close_modal_login");
const registerFormBtn = document.querySelector<HTMLButtonElement>("#register_form_btn");
const loginFormBtn = document.querySelector<HTMLButtonElement>("#login_form_btn");
const registerDiv = document.querySelector<HTMLDivElement>("#register_div");
const loginDiv = document.querySelector<HTMLDivElement>("#login_div");
const loginBtn = document.querySelector<HTMLButtonElement>("#login_btn");

export const providerArea = document.querySelector<HTMLDivElement>("#provider_area");
export const loginForm = document.querySelector<HTMLFormElement>("#login_form");
export const registerForm = document.querySelector<HTMLFormElement>("#register_form");
export const authModal = document.querySelector<HTMLDivElement>("#auth_modal");

loginBtn.addEventListener("click", () => {
    authModal.classList.replace("hidden", "grid");
})

closeModalRegister.addEventListener("click", () => {
    authModal.classList.replace("grid", "hidden");
});

closeModalLogin.addEventListener("click", () => {
    authModal.classList.replace("grid", "hidden");
});

document.addEventListener("click", (e: MouseEvent) => {
    if (e.target === authModal)
        authModal.classList.add("hidden");
});

registerFormBtn.addEventListener("click", () => {
    loginDiv.classList.replace("flex", "hidden");
    registerDiv.classList.replace("hidden", "flex");
});

loginFormBtn.addEventListener("click", () => {
    registerDiv.classList.replace("flex", "hidden");
    loginDiv.classList.replace("hidden", "flex");
});
