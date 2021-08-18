const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers() {
  return fetch(BASE_URL)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response, "This should be the data in a usable form");
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchUsers();
