const code = document.querySelector("#code");
const again = document.querySelector("#again");
const btn = document.querySelector("#btn");

const queryParams = getQueryParams();
const cardNum = queryParams.cardNum;
const account = queryParams.account;
const password = queryParams.password;
const name = queryParams.name;
const address = queryParams.address;
const email = queryParams.email;
const phoneNumber = queryParams.phoneNumber;

console.log(cardNum);
console.log(account);
console.log(email);


// 发送验证码
sendVerificationCode(email);


function disableResendButton() {
  const resendButton = document.getElementById('again');
  resendButton.disabled = true;
  resendButton.style.backgroundColor = 'lightgray';
  resendButton.style.cursor = 'not-allowed';
}

function enableResendButton() {
  const resendButton = document.getElementById('again');
  resendButton.disabled = false;
  resendButton.style.backgroundColor = '';
  resendButton.style.cursor = 'pointer';
}

function showResendButton() {
  const resendButton = document.getElementById('again');

  disableResendButton();

  let secondsLeft = 60;
  resendButton.textContent = `重新發送 (${secondsLeft}s)`;

  const timer = setInterval(() => {
    secondsLeft--;
    resendButton.textContent = `重新發送 (${secondsLeft}s)`;

    if (secondsLeft <= 0) {
      enableResendButton();
      resendButton.textContent = '重新發送';
      clearInterval(timer);
    }
  }, 1000);
}

again.addEventListener('click', function () {
  // 重新发送验证码的逻辑
  sendVerificationCode(email);
  showResendButton();
});

// 初始化页面时显示重新发送按钮
showResendButton();

// 发送验证码的函数
function sendVerificationCode(email) {
  fetch("http://localhost:8080/send-verification-code?email=" + encodeURIComponent(email))
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Verification code sent successfully");
      } else {
        console.log("Failed to send verification code");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      console.log("Failed to send verification code");
    });
}


function getQueryParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const params = {};

  for (const [key, value] of urlParams) {
    params[key] = value;
  }

  return params;
}

// 提交验证
btn.addEventListener("click", function (event) {
  event.preventDefault(); // 阻止表单提交的默认行为

  const codeValue = code.value;
  console.log(email);
  console.log(codeValue);


  fetch("http://localhost:8080/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      code: codeValue,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success === true) {
        // 验证成功
        alert("驗證成功");
        // 发送请求将数据存入数据库
        fetch("http://localhost:8080/add_client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardNum: cardNum,
            account: account,
            password: password,
            name: name,
            address: address,
            email: email,
            phoneNumber: phoneNumber,
          }),
        })
          .then(response => response.json())
          .then(data => {
            alert("註冊成功");
            window.location.href = "首頁連結"
          })
          .catch(error => {
            console.error("Error:", error);
            alert("註冊失敗");
          });

      } else {
        // 验证失败
        alert("驗證失敗，請檢查驗證碼");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("提交失敗");
      // 在页面上显示失败消息或执行其他操作
    });
});
