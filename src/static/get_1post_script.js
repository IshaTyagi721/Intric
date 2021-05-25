function get_1post(id) {
  const token = window.localStorage.getItem("token");

  fetch(`http://localhost:3000/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);

      rendertoHTML_indivpost(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function even_trigger_hack() {
  document.querySelectorAll(".readpost").forEach((item) => {
    item.addEventListener("click", (e) => {
      get_1post(e.target.dataset.id);
    });
  });
}

function rendertoHTML_indivpost(data) {
  if (!data.image1) {
    data.image1 =
      "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  } else {
    data.image1 = `http://localhost:3000/${data.image1}`;
  }
  document.querySelector(".modal .description-goes-here").innerHTML =
    data.Content;
  document.querySelector(".modal .post-image").src = data.image1;
  document.querySelector(".modal .modal-title").innerHTML = data.title;
  document.querySelector(".comments-go-here").innerHTML = "";
  for (let i = 0; i < data.comments.length; i++) {
    const inserter = ` <div class="card comment p-3">
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <div class="user d-flex flex-row align-items-center">
        
        <span
          <small class="font-weight-bold"
            >${data.comments[i].text}</small
          ></span
        >
      </div>
      <small>${data.comments[i].date}</small>
    </div>
    <div
      class="
        action
        d-flex
        justify-content-between
        mt-2
        align-items-center
      "
    >
      
      <div class="icons align-items-center">
        <i class="fa fa-star text-warning"></i>
        <i class="fa fa-check-circle-o check-icon"></i>
      </div>
    </div>`;
    document
      .querySelector(".comments-go-here")
      .insertAdjacentHTML("beforeend", inserter);
  }
}
