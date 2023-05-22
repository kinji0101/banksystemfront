const code = document.querySelector("#code");
const payment = document.querySelector("#payment");
const btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
  const pay = {
    "id": parseInt(code.value),
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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
