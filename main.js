const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg"];
let index = 0;
let intervalID;

function changeImage() {
    if (index >= images.length - 1) {  //Stop when index reaches 36
        clearInterval(intervalID);  //Stop the interval
        return;
    }    
    index++;
    document.getElementById("streetlightImage").src = images[index];  
}

function imageChanger() {
    let timeInput = document.getElementById("switchTime").value;
    let intervalInput = parseInt(document.getElementById("interval").value) * 1000; //Convert to ms
    intervalInput = intervalInput / 36;

    if (!timeInput || isNaN(intervalInput) || intervalInput <= 0) {
        alert("Please enter valid values for both fields.");
        return;
    }

    let now = new Date();
    let [hours, minutes] = timeInput.split(":").map(Number);
    let firstChangeTime = new Date();
    firstChangeTime.setHours(hours, minutes, 0, 0);

    let delay = firstChangeTime - now;
    if (delay < 0) {
        delay += 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
        changeImage();
        intervalID = setInterval(changeImage, intervalInput);
    }, delay);
}
