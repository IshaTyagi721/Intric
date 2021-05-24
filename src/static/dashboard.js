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

    var gallery = false;

    if(itemData.image2){
        gallery=true;
    }

    console.log(itemData.image2);

    


    const inserter = `<div class="card" style="width: 18rem">
              <img src="${itemData.image1}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${itemData.title}</h5>
                <p class="card-text">
                ${itemData.Content}
                </p>
                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">Read More</a>
              </div>
            </div>


            <div class="modal fade " id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${itemData.title}e</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                

                    <div class="media-goes-here">

                        <img src="${itemData.image1}" class="post-image">

                    </div>

                    <div class="description-goes-here">
                        ${itemData.Content}


                    </div>



                    <div class="row d-flex justify-content-center comments-go-here">
                        <div class="col-md-8" style="width:100%;margin-top:2rem;">
                            <div class="headings d-flex justify-content-between align-items-center mb-3">
                                <h5>Unread comments(6)</h5>
                                <div class="buttons"> <span class="badge bg-white d-flex flex-row align-items-center"> <span class="text-primary">Comments "ON"</span>
                                        <div class="form-check form-switch"> <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked> </div>
                                    </span> </div>
                            </div>
                            <div class="card comment p-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/hczKIze.jpg" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">james_olesenn</small> <small class="font-weight-bold">Hmm, This poster looks cool</small></span> </div> <small>2 days ago</small>
                                </div>
                                <div class="action d-flex justify-content-between mt-2 align-items-center">
                                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                                    <div class="icons align-items-center"> <i class="fa fa-star text-warning"></i> <i class="fa fa-check-circle-o check-icon"></i> </div>
                                </div>
                            </div>
                            <div class="card comment p-3 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/C4egmYM.jpg" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">olan_sams</small> <small class="font-weight-bold">Loving your work and profile! </small></span> </div> <small>3 days ago</small>
                                </div>
                                <div class="action d-flex justify-content-between mt-2 align-items-center">
                                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                                </div>
                            </div>
                            <div class="card comment p-3 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/0LKZQYM.jpg" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">rashida_jones</small> <small class="font-weight-bold">Really cool Which filter are you using? </small></span> </div> <small>3 days ago</small>
                                </div>
                                <div class="action d-flex justify-content-between mt-2 align-items-center">
                                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                                    <div class="icons align-items-center"> <i class="fa fa-user-plus text-muted"></i> <i class="fa fa-star-o text-muted"></i> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                                </div>
                            </div>
                            <div class="card comment p-3 mt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/ZSkeqnd.jpg" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">simona_rnasi</small> <small class="font-weight-bold text-primary">@macky_lones</small> <small class="font-weight-bold text-primary">@rashida_jones</small> <small class="font-weight-bold">Thanks </small></span> </div> <small>3 days ago</small>
                                </div>
                                <div class="action d-flex justify-content-between mt-2 align-items-center">
                                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                                </div>
                            </div>
                        </div>
                    </div>






                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
            
            `;

    document.querySelector(".posts").insertAdjacentHTML("beforeend", inserter);
  }
}
