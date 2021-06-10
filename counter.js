window.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector(".play");
  const pouseBtn = document.querySelector(".pouse");
  const input = document.querySelector("input");
  const circle = document.querySelector("circle");
  const resetBtn = document.querySelector(".reset");
  const fixTheScreenHeight = () => {
    document.documentElement.style.setProperty(
      "--fullHeight",
      `${window.innerHeight}px`
    );
  };
  fixTheScreenHeight();
  const perimiter = circle.getAttribute("r") * 2 * Math.PI;
  circle.setAttribute("stroke-dasharray", perimiter);

  class Timer {
    constructor(currentVal, playButton, pouseButton, resetButton, callbacks) {
      this.currentVal = currentVal;
      this.playButton = playButton;
      this.pouseButton = pouseButton;
      this.resetButton = resetButton;

      if (callbacks) {
        const { onStart, onStop, onComplete, onReset } = callbacks;
        this.onStart = onStart;
        this.onStop = onStop;
        this.onComplete = onComplete;
        this.onReset = onReset;
      }
      this.playButton.addEventListener("click", this.start);
      this.pouseButton.addEventListener("click", this.stop);
      this.resetButton.addEventListener("click", this.reset);
    }
    handleRemoveAddListener = (condition) => {
      if (condition) {
        this.playButton.removeEventListener("click", this.start);
      } else {
        this.playButton.addEventListener("click", this.start);
      }
    };
    start = () => {
      if (input.value.trim() !== "") {
        if (this.onStart) {
          this.onStart(this.timeRemaining);
        }
        this.intevralId = setInterval(this.tick, 10);
        this.handleRemoveAddListener(true);
      }
      return;
    };
    stop = () => {
      clearInterval(this.intevralId);
      if (this.onStop) {
        this.onStop();
        this.handleRemoveAddListener(false);
      }
    };
    reset = () => {
      this.timeRemaining = 0;
      this.stop();
      if (this.onReset) {
        this.onReset();
      }
    };
    tick = () => {
      if (this.timeRemaining <= 0) {
        this.stop();
      } else {
        this.timeRemaining = this.timeRemaining - 0.01;
        if (this.onComplete) {
          this.onComplete(this.timeRemaining);
        }
      }
    };

    get timeRemaining() {
      return parseFloat(this.currentVal.value);
    }
    set timeRemaining(time) {
      this.currentVal.value = time.toFixed(2);
    }
  }
  let totalDuration = 0;
  let flag = true;
  let restTime = 0;

  const newTimer = new Timer(input, playBtn, pouseBtn, resetBtn, {
    onStart(duration) {
      if (flag || restTime === 0) {
        totalDuration = duration;
      }
    },

    onStop() {
      flag = false;
    },
    onReset() {
      circle.setAttribute("stroke-dashoffset", 0);
      flag = !flag;
    },
    onComplete(timeLeft) {
      restTime = timeLeft;
      const number = (perimiter * timeLeft) / totalDuration - perimiter;
      circle.setAttribute("stroke-dashoffset", number);
    },
  });
});
