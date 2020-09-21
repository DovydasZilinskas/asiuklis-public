/** @format */

const url = "http://localhost:1337";
const comments = document.getElementById("comments");

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const email = e.target.elements.email.value;
  const comment = e.target.elements.comment.value;

  fetch(url + "/discussions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: name,
      Email: email,
      Text: comment,
    }),
  });
});

// Create comment
fetch(url + "/discussions")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((e) => {
      const date = e.created_at.slice(0, 10);
      comments.innerHTML += `
      <article class="uk-comment">
    <header class="uk-comment-header">
        <div class="uk-grid-medium uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
            <span uk-icon="icon: user; ratio: 2"></span>
            </div>
            <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">${e.Name}</a></h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li>${date}</li>
                    <li><a href="edit.html">Edit</a></li>
                </ul>
            </div>
        </div>
    </header>
    <div class="uk-comment-body">
        <p>${e.Text}</p>
    </div>
    <hr class="uk-divider-small">
</article>
      `;
    });
  });
