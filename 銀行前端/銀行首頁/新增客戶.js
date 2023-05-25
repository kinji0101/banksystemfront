
const account = sessionStorage.getItem("account");
const password = sessionStorage.getItem("password");

  // 檢查使用者是否已登入
if (!account || !password) {
  // 如果未登入，重新導向到登入頁面
  window.location.href = "./首頁.html";
}

let inputs = [
  document.querySelector("#input1"),
  document.querySelector("#input2"),
  document.querySelector("#input3"),
  document.querySelector("#input4"),
  document.querySelector("#input5"),
  document.querySelector("#input6"),
  document.querySelector("#input7"),
  document.querySelector("#input8"),
  document.querySelector("#input9"),
  document.querySelector("#input10")
];

inputs.forEach(function(input) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn1.click();
    }
  });
});

let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
  let input1 = document.querySelector("#input1");
  let input2 = document.querySelector("#input2");
  let input3 = document.querySelector("#input3");
  let input4 = document.querySelector("#input4");
  let input5 = document.querySelector("#input5");
  let input6 = document.querySelector("#input6");
  let input7 = document.querySelector("#input7");
  let input8 = document.querySelector("#input8");
  let input9 = document.querySelector("#input9");
  let input10 = document.querySelector("#input10");

  let body = {
    "bank_list": [{
      "card": input1.value,
      "name": input2.value,
      "address": input3.value,
      "account": input4.value,
      "password": input5.value,
      "email": input6.value,
      "phoneNumber": input7.value,
      "deposit": input8.value,
      "depositRate": input9.value,
      "offer": input10.value
    }]
  };

  fetch("http://localhost:8080/add_client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    const message = JSON.stringify(data, null, 2); 
    console.log(data);
    alert(message);
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
    input6.value = "";
    input7.value = "";
    input8.value = "";
    input9.value = "";
    input10.value = "";
  })
  .catch(err => console.log(err));
});

var logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function() {
  // 清除登入憑證，例如刪除Cookie或清空sessionStorage
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  sessionStorage.clear();

  window.location.href = "./首頁.html";
});

