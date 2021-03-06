/** @format */

const url = "http://104.45.88.163:1337";
const slideshowmenu = document.getElementById("slideshowmenu");
const switcher = document.getElementById("switcher");

// Creating slideshow tabs
fetch(url + "/galleries/")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((title) => {
      slideshowmenu.innerHTML += `
    <li><a href="#">${title.Title}</a></li>
    `;
    });
  });

// Creating picture list and appending
fetch(url + "/galleries/")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      // Creating component tags
      const li = document.createElement("li");
      const ul = document.createElement("ul");
      const div = document.createElement("div");
      const div2 = document.createElement("div");
      const a = document.createElement("a");
      const a2 = document.createElement("a");
      const ul2 = document.createElement("ul");

      // Giving tag attributes
      ul.className = "uk-slideshow-items";

      ul2.className = "uk-slideshow-nav uk-dotnav uk-flex-center uk-margin";

      div.className = "uk-position-relative uk-visible-toggle uk-light";

      div.setAttribute("tabindex", "-1");

      div2.setAttribute("uk-slideshow", "animation: push");

      a.className = "uk-position-center-left uk-position-small uk-hidden-hover";
      a.setAttribute("uk-slidenav-previous", "");
      a.setAttribute("uk-slideshow-item", "previous");
      a.href = "#";

      a2.className =
        "uk-position-center-right uk-position-small uk-hidden-hover";
      a2.setAttribute("uk-slidenav-next", "");
      a2.setAttribute("uk-slideshow-item", "next");
      a2.href = "#";

      // Looping through image url's
      item.Image.forEach((x) => {
        const li3 = document.createElement("li");
        const img = document.createElement("img");
        img.src = url + x.url;
        ul.append(li3);
        li3.append(img);
      });
      switcher.append(li);
      li.append(div2);
      div2.append(div, ul2);
      div.append(ul, a, a2);
    });
  })
  .then(() => {
    document.querySelector(".uk-switcher li").classList.add("uk-active");
  })
  .catch(() => {
    UIkit.notification("Server error!", {
      status: "danger",
      pos: "bottom-center",
    });
  });
