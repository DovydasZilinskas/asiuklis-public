/** @format */

const url = "http://localhost:1337";

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url + "/discussions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: e.target.elements.name.value,
      Email: e.target.elements.email.value,
      Text: e.target.elements.comment.value,
    }),
  });
});
