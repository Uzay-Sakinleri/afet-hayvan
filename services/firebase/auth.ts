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
  authModal
} from "@ts/authModal";

const env = import.meta.env;
// HTML Elements
const providerButtons = providerArea.querySelectorAll("button");
// Initialize auth instances
const auth = getAuth(app);
auth.useDeviceLanguage();
// Start emulator if env is development
if(env.PROD)
connectAuthEmulator(auth, "http://localhost:9099");
// Login with third party providers
providerButtons.forEach(e => e.addEventListener("click", function(this) { popUpper(this.id) }));

async function popUpper(id: string) {
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
    authModal.classList.replace("grid", "hidden");

  }
  catch (e) {
    console.error(e)
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
      this.querySelectorAll("input").forEach(e => e.value = "");
      authModal.classList.replace("grid", "hidden");
    }
    else {
      // Going to add error and display from the form with some spans but for now, just alert the user.
      alert("Email adresinizi doğrulamamışsınız. Lütfen email adresinizi doğruladıktan sonra giriş yapınız.");
      signOut(auth);
    }
  }
  catch (e) {
    console.error(e);
  }
});

registerForm.addEventListener("submit", async function(this, e) {
  e.preventDefault();
  const email = this.querySelector<HTMLInputElement>("#u_email_register").value;
  const password = this.querySelector<HTMLInputElement>("#u_password_register").value;
  const passwordRepeat = this.querySelector<HTMLInputElement>("#u_password_repeat_register").value;
  if (!(password === passwordRepeat))
    // Going to add validation error messages and more validation. For now, just alert the user.
    alert("Şifre ve Şifre Doğrulama'nız aynı değil, lütfen tekrardan kontrol edin.");
  else {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      authModal.classList.replace("grid", "hidden");
      await sendEmailVerification(credentials.user);
      this.querySelectorAll("input").forEach(e => e.value = "");
      await signOut(auth);
    }
    catch (e) {
      console.error(e);
    }
  }
});
