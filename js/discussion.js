/** @format */

const url = "http://localhost:1337";
const comments = document.getElementById("comments");

// Function for deleting a comment
function deleteComment() {
  document.querySelectorAll("button.userid").forEach((button) => {
    button.addEventListener("click", (e) => {
      const article =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      const id = e.target.value;
      fetch(url + "/discussions/" + id, {
        method: "DELETE",
      })
        .then((data) => data.json())
        .then(() => {
          UIkit.notification("Successfuly deleted", {
            status: "success",
            pos: "bottom-center",
          });
        })
        .then(() => {
          comments.removeChild(article);
        })
        .catch(() => {
          UIkit.notification("Server error!", {
            status: "danger",
            pos: "bottom-center",
          });
        });
    });
  });
}

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
                    <li><button class="userid" value="${e.id}">Delete</button></li>
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
  deleteComment();
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

// Call fetch function to view comments
fetchData();

// POST a comment to DB on submit
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
      .then(() => document.forms[0].reset())
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
