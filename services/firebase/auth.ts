import app from "./firebase";
import {
  connectAuthEmulator,
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import {
  providerArea,
  loginForm,
  registerForm,
  authModal,
  registerDiv,
  loginDiv
} from "@ts/authModal";

import { displayError, displayGoodResult } from "@utils/firebaseResultHandler";

const env = import.meta.env;
// HTML Elements
const providerButtons = providerArea.querySelectorAll("button");
// Initialize auth instances
const auth = getAuth(app);
auth.useDeviceLanguage();
// Start emulator if env is development
if (env.DEV)
  connectAuthEmulator(auth, "http://localhost:9099");
// Login with third party providers
providerButtons.forEach(e => e.addEventListener("click", function(this) { popUpper(this.form,this.id) }));

async function popUpper(form:HTMLFormElement, id: string) {
  const provider = id.substring(id.indexOf("_"), -1);
  let provInstance: FacebookAuthProvider | GoogleAuthProvider | OAuthProvider | TwitterAuthProvider;
  switch (provider) {
    case "facebook": provInstance = new FacebookAuthProvider(); break;
    case "microsoft": provInstance = new OAuthProvider("microsoft.com"); break;
    case "twitter": provInstance = new TwitterAuthProvider(); break;
    case "google": provInstance = new GoogleAuthProvider(); break;
  }
  try {
    await signInWithPopup(auth, provInstance);
    displayGoodResult(form, "login");
    setTimeout(() => {
    authModal.classList.replace("grid", "hidden");
    }, 5000);

  }
  catch (e) {
    displayError(e, loginForm, provider);
  }
}

// Login and Register with Email and Password
loginForm.addEventListener("submit", async function(this, e) {
  e.preventDefault();
  const email = this.querySelector<HTMLInputElement>("#u_email_login").value;
  const password = this.querySelector<HTMLInputElement>("#u_password_login").value;
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    if (credentials.user.emailVerified) {
      displayGoodResult(this, "login");
      setTimeout(() => {
        authModal.classList.replace("grid", "hidden");
        this.querySelectorAll("input").forEach(e => e.value = "");
        this.querySelector(".result").remove();
      }, 5000);
    }
    else {
      displayError(new Error("email-not-verified"), this);
      signOut(auth);
    }
  }
  catch (e) {
    displayError(e, this);
  }
});

registerForm.addEventListener("submit", async function(this, e) {
  e.preventDefault();
  const email = this.querySelector<HTMLInputElement>("#u_email_register").value;
  const password = this.querySelector<HTMLInputElement>("#u_password_register").value;
  const passwordRepeat = this.querySelector<HTMLInputElement>("#u_password_repeat_register").value;
  if (!(password === passwordRepeat))
    displayError(new Error("password-passwordrepeat-not-same"), this);
  else if (email == "" || password == "") {
    displayError(new Error("email-or-and-password-missing"), this);
  }
  else {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(credentials.user);
      displayGoodResult(this, "register");
      await signOut(auth);
      setTimeout(() => {
        registerDiv.classList.replace("flex", "hidden");
        loginDiv.classList.replace("hidden", "flex");
        this.querySelectorAll("input").forEach(e => e.value = "");
        this.querySelector(".result").remove();
      }, 5000);
    }
    catch (e) {
      displayError(e, this);
    }
  }
});
