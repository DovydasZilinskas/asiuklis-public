/** @format */

const url = "http://localhost:1337";
const slideshow = document.getElementById("slideshow");
const slideshowmenu = document.getElementById("slideshowmenu");

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

fetch(url + "/galleries/")
  .then((res) => res.json())
  .then((data) =>
    data.forEach((title) => {
      slideshowmenu.innerHTML += `
    <li><a href="#">${title.Title}</a></li>
    `;
    })
  );
