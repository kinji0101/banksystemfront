// 获取账户和密码
const account = sessionStorage.getItem("account");
const password = sessionStorage.getItem("password");

// 检查用户是否已登录
if (!account || !password) {
  // 如果未登录，重新导向到登录页面
  window.location.href = "./首頁.html";
}

// 获取输入框元素
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

// 获取按钮元素
let btn1 = document.querySelector("#btn1");

// 点击按钮的逻辑
function handleButtonClick() {
  let body = {
    "bank_list": [{
      "card": inputs[0].value,
      "name": inputs[1].value,
      "address": inputs[2].value,
      "account": inputs[3].value,
      "password": inputs[4].value,
      "email": inputs[5].value,
      "phoneNumber": inputs[6].value,
      "deposit": inputs[7].value,
      "depositRate": inputs[8].value,
      "offer": inputs[9].value
    }]
  };

  fetch("http://localhost:8080/update_client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      const message = JSON.stringify(data, null, 2);
      console.log(data);
      alert(message);
      inputs.forEach(input => (input.value = ""));
    })
    .catch(err => console.log(err));
}

// 按钮点击事件监听器
btn1.addEventListener("click", handleButtonClick);

// 按下 Enter 键的逻辑
function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleButtonClick();
  }
}

// input 元素的键盘事件监听器
inputs.forEach(input => {
  input.addEventListener("keydown", handleEnterKey);
});

// 监听退出按钮的点击事件
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function() {
  // 清除登录凭证，例如删除 Cookie 或清空 sessionStorage
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  sessionStorage.clear();

  // 禁用浏览器的后退功能
  history.pushState(null, null, location.href);
  window.onpopstate = function() {
    history.go(1);
  };

  window.location.href = "./首頁.html";
});