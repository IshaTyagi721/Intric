var images = [];

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

function delete_image() {
  images.splice(e, 1);
  document.getElementById("container").innerHTML = image_show();
}