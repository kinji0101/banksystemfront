let inputs = [
    document.querySelector("#input1"),
    document.querySelector("#input2"),
    document.querySelector("#input3"),
    document.querySelector("#input4"),
    document.querySelector("#input5"),
    document.querySelector("#input6"),
    document.querySelector("#input7"),
    document.querySelector("#input8"),
    document.querySelector("#input9"),
    document.querySelector("#input10")
  ];

let btn1 = document.querySelector("#btn1")

btn1.addEventListener("click", () => {
    let body = {
        "bank_list": [{
            "card": input1.value,
            "name": input2.value,
            "address": input3.value,
            "account": input4.value,
            "password": input5.value,
            "email": input6.value,
            "phoneNumber": input7.value,
            "deposit":input8.value,
            "depositRate":input9.value,
            "offer":input10.value
        }]
    }
    fetch("http://localhost:8080/update_client", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const message = JSON.stringify(data, null, 2); 
            console.log(data);
            alert(message);
            input1.value = "";
            input2.value = "";
            input3.value = "";
            input4.value = "";
            input5.value = "";
            input6.value = "";
            input7.value = "";
            input8.value = "";
            input9.value = "";
            input10.value = "";
        })
        .catch(err => console.log(err));
});


inputs.forEach(function(input) {
    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        btn1.click();
      }
    });
  });

  var logoutButton = document.getElementById("logout");

 
  logoutButton.addEventListener("click", function() {
   

    
    window.location.href = "./首頁.html";

    
    history.pushState(null, null, "./首頁.html");
  });