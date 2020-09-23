/** @format */

const url = "http://localhost:1337";
const comments = document.getElementById("comments");

// Function for creating a comment
function addComment(data) {
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
}

// Fetch data for creating a comment
function fetchData() {
  fetch(url + "/discussions")
    .then((res) => res.json())
    .then((data) => {
      addComment(data);
    })
    .catch(() => {
      UIkit.notification("Server error!", {
        status: "danger",
        pos: "bottom-center",
      });
    });
}

// Call fetch to view comments
fetchData();

// POST a comment to DB
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const body = {
    Name: e.target.elements.name.value,
    Email: e.target.elements.email.value,
    Text: e.target.elements.comment.value,
  };

  // Input field "Name" validation and error handling
  if (body.Name.match(/^[A-z ,.'-]+$/i)) {
    fetch(url + "/discussions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then(() => {
        UIkit.notification("Successfuly added", {
          status: "success",
          pos: "bottom-center",
        });
      })
      .then(() => fetchData())
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
