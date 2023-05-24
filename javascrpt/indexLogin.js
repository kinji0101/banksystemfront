const errorMessageElement = document.getElementById('errorMessage');
const loginButton = document.getElementById('loginButton');
const boxtestElement = document.querySelector('.boxtest');
const errorAREA = document.querySelector('.errorAREA');
const card = sessionStorage.getItem('card');
const password = sessionStorage.getItem('password');
if (card || password) {
    const name = sessionStorage.getItem("name");
        boxtestElement.innerHTML = `
        <h5>登入成功，歡迎你 ${name}！</h5>
        <img src="https://i4.disp.cc/imgur/WC2G1KZh.jpg">
        <p>你可以使用銀行系統了</p>
        `;
        boxtestElement.classList.add('boxtest-login-success');        
}

loginButton.addEventListener('click', function() {
    const card = document.getElementById('card').value;
    const password = document.getElementById('password').value;
    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            card: card,
            password: password
        }),
        credentials: "include" // 或者 "same-origin"
    })
    .then(function(response) {
         return response.json();
    })
    .then(function(data) {
        const checkData = JSON.parse(JSON.stringify(data));
        if (data.card) {
            sessionStorage.setItem("card", data.card);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("name", data.name);
            sessionStorage.setItem("offer", data.offer);
            const name = sessionStorage.getItem("name");
            boxtestElement.innerHTML = `
            <h5>登入成功，歡迎你 ${name}！</h5>
            <img src="https://i4.disp.cc/imgur/WC2G1KZh.jpg">
            <p>你可以使用銀行系統了</p>
            `;
            boxtestElement.classList.add('boxtest-login-success');
            errorMessageElement.innerHTML = "";          
        }else if(checkData.message) {
            console.log(checkData.message)
            errorMessageElement.innerHTML = `
            <img class="errorimg" src="https://memeprod.ap-south-1.linodeobjects.com/user-template/536263c581f68d6a929bcbcf7191928a.png" alt="">
            <h1>${checkData.message}</h1>
        `;
        } 
    })
    .catch(function(err) {
        console.log(err);
    });
});