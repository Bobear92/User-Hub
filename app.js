const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers() {
  return fetch(BASE_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response, "This should be the data in a usable form");
    })
    .catch(function (error) {
      console.error(error);
    });
}
