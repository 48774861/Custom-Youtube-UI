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