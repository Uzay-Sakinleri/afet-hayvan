function firebaseErrorHandler(e: any | any[]): string {
    const y: string[] = e.code.split("auth/");
    const regex = /[()\\.]/g
    const z: string = y.join("").replace(regex, "");
    return z;
}

export function displayError(e: any | any[], form: HTMLFormElement, provider?:string): void {
    let errorElem: HTMLSpanElement;
    let finalRes: string = e.message;
    if (e.name === "FirebaseError")
        finalRes = firebaseErrorHandler(e);

    if (!form.querySelector(".error")) {
        errorElem = document.createElement("span");
        errorElem.classList.add("error", "result");
    }
    else {
        errorElem = form.querySelector(".error");
    }
    switch (finalRes) {
        case "invalid-email":
            errorElem.innerText = "Geçersiz e-mail ve şifre kullandınız";
            break;
        case "email-or-and-password-missing":
            errorElem.innerText = "Girdiğiniz bilgilerde eksik var, lütfen kontrol ediniz"
            break;
        case "password-passwordrepeat-not-same":
            errorElem.innerText = "Şifre ve Şifre Doğrulama'nız aynı değil, lütfen tekrardan kontrol ediniz"
            break;
        case "weak-password":
            errorElem.innerText = "Şifreniz en az 6 karakterden oluşmalıdır";
            break;
        case "email-not-verified":
            errorElem.innerText = "Email adresinizi henüz onaylamamışsınız. Lütfen onayladıktan sonra tekrar deneyin"
            break;
        case "email-already-in-use":
        errorElem.innerText = "Girdiğiniz bilgilere ait bir kullanıcı zaten bulunmaktadır"
            break;
        case "user-not-found":
        case "wrong-password":
        errorElem.innerText = "Aradığınız bilgilere sahip bir kullanıcı bulunamamıştır"
            break;
        case "popup-closed-by-user":
        errorElem.innerText = `${provider[0].toUpperCase()}${provider.slice(1)} ile yapmaya çalıştığınız girişte bir sorun oluştu`
            break;
        default:
            errorElem.innerText = "Beklenmedik bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz";
    }
    form.prepend(errorElem);
}

export function displayGoodResult(form: HTMLFormElement, type: string): void {
    let resultSpan: HTMLSpanElement = form.querySelector(".error");
    if (!resultSpan) {
        resultSpan = document.createElement("span");
        resultSpan.classList.add("succes", "result");
    }
    else {
        resultSpan.classList.replace("error", "succes");
    }

    switch (type) {
        case "register": 
            resultSpan.innerText = "Hesabınız başarıyla yaratılmıştır, lütfen hesabınıza gönderilen mail üzerinden hesabınızı onaylayınız."
            break;
        case "login": 
            resultSpan.innerText = "Başarıyla giriş yaptınız, uygulamamızı kullanmaya devam edebilirsiniz";
            break;
    }
    form.prepend(resultSpan);
}
