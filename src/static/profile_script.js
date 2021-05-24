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

  fetch("http://localhost:3000/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      rendertoHTML_posts(data);
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
  window.location.pathname = "/static/Login_pregistration/index.html";
}

async function rendertoHTML_posts(data) {
  if (data.length < 1) {
    document.querySelector("#userPosts").innerHTML = "No posts yet!";
    return;
  }

  document.querySelector("#userPosts").innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const itemData = data[i];
    if (!itemData.image1) {
      itemData.image1 =
        "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else {
      itemData.image1 = `http://localhost:3000/${itemData.image1}`;
    }
    const inserter = `<div class="card" style="width: 18rem">
            <img src="${itemData.image1}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${itemData.title}</h5>
              <p class="card-text">
              ${itemData.Content}
              </p>
              <a
                href="#"
                class="btn btn-primary"
                data-toggle="modal"
                data-target=".bd-example-modal-xl"
                >Read More</a
              >
            </div>
          </div>`;

    document
      .querySelector("#userPosts")
      .insertAdjacentHTML("beforeend", inserter);
  }
}
