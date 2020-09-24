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
          if (id == "") {
            UIkit.notification("Please login to delete post", {
              status: "warning",
              pos: "bottom-center",
            });
          } else {
            UIkit.notification("Server error!", {
              status: "danger",
              pos: "bottom-center",
            });
          }
        });
    });
  });
}

// Function for creating a comment
function addComment(data) {
  data.forEach((i) => {
    const date = i.created_at.slice(0, 10);
    comments.innerHTML += `
        <article class="uk-comment">
          <header class="uk-comment-header">
            <div class="uk-grid-medium uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                  <span uk-icon="icon: user; ratio: 2"></span>
                </div>
                <div class="uk-width-expand">
                  <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">${i.Name}</a></h4>
                  <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li>${date}</li>
                    <li><button class="userid uk-button uk-button-default uk-button-small" value="${i.id}">Delete</button></li>
                  </ul>
                </div>
            </div>
          </header>
            <div class="uk-comment-body">
              <p>${i.Text}</p>
            </div>
            <hr class="uk-divider-small">
        </article>
    `;
  });
  deleteComment();
}

// Firebase authentication state viewer
function displayNone() {
  const el = document.getElementById("lilogin");
  const all = document.getElementsByClassName("userid");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      el.innerHTML = `<a href="#" id="fbsignout" onclick="signoutUser()">Signout</a>`;
      for (let i = 0; i < all.length; i++) {
        all[i].style.display = "block";
      }
    } else {
      el.innerHTML = `<a href="#">Login</a>`;
      for (let i = 0; i < all.length; i++) {
        all[i].removeAttribute("value");
      }
    }
  });
}
displayNone();

// Firebase signout function
function signoutUser() {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        UIkit.notification("Successfuly signed out", {
          status: "success",
          pos: "bottom-center",
        });
      },
      (error) => {
        UIkit.notification(error.message, {
          status: "danger",
          pos: "bottom-center",
        });
      }
    );
}

// Fetch data for creating a comment
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

// POST a comment to DB on submit
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  const body = {
    Name: e.target.name.value,
    Email: e.target.email.value,
    Text: e.target.comment.value,
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
      .then((res) => {
        addComment([res]);
      })
      .then(() => {
        UIkit.notification("Successfuly added", {
          status: "success",
          pos: "bottom-center",
        });
      })
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

// Firebase login
document.forms.login.addEventListener("submit", (f) => {
  f.preventDefault();

  const email = f.target.elements.email.value;
  const password = f.target.elements.password.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      () => {
        UIkit.notification("Successfuly signed in", {
          status: "success",
          pos: "bottom-center",
        });
        document.forms.login.reset();
      },
      (error) => {
        UIkit.notification(error.message, {
          status: "danger",
          pos: "bottom-center",
        });
      }
    )
    .then(() => displayNone());
});

// Firebase register
document.forms.register.addEventListener("submit", (g) => {
  g.preventDefault();

  const email = g.target.elements.email.value;
  const password = g.target.elements.password.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      () => {
        UIkit.notification("Successfuly registered", {
          status: "success",
          pos: "bottom-center",
        });
        document.forms.register.reset();
      },
      (error) => {
        UIkit.notification(error.message, {
          status: "danger",
          pos: "bottom-center",
        });
      }
    );
});
