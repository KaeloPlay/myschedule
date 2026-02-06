const contentInput = document.querySelector("#contentinput")
const lableInput = document.querySelector("#lableinput");
const saveForm = document.querySelector("#save");
const dateInput = document.querySelector("#dateinput");

document.addEventListener("DOMContentLoaded", () => {
    page("show");
});

contentInput.addEventListener("input", () => {
    contentInput.style.height = "auto";
    contentInput.style.height = contentInput.scrollHeight + "px";
});

lableInput.addEventListener("input", () => {
    let width = lableInput.clientWidth;

    width = Math.floor(width / 9);
    lableInput.maxLength = width;
});

saveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const lable = lableInput.value;
    let content = contentInput.value;
    if (content === "") {
        content = "No content.";
    };
    const date = dateInput.value;
    
    if (!lable || !date) {
        alert("Some inputs can not be missing!");
        return;
    };

    const scheduleList = JSON.parse(localStorage.getItem("schedules")) || [];
    const latestId = scheduleList.length > 0 ? scheduleList[scheduleList.length - 1].id + 1: 0;
    
    console.log(latestId,lable, content, date);
    const data = { id: latestId, lable: lable, date: date, content: content };

    scheduleList.push(data);
    localStorage.setItem("schedules", JSON.stringify(scheduleList));

    page("hide");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 300);
});

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