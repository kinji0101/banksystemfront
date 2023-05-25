// 检查登录状态
const account = sessionStorage.getItem("account");
const password = sessionStorage.getItem("password")

if (account && password) {
  // 如果已登录，延迟 50 毫秒后跳转到新增客户页面
  setTimeout(function() {
    window.location.href = "./新增客戶.html";
  }, 50);
}

const input1 = document.querySelector("#account");
const input2 = document.querySelector("#password");

const btn1 = document.querySelector("#btn1");

function handleClick() {
  const account = input1.value;
  const password = input2.value;

  fetch("http://localhost:8080/login2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account: account,
      password: password
    }),
    credentials: "include"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      const checkData = JSON.parse(JSON.stringify(data));
      if (data.account) {
        sessionStorage.setItem("account", data.account);
        sessionStorage.setItem("password", password);
        // 登录成功，延迟 50 毫秒后跳转到新增客户页面
        setTimeout(function() {
          window.location.href = "./新增客戶.html";
        }, 50);
      } else if (checkData.message) {
        // 登录失败，显示警告并重新加载页面
        alert(checkData.message);
        location.reload();
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

btn1.addEventListener('click', handleClick);
input1.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // 阻止默认的提交行为
    handleClick();
  }
});
input2.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // 阻止默认的提交行为
    handleClick();
  }
});
