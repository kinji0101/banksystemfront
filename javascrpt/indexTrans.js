document.addEventListener('DOMContentLoaded', function() {
  const transferButton = document.getElementById('transferButton');
  const box1Element = document.getElementById('box1');
  const transInfoElement = document.getElementById('transInfo');
  const card = sessionStorage.getItem('card');

  if (!card) {
      transInfoElement.innerHTML = `
          <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1670302308075.jpg" class="img2" style="max-width: 100%; max-height: 100%;">
          <h5 class="left">请先登录喔</h5>
          <a href="https://kinji0101.github.io/banksystemfront/indexLogIn.html">
              <h5 class="right">登入頁面點這</h5>
          </a>
          <p id="loginInfo"></p>
      `;
      return;
  }

  transferButton.addEventListener('click', function() {
      const card2 = document.getElementById('card2').value;
      const transferMoney = document.getElementById('transferMoney').value;
      const password = document.getElementById('password').value;
      const offer = sessionStorage.getItem('offer');
      const name = sessionStorage.getItem('name');

      fetch("http://localhost:8080/transfer_Money", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              card: card,
              password: password,
              card2: card2,
              transferMoney: transferMoney,
              offer: offer
          }),
          credentials: "include" // 或者 "same-origin"
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          const checkData = JSON.parse(JSON.stringify(data));
          if (checkData.message === "轉入帳戶不存在") {
            Swal.fire({
              icon: 'error',
              text: '無法轉帳給自己',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "無法轉帳給自己") {
            Swal.fire({
              icon: 'error',
              text: '無法轉帳給自己',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          }else if (transferMoney === "") {
            Swal.fire({
              icon: 'error',
              text: '轉帳金額不能為空',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "轉帳失敗") {
            Swal.fire({
              icon: 'error',
              text: '轉帳失敗',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "卡號和密碼不匹配") {
            Swal.fire({
              icon: 'error',
              text: '卡號和密碼不匹配',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "卡號與轉入者不匹配") {
            Swal.fire({
              icon: 'error',
              text: '卡號與轉入者不匹配',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "請確實輸入卡號和密碼") {
            Swal.fire({
              icon: 'error',
              text: '請確實輸入卡號和密碼',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else if (checkData.message === "卡號不存在") {
            Swal.fire({
              icon: 'error',
              text: '卡號不存在',
              imageWidth: 200, // 图片的宽度
              imageHeight: 200, // 图片的高度
              imageAlt: 'Error Image' // 图片的替代文本
          });
          } else {
              sessionStorage.setItem("offer", data.offer);
              box1Element.innerHTML = `
                  <h5 class="card-title">系統訊息:${checkData.message}</h5>
                  <p>您的帳戶餘額:${data.deposit}</p>
                  <p>轉帳者(本人):${name}</p>
                  <p>剩餘轉帳優惠次數:${data.offer}</p>
                  <div class="row">
                      <div class="col">
                          <a href="./indexTrans.html">
                              <button type="button" class="btn btn-primary btn-sm">重新轉帳</button>
                          </a>
                      </div>
                      <div class="col">
                          <a href="https://kinji0101.github.io/banksystemfront/index.html">
                              <button type="button" class="btn btn-primary btn-sm ">返回首頁</button>
                          </a>
                      </div>
                  </div>
              `;
          }
      })
      .catch(function(err) {
          console.log(err);
      });
  });
});

function limitNumberLength(element, maxLength) {
  if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
  }
}
