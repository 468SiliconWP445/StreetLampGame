const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg"];
let streetlights = [
    { id: "streetlight1", index: 0, interval: 0, sensitivity: 0, switchTime: "" },
    { id: "streetlight2", index: 0, interval: 0, sensitivity: 0, switchTime: "" },
    { id: "streetlight3", index: 0, interval: 0, sensitivity: 0, switchTime: "" }
];

let intervalIDs = {};

function changeImage(streetlight) {
    if (streetlight.index >= images.length - 1) {
        clearInterval(intervalIDs[streetlight.id]);
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

    setTimeout(() => {
        changeImage(streetlight);
        intervalIDs[streetlight.id] = setInterval(() => changeImage(streetlight), streetlight.interval);
    }, delay);
}

function imageChanger() {
    streetlights.forEach((streetlight, i) => {
        let timeInput = document.getElementById(`switchTime${i + 1}`).value;
        let intervalInput = parseInt(document.getElementById(`interval${i + 1}`).value) * 1000;
        intervalInput = intervalInput / 36;
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
