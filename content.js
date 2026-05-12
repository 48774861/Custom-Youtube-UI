function enableTheaterMode() {
    const button = document.querySelector(
        'button.ytp-size-button'
    );

    if (button &&
        document.querySelector('ytd-watch-flexy') &&
        !document
          .querySelector('ytd-watch-flexy')
          .hasAttribute('theater')) {

        button.click();
    }
}

function isWatchPage() {
    return window.location.pathname === "/watch";
}

function updatePageState() {
    const watch = isWatchPage();

    document.documentElement.classList.toggle("watch-shift", watch);
    document.body.classList.toggle("watch-shift", watch);
}

function applyScrollMode() {
    const watch = isWatchPage();

    const root = document.documentElement;
    const body = document.body;
    const app = document.querySelector("ytd-app");

    if (watch) {
        root.classList.add("cinema-mode");
        body.classList.add("cinema-mode");

        if (app) {
            app.style.overflow = "hidden";
            app.style.height = "100vh";
        }

    } else {
        root.classList.remove("cinema-mode");
        body.classList.remove("cinema-mode");

        if (app) {
            app.style.overflow = "";
            app.style.height = "";
        }
    }
}

function updateFullscreenState() {
    const isFullscreen = !!document.querySelector(".ytp-fullscreen");

    document.documentElement.classList.toggle("video-fullscreen", isFullscreen);
}

/* Run repeatedly because YouTube is dynamic */
setInterval(enableTheaterMode, 100);
setInterval(updateFullscreenState, 300);
updatePageState();
/* YouTube SPA navigation watcher */
let lastUrl = location.href;

setInterval(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        updatePageState();
        applyScrollMode();
    }
}, 300);