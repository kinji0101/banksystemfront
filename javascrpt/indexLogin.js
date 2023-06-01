const errorMessageElement = document.getElementById('errorMessage');
const loginButton = document.getElementById('loginButton');
const boxtestElement = document.querySelector('.boxtest');
const userNameElement = document.querySelector('.userName');
const account = sessionStorage.getItem('account');
const password = sessionStorage.getItem('password');

loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;
    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account: account,
            password: password
        }),
        credentials: "include" // 或者 "same-origin"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const checkData = JSON.parse(JSON.stringify(data));
            if (data.card) {
                sessionStorage.setItem("account", data.account);
                sessionStorage.setItem("card", data.card);
                sessionStorage.setItem("password", password);
                sessionStorage.setItem("name", data.name);
                sessionStorage.setItem("offer", data.offer);
                const name = sessionStorage.getItem("name");
                userNameElement.innerHTML = `
                <li class="nav-item dropdown">
                  <a class="userName nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      ${name}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li class="dropdown-item" href="">${data.card}</li>
                      <li>
                          <hr class="dropdown-divider">
                      </li>
                      <li><a class="loanitem dropdown-item" href=""></a></li>
                  </ul>
              </li>
            `;
            boxtestElement.innerHTML = `
            <h5>登入成功，歡迎你 ${name}！</h5>
            <img src="https://i4.disp.cc/imgur/WC2G1KZh.jpg">
            <p>你可以使用銀行系統了</p>
            `;
            boxtestElement.classList.add('boxtest-login-success');
            setTimeout(function() {
                boxtestElement.remove(); // 從 DOM 中移除元素
            }, 5000);            
                errorMessageElement.innerHTML = "";
            } else if (checkData.message) {
                console.log(checkData.message)
                errorMessageElement.innerHTML = `
                <img class="errorimg" src="https://memeprod.ap-south-1.linodeobjects.com/user-template/536263c581f68d6a929bcbcf7191928a.png" alt="">
                <h1>${checkData.message}</h1>
            `;
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});
if (account && password) {
    const name = sessionStorage.getItem("name");
    const card = sessionStorage.getItem("card");
    const card2 = sessionStorage.getItem("card2");
    const card3 = sessionStorage.getItem("card3");
    userNameElement.innerHTML = `
        <li class="nav-item dropdown">
            <a class="userName nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                ${name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                ${card ? `<li class="dropdown-item">卡號:${card}</li>` : ''}
                ${card2 ? `<li class="dropdown-item">${card2}</li>` : ''}
                ${card3 ? `<li class="dropdown-item">${card3}</li>` : ''}
                ${card || card2 || card3 ? '<li><hr class="dropdown-divider"></li>' : ''}
                <li><a class="loanitem dropdown-item" href=""></a></li>
            </ul>
        </li>
    `;
    boxtestElement.classList.add('hidden');
    boxtestElement.classList.add('boxtest-login-success');
}
