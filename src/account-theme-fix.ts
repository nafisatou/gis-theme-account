import './css/account.css';

// Account theme fix - remove dark theme and force white background
document.addEventListener("DOMContentLoaded", () => {
    // Remove Keycloak dark theme class
    document.documentElement.classList.remove("pf-theme-dark");

    // Force background color for all major containers
    const containers = [
        document.documentElement,
        document.body,
        document.getElementById("root"),
        document.getElementById("app"),
        document.getElementById("keycloak-content"),
        document.getElementById("keycloak-section")
    ];

    containers.forEach(el => {
        if (el) el.style.backgroundColor = "#ffffff";
    });
});
