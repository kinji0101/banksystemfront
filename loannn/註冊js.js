const card = document.querySelector("#cardNum");
const account = document.querySelector("#account");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const name = document.querySelector("#name");
const address = document.querySelector("#address");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phoneNumber");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {

  if (
    !card.value ||
    !account.value ||
    !password.value ||
    !confirmPassword.value ||
    !name.value ||
    !address.value ||
    !email.value ||
    !phoneNumber.value
  ) {
    alert("欄位有空");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("密碼和確認密碼不一致");
    return;
  }

  const registrationData = {
    cardNum: card.value,
    account: account.value,
    password: password.value,
    name: name.value,
    address: address.value,
    email: email.value,
    phoneNumber: phoneNumber.value
  };

  window.location.href = "http://127.0.0.1:5500/驗證.html" + "?email=" + encodeURIComponent(email.value) + "&" + Object.entries(registrationData).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
});