document.addEventListener('DOMContentLoaded', function() {
    const box1Element = document.querySelector('.box1');
    const card = sessionStorage.getItem('card');
    const password = sessionStorage.getItem('password');
    if (!card || !password) {
        box1Element.innerHTML = `
        <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1670302308075.jpg" class="img2" style="max-width: 100%; max-height: 100%;">
        <h5 class="left">請先登錄喔</h5>
        <a href="./indexLogin.html">
        <h5 class="right">登入頁面點這</h5>
        </a>
        <p id="loginInfo"></p>
        `;
        return; 
    }
    // 提款按钮点击事件处理程序
    function handleWithdrawal() {
      const withdrawalAmount = document.getElementById('card').value;

      if (withdrawalAmount.trim() === "") {
        alert("請輸入提款金額");
        return;
      }
  
      // 构造请求对象
      const request = {
        card: card,
        password: password,
        withdraw: parseFloat(withdrawalAmount)
      };
  
      // 发送提款请求
      fetch("http://localhost:8080/withdraw_By_Card_And_Password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));

        // 根据后端返回的提款结果进行判断和更新界面
        if (checkData.message === "請確實輸入卡號和密碼") {
          // 显示输入错误的消息
          box1Element.innerHTML = `
            <!-- 其他内容 -->
            <h5>${checkData.message}</h5>
          `;
        } else if (checkData.message === "提款金額不合法" || checkData.message === "提款失敗") {
          // 显示提款失败的消息
          box1Element.innerHTML = `
            <!-- 其他内容 -->
            <h5>${checkData.message}</h5>
          `;
        } else {
          // 提款成功，显示提款成功和计算后的余额
          const newBalance = checkData.message;
          box1Element.innerHTML = `
          <img src="https://memeprod.ap-south-1.linodeobjects.com/user-template/9850b5f286800870441315b842bbb3af.png" class="img3">
          <h5 class="card-title">系統訊息:提款成功</h5>
          <p>您的帳戶餘額:${newBalance}</p>
          <div class="row">
          <div class="col">
          <a href="./indexwithdraw.html">
          <button type="button" class="btn btn-primary btn-sm">重新轉帳</button>
          </a>
          </div>
          <div class="col">
          <a href="./indexHome.html">
          <button type="button" class="btn btn-primary btn-sm ">返回首頁</button>
          </a>
          </div>
          </div>
          `;
          }
        });
    }
  
    fetch("http://localhost:8080/withdraw_By_Card_And_Password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card: card,
        password: password
      }),
      credentials: "include"
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
        else if (card && password) {
          const name = sessionStorage.getItem("name");
          const deposit = sessionStorage.getItem("deposit");
          box1Element.innerHTML = `
            <img src="https://memeprod.sgp1.digitaloceanspaces.com/meme/817894494ed01f636cfd853bb25dcdf3.png" class="img1">
            <h5>您好，${name}，請在下面輸入提款金額</h5>
            <label for="card">提款金額</label>
            <input id="card" type="number" placeholder="提款金額">
            <button id="registerButton">提款</button>
            <a href="./index.html">
            <h5 class="right">滾回首頁</h5>
            </a>
            <p id="loginInfo"></p>
          `;
          const registerButton = document.getElementById('registerButton');
          registerButton.addEventListener('click', handleWithdrawal);
        }
      });
  });
  