let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let input3 = document.querySelector("#input3");
let input4 = document.querySelector("#input4");
let input5 = document.querySelector("#input5");


let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
    let body = {
        "card": input1.value,
        "account": input2.value,
        "password": input3.value,
        "loan": input4.value,
        "installments": input5.value
    };

    fetch("http://localhost:8080/loan", {
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
        const message = JSON.stringify(data, null, 2);  // 将 data 对象转换为字符串
        console.log(message);
        alert(message);
    })
    .catch(err => console.log(err));

    input1.value = ""; 
    input1.value = "";
    input2.value = "";
    input3.value = "";
    input4.value = "";
    input5.value = "";
});

let inputs = [input1, input2, input3,input4,input5];

inputs.forEach(function(input) {
    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        btn1.click();
      }
    });
  });