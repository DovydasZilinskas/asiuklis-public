/** @format */

const url = "http://localhost:1337";
const slideshow = document.getElementById("slideshow");

fetch(url + "/galleries/")
  .then((res) => res.json())
  .then((data) =>
    data[0].Image.forEach((image) => {
      slideshow.innerHTML += `
      <li>
      <img src="${url + image.url}" alt="${image.alternativeText}" uk-cover>
  </li>
      `;
    })
  );
