const parameters = new URLSearchParams(window.location.search);
const id = parameters.get("id");

const lableEl = document.querySelector("#lable");
const contentEl = document.querySelector(".content");
const dateEl = document.querySelector(".date");

const deleteForm = document.querySelector("#delete");

const scheduleList = JSON.parse(localStorage.getItem("schedules"));

document.addEventListener("DOMContentLoaded", () => {
    if (id) {
        const data = scheduleList.find(item => item.id == id);

        lableEl.textContent = data.lable;
        contentEl.textContent = data.content;
        dateEl.textContent = data.date;
    } else {
        window.location.href = `index.html`;
    };
    
    setTimeout(() => {
        page("show");
    }, 50);
})

window.addEventListener("beforeunload", (event) => {
    page("hide");
})

deleteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const index = scheduleList.findIndex(item => item.id == id);
    scheduleList.splice(index, 1);
    localStorage.setItem("schedules", JSON.stringify(scheduleList));

    page("hide");
    setTimeout(() => {
        window.location.href = `index.html`;
    }, 300);
})

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.reload();
    };
});

function page(type) {
    if (type === "show") {
        document.querySelector("body").classList.remove("hidden");
    } else {
        document.querySelector("body").classList.add("hidden");
    }
}