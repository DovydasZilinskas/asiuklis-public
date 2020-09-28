/** @format */

// Insert navbar into header
document.querySelector(".header").innerHTML = `
    <div class="header">
        <nav class="uk-navbar-container" uk-navbar>
            <div class="container ">
                <div class="uk-navbar-right uk-flex-between">
                    <a class="uk-navbar-item uk-logo" href="index.html">asiuklis</a>
                    <ul class="uk-navbar-nav">
                        <li>
                            <a href="#">Projects</a>
                            <div class="uk-navbar-dropdown">
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li><a href="music.html">Music</a></li>
                                    <li><a href="gallery.html">Gallery</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                        <a href="#">Parent</a>
                            <div class="uk-navbar-dropdown">
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li><a href="about.html">About</a></li>
                                    <li><a href="#" class="contact">Contact</a></li>
                                    <li><a href="discussion.html">Community</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
`;

// Alert HTML 'mailto' link
document.querySelector("a.contact").addEventListener("click", () => {
  const conf = confirm("Do you want to send an email?");
  if (conf == true) window.location.href = "mailto:dodefke@gmail.com";
});

document.querySelector(".footer").innerHTML = `
<a href="https://github.com/DovydasZilinskas" target="_blank" uk-icon="icon: github"></a>
<a href="https://www.instagram.com/asiuklis_tu/" target="_blank" uk-icon="icon: instagram"></a>
<a href="https://soundcloud.com/asiuklis" target="_blank" uk-icon="icon: soundcloud"></a>
`;
