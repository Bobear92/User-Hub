const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers(Url) {
  return fetchData(`${Url}/users`);
}

function renderUser(user) {
  let element = $(`<div class="user-card">
  <header>
    <h2>${user.name}</h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b> ${user.email}</p>
    <p><b>Works for:</b> ${user.company.name}</p>
    <p><b>Company creed:</b> ${user.company.catchPhrase}</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY ${user.username}</button>
    <button class="load-albums">ALBUMS BY ${user.username}</button>
  </footer>
</div>`);

  element.find(".load-posts, .load-albums").data("user", user);

  return element;
}

function renderUserList(userList) {
  $("#user-list").empty();

  for (let i = 0; i < userList.length; i++) {
    let userObj = userList[i];
    $("#user-list").append(renderUser(userObj));
  }
}

function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers(BASE_URL).then(renderUserList);
}
bootstrap();

$("#user-list").on("click", ".user-card .load-posts", function () {
  // load posts for this user
  // render posts for this user
  let data = $(this).data("user");
  fetchUserPosts(data.id).then(renderPostList);
});

$("#user-list").on("click", ".user-card .load-albums", function () {
  // load albums for this user
  // render albums for this user
  let data = $(this).data("user");
  fetchUserAlbumList(data.id).then(renderAlbumList);
});

// module 2

/* get an album list, or an array of albums */
function fetchUserAlbumList(userId) {
  return fetchData(
    `${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`
  );
}

function fetchData(url) {
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.error(error));
}

/* render a single album */
function renderAlbum(album) {
  let element = `<div class="album-card">
  <header>
    <h3>${album.title}, by ${album.user.username} </h3>
  </header>
  <section class="photo-list">
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <!-- ... -->
  </section>
</div>`;

  for (let i = 0; i < album.photos.length; i++) {
    let value = album.photos[i];

    $(".photo-list").append(renderPhoto(value));
  }

  return element;
}

/* render a single photo */
function renderPhoto(photo) {
  let element = `<div class="photo-card">
  <a href="${photo.url}" target="_blank">
    <img src="${photo.thumbnailUrl}">
    <figure>${photo.title}>
  </a>
</div>`;

  return element;
}

/* render an array of albums */
function renderAlbumList(albumList) {
  $("#app section.active").removeClass("active");
  $("#album-list").addClass("active").empty();

  for (let i = 0; i < albumList.length; i++) {
    let element = albumList[i];
    $("#album-list").append(renderAlbum(element));
  }
}

// module 3

function fetchUserPosts(userId) {
  return fetchData(`${BASE_URL}/users/${userId}/posts?_expand=user`);
}

function fetchPostComments(postId) {
  return fetchData(`${BASE_URL}/posts/${postId}/comments`);
}

function renderPost(post) {
  let element = $(`<div class="post-card">
  <header>
    <h3>${post.title}</h3>
    <h3>--- ${post.user.username}</h3>
  </header>
  <p>${post.body}</p>
  <footer>
    <div class="comment-list"></div>
    <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
  </footer>
</div>`);

  // element.find(".toggle-comments");
  element.data("post", post);

  return element;
}

function renderPostList(postList) {
  $("#app section.active").removeClass("active");
  $("#post-list").addClass("active").empty();

  for (let i = 0; i < postList.length; i++) {
    let element = postList[i];
    $("#post-list").append(renderPost(element));
  }
}

function toggleComments(postCardElement) {
  const footerElement = postCardElement.find("footer");

  if (footerElement.hasClass("comments-open")) {
    footerElement.removeClass("comments-open");
    footerElement.find(".verb").text("show");
  } else {
    footerElement.addClass("comments-open");
    footerElement.find(".verb").text("hide");
  }
}

$("#post-list").on("click", ".post-card .toggle-comments", function () {
  const postCardElement = $(this).closest(".post-card");
  const post = postCardElement.data("post");
  const commentListElement = postCardElement.find(".comment-list");

  setCommentsOnPost(post)
    .then(function (post) {
      commentListElement.empty();

      for (let i = 0; i < post.comments.length; i++) {
        let value = post.comments[i];

        let newH3 = $(`<h3>${value.body} ${value.email}</h3>`);
        commentListElement.prepend(newH3);
      }
      toggleComments(postCardElement);
    })
    .catch(function () {
      toggleComments(postCardElement);
    });
});

function setCommentsOnPost(post) {
  // if we already have comments, don't fetch them again

  if (post.comments) {
    // #1: Something goes here
    return Promise.reject(null);
  }

  // fetch, upgrade the post object, then return it
  return fetchPostComments(post.id).then(function (comments) {
    // #2: Something goes here
    post.comments = comments;
    return post;
  });
}
