let category = "top";

var login_form = document.getElementById("login");
var registration_from = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
  login_form.style.left = "-400px";
  registration_from.style.left = "50px";
  z.style.left = "110px";
}

function login() {
  login_form.style.left = "50px";
  registration_from.style.left = "450px";
  z.style.left = "0";
}

function login() {
  login_form.style.left = "50px";
  registration_from.style.left = "450px";
  z.style.left = "0";
}

registration_from.addEventListener("submit", (e) => {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var password = document.getElementById("pass").value;
  // console.log(name, email, age,pass);
  console.log(
    JSON.stringify({
      name,
      email,
      age,
      password,
    })
  );
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      age,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      save_token(data.token, data.user.name);
    })
    .catch((e) => {
      console.log(e);
    });
});

// POST LOGIN
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  var email = document.getElementById("email_login").value;
  var password = document.getElementById("password_login").value;

  console.log(
    JSON.stringify({
      email,
      password,
    })
  );
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      save_token(data.token, data.user.name);
    })
    .catch((e) => {
      console.log(e);
    });
});

function save_token(token, name) {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("name", name);
  window.location.pathname = "/static/index.html";
}
