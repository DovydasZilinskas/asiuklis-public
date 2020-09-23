/** @format */

const header = document.querySelector(".header");

// Insert navbar into header
header.innerHTML = `
    <div class="header">
        <nav class="uk-navbar-container" uk-navbar>
            <div class="container">
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
                        <li><a href="discussion.html">Community</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="mailto:dodefke@gmail.com">Contact</a></li>
                        <a class="uk-navbar-toggle" href="index.html">
                            <span uk-icon="icon: home; ratio: 1.4"></span>
                        </a>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
`;
