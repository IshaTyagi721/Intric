var images = [];
let raw_img = [];

function setVisibility() {
  var v = document.getElementById("img_div");
  if (v.style.display === "none") {
    v.style.display = "block";
  } else {
    v.style.display = "none";
  }
}

function check_duplicate(name) {
  var image = true;
  if (images.length > 0) {
    for (e = 0; e < images.length; e++) {
      if (images[e].name == name) {
        image = false;
        break;
      }
    }
  }
  // console.log(image);
  return image;
}

function image_select() {
  var image = document.getElementById("image").files;
  raw_img = image;
  for (i = 0; i < image.length; i++) {
    if (check_duplicate(image[i].name)) {
      images.push({
        name: image[i].name,
        url: URL.createObjectURL(image[i]),
        file: image[i],
      });
      // console.log(image)
    } else {
      alert(image[i].name + " is already added to the list");
    }
  }
  document.getElementById("form").reset();
  document.getElementById("container").innerHTML = image_show();
}

function image_show() {
  var image = "";
  images.forEach((i) => {
    image +=
      `<div class="image_container d-flex justify-content-center position-relative">
                            <img src="` +
      i.url +
      `" alt="Image">
                            <span class="position-absolute" onclick="delete_image(` +
      images.indexOf(i) +
      `)">&times;</span>
                        </div>`;
  });
  return image;
}

function delete_image(e) {
  images.splice(e, 1);
  document.getElementById("container").innerHTML = image_show();
}

const post_form = document.getElementById("new_post_btn");

post_form.addEventListener("click", (e) => {
  // e.preventDefault();
  console.log(raw_img);

  var title = document.getElementById("title").value;
  var content = document.getElementById("content").value;
  // console.log(name, email, age,pass);
  if (!title) {
    window.alert("Please enter title");
    return;
  }

  const profile_btn = document.querySelector("#profile");

  if (!images)
    fetch("http://localhost:3000/articles", {
      method: "POST",
      body: JSON.stringify({
        title,
        Content: content,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        profile_btn.click();
        // save_token(data.token, data.user.name);
      })
      .catch((e) => {
        console.log(e);
      });
  else {
    var formdata = new FormData();
    formdata.append("title", title);
    if (content) formdata.append("Content", content);

    for (let i = 0; i < images.length; i++) {
      formdata.append(`image${i + 1}`, images[i].file);
    }
    // console.log(formdata.getAll());
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3000/articles/images", requestOptions)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        profile_btn.click();
        // save_token(data.token, data.user.name);
      })

      .catch((error) => console.log("error", error));
  }
});
