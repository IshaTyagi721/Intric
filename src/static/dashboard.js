function get_posts() {
  const token = window.localStorage.getItem("token");
  fetch("http://localhost:3000/articles/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      rendertoHTML_posts_all(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

get_posts();

async function rendertoHTML_posts_all(data) {
  document.querySelector(".posts").innerHTML = "";

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
                href="#" class="btn btn-primary readpost" data-bs-toggle="modal" data-bs-target="#exampleModal"
                data-id="${itemData._id}"
          
                  >Read More</a
                >
              </div>
            </div>`;

    document.querySelector(".posts").insertAdjacentHTML("beforeend", inserter);
    even_trigger_hack();
  }
}
