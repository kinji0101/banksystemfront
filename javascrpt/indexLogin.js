const errorMessageElement = document.getElementById('errorMessage');
const loginButton = document.getElementById('loginButton');
const boxtestElement = document.querySelector('.boxtest');
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
        }else if(checkData.message) {
            alert(checkData.message);
        } 
    })
    .catch(function(err) {
        console.log(err);
    });
});