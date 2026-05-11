
let sidebarInitialized = false;

function createSidebar() {
    if (document.getElementById("custom-sidebar")) return;

    const iconUrl = chrome.runtime.getURL("youtube.co.png");
    const historyUrl = chrome.runtime.getURL("history.png");
    const laterUrl = chrome.runtime.getURL("watchlater.png");

    const sidebar = document.createElement("div");
    sidebar.id = "custom-sidebar";

    sidebar.innerHTML = `
        <a href="https://www.youtube.com" class="sidebar-item" title="Home">
            <img src="${iconUrl}" />
        </a>

        <a href="https://www.youtube.com/feed/history" class="sidebar-item" title="History">
            <img src="${historyUrl}" />
        </a>

        <a href="https://www.youtube.com/playlist?list=WL" class="sidebar-item" title="Watch Later">
            <img src="${laterUrl}" />
        </a>
    `;

    document.body.appendChild(sidebar);
}

function setupEdgeTrigger() {
    const sidebar = document.getElementById("custom-sidebar");
    if (!sidebar) return;

    let isOpen = false;
    let lastToggle = 0;

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const now = Date.now();

        // OPEN
        if (x <= 36 && !isOpen) {
            sidebar.classList.add("open");
            isOpen = true;
            lastToggle = now;
        }

        // CLOSE (with small delay buffer to prevent flicker)
        if (x > 80 && isOpen && now - lastToggle > 150) {
            sidebar.classList.remove("open");
            isOpen = false;
        }
    });
}

function initSidebar() {
    if (sidebarInitialized) return;
    sidebarInitialized = true;

    createSidebar();
    setupEdgeTrigger();
}

/* Run once */
initSidebar();

/* YouTube SPA navigation safety */
document.addEventListener("yt-navigate-finish", initSidebar);