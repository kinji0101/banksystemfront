let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
  let input1 = document.querySelector("#input1");
  let input2 = document.querySelector("#input2");
  let input3 = document.querySelector("#input3");
  let input4 = document.querySelector("#input4");

  let body = {
    "card": input1.value,
    "account": input2.value,
    "password": input3.value,
    "amount": input4.value
  };

  fetch("http://localhost:8080/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const message = JSON.stringify(data, null, 2);
      console.log(message);
      alert(message);
      input1.value = "";
      input2.value = "";
      input3.value = "";
      input4.value = "";
    })
    .catch(err => console.log(err));
});

let inputs = [
  document.querySelector("#input1"),
  document.querySelector("#input2"),
  document.querySelector("#input3"),
  document.querySelector("#input4")
];

inputs.forEach(function(input) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btn1.click();
    }
  });
});
