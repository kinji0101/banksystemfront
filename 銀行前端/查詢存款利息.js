const card = sessionStorage.getItem("card");
const password = sessionStorage.getItem("password");

  // 檢查使用者是否已登入
if (!card || !password) {
  // 如果未登入，重新導向到登入頁面
  window.location.href = "https://kinji0101.github.io/banksystemfront/indexLogIn.html";
}


let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let input3 = document.querySelector("#input3");

let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
  let body = {
    "card": input1.value,
    "account": input2.value,
    "password": input3.value
  };

  fetch("http://localhost:8080/get_DepositRate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const message = JSON.stringify(data, null, 2);
      console.log(message);
      alert(message);
    })
    .catch(err => console.log(err));

  input1.value = "";
  input2.value = "";
  input3.value = "";
});

let inputs = [input1, input2, input3];  // 定义 inputs 数组

inputs.forEach(function(input) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn1.click();
    }
  });
});

var logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function() {
  // 清除登入憑證，例如刪除Cookie或清空sessionStorage
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  sessionStorage.clear();

  window.location.href = "https://kinji0101.github.io/banksystemfront/";
});