
const timersContainer = document.getElementById("timers");
const alertSound = document.getElementById("alert-sound");
const stopSoundBtn = document.getElementById("stop-sound");

const TOTAL_TIMERS = 10;
const intervals = new Array(TOTAL_TIMERS).fill(null);

for (let i = 0; i < TOTAL_TIMERS; i++) {
  createTimer(i + 1);
}

function createTimer(number) {
  const timerBox = document.createElement("div");
  timerBox.className = "timer-box";

  const label = document.createElement("div");
  label.className = "timer-label";
  label.textContent = `Timer ${number}`;

  const controls = document.createElement("div");
  controls.className = "timer-controls";

  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "60";
  input.value = "7";
  input.title = "Minutos";

  const countdown = document.createElement("div");
  countdown.className = "timer-countdown";
  countdown.textContent = `${input.value}:00`;

  const button = document.createElement("button");
  button.textContent = "Iniciar";

  controls.appendChild(input);
  controls.appendChild(button);

  timerBox.appendChild(label);
  timerBox.appendChild(controls);
  timerBox.appendChild(countdown);

  timersContainer.appendChild(timerBox);

  let timeLeft = 0;

  button.addEventListener("click", () => {
    if (intervals[number - 1]) {
      clearInterval(intervals[number - 1]);
    }

    const minutes = parseInt(input.value);
    if (isNaN(minutes) || minutes < 1 || minutes > 60) {
      alert("Por favor, insira um valor de 1 a 60 minutos.");
      return;
    }

    timeLeft = minutes * 60;
    countdown.textContent = `${minutes}:00`;
    timerBox.classList.remove("finished");

    intervals[number - 1] = setInterval(() => {
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;
      countdown.textContent = `${min}:${String(sec).padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(intervals[number - 1]);
        countdown.textContent = "✔️";
        timerBox.classList.add("finished");

        alertSound.play();
        stopSoundBtn.style.display = "inline-block";
      }

      timeLeft--;
    }, 1000);
  });
}

stopSoundBtn.addEventListener("click", () => {
  alertSound.pause();
  alertSound.currentTime = 0;
  stopSoundBtn.style.display = "none";
});
