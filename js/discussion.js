/** @format */

const url = "http://localhost:1337";
const comments = document.getElementById("comments");

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

fetch(url + "/discussions")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((e) => {
      console.log(e);
      comments.innerHTML += `
      <article class="uk-comment">
    <header class="uk-comment-header">
        <div class="uk-grid-medium uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
            <span uk-icon="user"></span>
            </div>
            <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">${e.Name}</a></h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li><a href="#">${e.created_at}</a></li>
                    <li><a href="#">Reply</a></li>
                </ul>
            </div>
        </div>
    </header>
    <div class="uk-comment-body">
        <p>${e.Text}</p>
    </div>
</article>
      `;
    });
  });
