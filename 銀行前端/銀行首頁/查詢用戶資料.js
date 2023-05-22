btn1.addEventListener("click", () => {
    
    sendData();
  });
  
  input1.addEventListener("keydown", function(event) {
    var keycode = event.keyCode || event.which;
    if (keycode === 13) {
      
      sendData();
      event.preventDefault();
    }
  });
  
  function sendData() {
    let body = {
      "card": input1.value
    };
  
    fetch("http://localhost:8080/find_by_card", {
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
      console.log(data);
      alert(message);
    })
    .catch(err => console.log(err));
  
    input1.value = "";
  }
  
  var logoutButton = document.getElementById("logout");

 
  logoutButton.addEventListener("click", function() {
   

    
    window.location.href = "./首頁.html";

    
    history.pushState(null, null, "./首頁.html");
  });

