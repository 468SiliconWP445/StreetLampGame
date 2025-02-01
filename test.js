let streetlights = [
    { id: "streetlight1", index: 0, interval: 0, sensitivity: 0, switchTime: "" },
    { id: "streetlight2", index: 0, interval: 0, sensitivity: 0, switchTime: "" },
    { id: "streetlight3", index: 0, interval: 0, sensitivity: 0, switchTime: "" }
];

let intervalIDs = {};

function changeImage(streetlight) {
    if (streetlight.index >= images.length - 1) {
        clearInterval(intervalIDs[streetlight.id]);
        console.log(`Stopped at index: ${streetlight.index} for ${streetlight.id}`);
        return;
    }

    streetlight.index++;
    document.getElementById(streetlight.id).src = images[streetlight.index];
}

function startStreetlight(streetlight) {
    let now = new Date();
    let [hours, minutes] = streetlight.switchTime.split(":").map(Number);

    let firstChangeTime = new Date();
    firstChangeTime.setHours(hours, minutes, 0, 0);

    let randomOffset = Math.floor(Math.random() * (2 * streetlight.sensitivity + 1)) - streetlight.sensitivity;
    firstChangeTime.setMinutes(firstChangeTime.getMinutes() + randomOffset);

    let delay = firstChangeTime - now;
    if (delay < 0) {
        delay += 24 * 60 * 60 * 1000;
    }

    console.log(`Scheduled ${streetlight.id} at: ${firstChangeTime.toLocaleTimeString()} (Offset: ${randomOffset} min)`);

    setTimeout(() => {
        changeImage(streetlight);
        intervalIDs[streetlight.id] = setInterval(() => changeImage(streetlight), streetlight.interval);
    }, delay);
}

function imageChanger() {
    streetlights.forEach((streetlight, i) => {
        let timeInput = document.getElementById(`switchTime${i + 1}`).value;
        let intervalInput = parseInt(document.getElementById(`interval${i + 1}`).value) * 1000;
        let sensitivityInput = parseInt(document.getElementById(`sensitivity${i + 1}`).value);

        if (!timeInput || isNaN(intervalInput) || intervalInput <= 0 || isNaN(sensitivityInput)) {
            alert(`Please enter valid values for ${streetlight.id}`);
            return;
        }

        streetlight.switchTime = timeInput;
        streetlight.interval = intervalInput;
        streetlight.sensitivity = sensitivityInput;

        startStreetlight(streetlight);
    });
}
