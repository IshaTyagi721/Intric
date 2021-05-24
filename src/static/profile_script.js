function load_profile() {
  const token = window.localStorage.getItem("token");
  fetch("http://localhost:3000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      rendertoHTML(data.name, data.age, data.email);
    })
    .catch((e) => {
      console.log(e);
    });
}

function rendertoHTML(name, age, email) {
  document.querySelector(".name .title").innerHTML = name;
  document.querySelector(
    ".avatar img"
  ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&bold=true`;
}

function logoutt() {
  window.localStorage.removeItem("token");
  window.location.pathname = "/src/static/Login_pregistration/index.html";
}
