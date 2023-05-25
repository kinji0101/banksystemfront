const account = sessionStorage.getItem("account");
const password = sessionStorage.getItem("password");

// 檢查使用者是否已登入
if (!account || !password) {
  // 如果未登入，重新導向到登入頁面
  window.location.href = "./首頁.html";
}

const btn1 = document.getElementById("btn1");
const input1 = document.getElementById("input1");

btn1.addEventListener("click", sendData);

input1.addEventListener("keydown", function(event) {
  const keycode = event.keyCode || event.which;
  if (keycode === 13) {
    sendData();
    event.preventDefault();
  }
});

function sendData() {
  const body = {
    card: input1.value
  };

  fetch("http://localhost:8080/find_by_card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      const message = JSON.stringify(data, null, 2);
      console.log(data);
      alert(message);
    })
    .catch(err => console.log(err));

  input1.value = "";
}

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