document.addEventListener('DOMContentLoaded', function() {
    const box1Element = document.querySelector('.box1');
    const card = sessionStorage.getItem('card');
    const password = sessionStorage.getItem('password');
    // 提款按钮点击事件处理程序
    function handleWithdrawal() {
      const withdrawalAmount = document.getElementById('card').value;
      const password = document.getElementById('password').value;
      if (withdrawalAmount.trim() === "") {
        function alert(){
          Swal.fire(
            "請確實輸入提款金額"
          )
        }
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
          box1Element.innerHTML =  `
          <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-template/8abcc93d8321c0f66898765c6694b19c.png"  class="img4">
          <h1>${checkData.message}</h1>
          <a href="./indexwithdraw.html">
          <button type="button" class="btn btn-primary btn-sm">重新提款</button>
          </a>
          `;
        } else if (checkData.message === "提款金額不合法" || checkData.message === "提款失敗") {
          // 显示提款失败的消息
          box1Element.innerHTML = `
          <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-template/8abcc93d8321c0f66898765c6694b19c.png"  class="img4">
          <h1>${checkData.message}</h1>
          <a href="./indexwithdraw.html">
          <button type="button" class="btn btn-primary btn-sm">重新提款</button>
          </a>
          `;
        } else if (checkData.message === "帳號錯誤或密碼錯誤!") {
          // 显示提款失败的消息
          box1Element.innerHTML = `
          <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-template/8abcc93d8321c0f66898765c6694b19c.png"  class="img4">
          <h5>${checkData.message}</h5>
          <a href="./indexwithdraw.html">
          <button type="button" class="btn btn-primary btn-sm">重新提款</button>
          </a>
          `;
        }else {
          // 提款成功，显示提款成功和计算后的余额
          const newBalance = checkData.message;
          box1Element.innerHTML = `
          <img src="https://memeprod.ap-south-1.linodeobjects.com/user-template/9850b5f286800870441315b842bbb3af.png" class="img3">
          <h5 class="card-title">系統訊息:提款成功</h5>
          <p>您的帳戶餘額:${newBalance}</p>
          <div class = returnBotton>
          <a href="./indexwithdraw.html">
          <button type="button" class="btn btn-primary btn-sm">重新提款</button>
          </a>
          <div class="col">
          <a href="https://kinji0101.github.io/banksystemfront/index.html">
          <button type="button" class="btn btn-primary btn-sm ">返回首頁</button>
          </a>
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
  
        if (!card ) {
          box1Element.innerHTML = `
            <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1670302308075.jpg" class="img2">
            <h5 class="left">請先登錄喔</h5>
            <a href="https://kinji0101.github.io/banksystemfront/indexLogIn.html">
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
            <h3>您好，${name}，請在下面輸入提款金額</h3>
            <label for="card">提款金額</label>
            <input id="card" type="number" placeholder="提款金額" oninput="limitNumberLength(this, 9)">
            <label for="password">再次確認密碼</label>
            <input id="password" type="passsword" placeholder="請輸入密碼" oninput="limitNumberLength(this, 9)">
            <button id="registerButton">提款</button>
            <a href="https://kinji0101.github.io/banksystemfront/index.html">
            <h5 class="right">返回首頁</h5>
            </a>
            <p id="loginInfo"></p>
          `;
          const registerButton = document.getElementById('registerButton');
          registerButton.addEventListener('click', handleWithdrawal);
        }
      });
  });
  function limitNumberLength(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }