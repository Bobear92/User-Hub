const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers(BASE_URL) {
  fetch(BASE_URL)
    .then((data) => {
      return data.json();
    }) // convert to json
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderUser(user) {
  let element = $(`<div class="user-card">
  <header>
    <h2>${user.name}</h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b> ${user.email}</p>
    <p><b>Works for:</b> Romaguera-Crona</p>
    <p><b>Company creed:</b> "Multi-layered client-server neural-net, which will harness real-time e-markets!"</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY Bret</button>
    <button class="load-albums">ALBUMS BY Bret</button>
  </footer>
</div>`);
}

function renderUserList(userList) {
  $("#user-list").empty();

  for (let i = 0; i < userList.length; i++) {
    let userObj = userList[i];
    $("#user-list").append(renderCard(userObj));
  }
}

function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers(BASE_URL).then(renderUserList);
}

bootstrap();
