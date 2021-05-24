const post_form = document.getElementById("new_post");

post_form.addEventListener("submit", (e) => {
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
