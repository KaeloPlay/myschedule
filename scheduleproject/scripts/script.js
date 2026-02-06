const template = document.querySelector("#schedule-template");
const container = document.querySelector(".container");
const addInput = document.querySelector("#addinput")
let scheduleList = [];

document.addEventListener("DOMContentLoaded", () => {
    scheduleList = JSON.parse(localStorage.getItem("schedules")) || [];

    if (scheduleList.length === 0) {
        localStorage.setItem("schedules", JSON.stringify([
        { id: 0, lable:"This is a schedule!", date:"0", content:"Try to make a new one!" },
    ]))};

    console.log(scheduleList);
    if (scheduleList.length > 0) {
        cloneSche();
    }

    page("show");
})

container.addEventListener("click", (e) => {
    const schedule = e.target.closest(".schedule");
    if (!schedule) return;

    const id = schedule.dataset.id;
    console.log(id);

    page("hide");
    setTimeout(() => {
       window.location.href = `details.html?id=${id}`;
    }, 300);
})

addInput.addEventListener("click", () => {
    page("hide");
    setTimeout(() => {
      window.location.href = "add.html";  
    }, 300);
})

function cloneSche() {
    let data;

    for (let i = 0; i < scheduleList.length; i++) {
        data = scheduleList[i];

        const clone = template.content.cloneNode(true);
        clone.querySelector(".schedule").dataset.id = data.id;
        
        clone.querySelector(".lable").textContent = data.lable;
        clone.querySelector(".date").textContent = data.date;

        const clientTimezone = new Date();
        let clientDate = clientTimezone.toLocaleDateString();

        let scheduleDate;
        scheduleDate = new Date(data.date);
        clientDate = new Date()

        let sts;
        const statusEl = clone.querySelector(".status");
        sts = scheduleDate >= clientDate ? "Active" : "Expired";
        statusEl.innerHTML = sts;

        if (sts === "Active") {
            statusEl.style.color = "#008000"
            statusEl.style.fontWeight = 'bold';
        }
        
        container.appendChild(clone)
    }
}

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