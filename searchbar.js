function createSidebar() {
    if (document.getElementById("custom-sidebar")) return;

    const iconUrl = chrome.runtime.getURL("youtube.co.png");

    const sidebar = document.createElement("div");
    sidebar.id = "custom-sidebar";

    sidebar.innerHTML = `
        <a href="https://www.youtube.com" id="yt-home">
            <img src="${iconUrl}" id="yt-logo">
        </a>
    `;

    document.body.appendChild(sidebar);
}

function setupEdgeTrigger() {
    const sidebar = document.getElementById("custom-sidebar");
    if (!sidebar) return;

    let isOpen = false;

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;

        // Open when within 100px of left edge
        if (x <= 36) {
            if (!isOpen) {
                sidebar.classList.add("open");
                isOpen = true;
            }
        } 
        // Close when cursor leaves sidebar area
        else if (x > 36) {
            if (isOpen) {
                sidebar.classList.remove("open");
                isOpen = false;
            }
        }
    });
}

setInterval(() => {
    createSidebar();
    setupEdgeTrigger();
}, 1000);