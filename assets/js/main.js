let allExtensions = [];
let isDarkMode = false;
document.addEventListener("DOMContentLoaded", () => {
    getExtensions().then((data) => {
        allExtensions = data;
        renderExtensions(allExtensions);
    });

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle("dark");
        themeToggle.querySelector(".header__theme img").src = isDarkMode
            ? "./assets/images/icon-sun.svg"
            : "./assets/images/icon-moon.svg";
    });

    const btnAll = document.getElementById("btnAll");
    const btnActive = document.getElementById("btnActive");
    const btnInactive = document.getElementById("btnInactive");

    btnAll.addEventListener("click", () => {
        renderExtensions(allExtensions);
    });

    btnActive.addEventListener("click", () => {
        renderExtensions(allExtensions, "active");
    });

    btnInactive.addEventListener("click", () => {
        renderExtensions(allExtensions, "inactive");
    });
});

function getExtensions() {
    return fetch("data.json").then((response) => response.json());
}

function removeExtension(index) {
    allExtensions.splice(index, 1);
    renderExtensions(allExtensions);
}

function renderExtensions(data, status = "all") {
    const extensionsContainer = document.querySelector(".ext__list");
    extensionsContainer.innerHTML = "";
    let html = "";
    data.forEach((element, index) => {
        const showActive = status === "active" && element.isActive;
        const showInactive = status === "inactive" && !element.isActive;
        const showAll = status === "all";
        if (showAll || showActive || showInactive) {
            html += `
            <div class="ext-item">
                <div class="ext-item__header">
                    <img
                        src="${element.logo}"
                        alt="${element.name}"
                    />
                    <div class="ext-item__content">
                        <h2 class="ext-item__title" id="ext-${index}-title">${element.name}</h2>
                        <p class="ext-item__description">${element.description}</p>
                    </div>
                </div>
                <div class="ext-item__body">
                    <button class="ext-item__btn" aria-label="Remove ${element.name}" onclick="removeExtension(${index})">Remove</button>
                    <label class="ext-item__switch" aria-labelledby="ext-${index}-title">
                        <input type="checkbox" ${element.isActive ? "checked" : ""} />
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
        `;
        }
    });
    extensionsContainer.innerHTML = html;
}
