const clockContainer = document.querySelector(".clockContainer");
const clock = clockContainer.querySelector(".clock");


var getClock = function() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();

    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`;

}

function init() {
    setInterval(function() {
        getClock();
    }, 1000);
}

init();
