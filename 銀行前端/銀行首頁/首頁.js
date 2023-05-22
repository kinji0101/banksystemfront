function checkPassword() {
  var passwordInput = document.getElementById("password");
  var passwordValue = passwordInput.value;
  if (passwordValue === "abc123") {
    redirectToNewCustomerPage();
  } else {
    alert("密碼錯誤，請重新輸入！");
    passwordInput.value = "";
  }
}

function redirectToNewCustomerPage() {
  window.location.href = "./新增客戶.html";
}


document.addEventListener("keydown", function(event) {
  var keycode = event.keyCode || event.which;
  if (keycode === 13) {
    
    checkPassword();
    event.preventDefault();
  }
});

window.addEventListener('popstate', function(event) {

  window.location.href = "./首頁.html";
});

