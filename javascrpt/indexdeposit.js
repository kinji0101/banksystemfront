document.addEventListener('DOMContentLoaded', function() {
  const box1Element = document.querySelector('.box1');
  const card = sessionStorage.getItem('card');
  const password = sessionStorage.getItem('password');
  const deposit = sessionStorage.getItem('deposit');
  fetch("http://localhost:8080/get_Deposit_By_Card_And_Password", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          card: card,
          password: password,
          deposit: deposit
      }),
      credentials: "include" // 或者 "same-origin"
  })
  .then(function(response) {
      return response.json();
      
  })
  .then(function(data) {
      const checkData = JSON.parse(JSON.stringify(data));
       if (!card || !password) {
          box1Element.innerHTML = `
            <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1670302308075.jpg" class="img2">
            <h5 class="left">請先登錄喔</h5>
            <a href="./indexLogIn.html">
              <h5 class="right">登入頁面點這</h5>
            </a>
            <p id="loginInfo"></p>
          `;
        }
      else if (checkData.message) {
          const name = sessionStorage.getItem("name");
          const deposit = sessionStorage.getItem("deposit")
          box1Element.innerHTML = `
          <img src="https://memeprod.sgp1.digitaloceanspaces.com/meme/817894494ed01f636cfd853bb25dcdf3.png" class="img1">
          <h5>歡迎回來${name}！</h5>
          <h5>您的帳戶餘額${checkData.message}</h5>
          <a href="https://kinji0101.github.io/banksystemfront/index.html">
          <h5 class="right">返回首頁</h5>
          </a>
          <p id="loginInfo"></p>
        `;
      }
  })
});