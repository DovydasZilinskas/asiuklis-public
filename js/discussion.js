/** @format */

const url = "http://localhost:1337";
const comments = document.getElementById("comments");

// POST a comment to DB
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.elements.name.value;
  const email = e.target.elements.email.value;
  const comment = e.target.elements.comment.value;

  // Input field "Name" validation and error handling
  if (name.match(/^[A-z ,.'-]+$/i)) {
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
    })
      .then((data) => data.json())
      .then(() => {
        UIkit.notification("Successfuly added", {
          status: "success",
          pos: "bottom-center",
        });
      })
      .catch(() => {
        UIkit.notification("Server error!", {
          status: "danger",
          pos: "bottom-center",
        });
      });
  } else {
    UIkit.notification("Incorrect name", {
      status: "danger",
      pos: "bottom-center",
    });
  }
});

// Create comment article
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
  })
  .catch(() => {
    UIkit.notification("Server error!", {
      status: "danger",
      pos: "bottom-center",
    });
  });
