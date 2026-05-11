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

/* Run repeatedly because YouTube is dynamic */
setInterval(enableTheaterMode, 100);

function isWatchPage() {
    return window.location.href.includes("watch?v=");
}

function applyWatchLayoutShift() {
    if (isWatchPage()) {
        document.documentElement.classList.add("watch-shift");
        document.body.classList.add("watch-shift");
    } else {
        document.documentElement.classList.remove("watch-shift");
        document.body.classList.remove("watch-shift");
    }
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

/* YouTube SPA navigation watcher */
let lastUrl = location.href;

setInterval(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        applyWatchLayoutShift();
    }
}, 300);

applyWatchLayoutShift();

/* initial run */
applyScrollMode();