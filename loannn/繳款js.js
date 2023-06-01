const code = document.querySelector("#code");
const card = document.querySelector("#cardNum");
const account = document.querySelector("#account");
const password = document.querySelector("#password");
const payment = document.querySelector("#payment");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
  const pay = {
    "id": parseInt(code.value),
    "card": cardNum.value,
    "account": account.value,
    "password": password.value,
    "amount": parseInt(payment.value)
  };

  fetch("http://localhost:8080/repayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pay),
  })
    .then((response) => response.json())
    .then((data) => {
      const formattedData = `${data.message}`;
      alert(formattedData);
      console.log(data);
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
});
