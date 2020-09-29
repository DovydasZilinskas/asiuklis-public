/** @format */

/** @format */

const url = "http://104.45.88.163:1337";
const slideshow = document.querySelector(".slideshow");

// Creating picture list and appending
fetch(url + "/homepages/")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      item.Media.forEach((x) => {
        const h3 = document.createElement("h3");
        const li = document.createElement("li");
        const img = document.createElement("img");
        const div = document.createElement("div");

        h3.textContent = item.Title;
        h3.className = "uk-margin-remove";
        div.className =
          "uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom";
        img.src = url + x.url;
        img.alt = x.alternativeText;

        slideshow.append(li);
        li.append(img, div);
        div.append(h3);
      });
    });
  })
  .catch(() => {
    UIkit.notification("Server error!", {
      status: "danger",
      pos: "bottom-center",
    });
  });
