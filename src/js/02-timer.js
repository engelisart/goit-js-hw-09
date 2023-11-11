import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { startButton, startTimeButton } from './refs';

startTimeButton.addEventListener('click', onStartTimeBtn);

startTimeButton.disabled = true;

const timer = {
  intervalId: null,
  deadline: new Date(2023, 10, 12),
  refs: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();

      if (diff < 0) {
        this.stop();

        return;
      }

      let { days, hours, minutes, seconds } = this.getTimeComponents(diff);

      this.refs.days.textContent = this.pad(days);
      this.refs.hours.textContent = this.pad(hours);
      this.refs.minutes.textContent = this.pad(minutes);
      this.refs.seconds.textContent = this.pad(seconds);

      console.log(this.getTimeComponents(diff));
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

function onStartTimeBtn() {
  timer.start();
}

flatpickr('.data-time', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  onChange: function (selectedDates, dateStr, instance) {
    now = Date.now();

    selected = selectedDates[0];

    if (now >= selected) {
      Notify.failure('Please choose a date in the future');

      startButton.disabled = true;
    } else {
      startButton.disabled = false;

      timer.deadline = selected;
    }
  },
});
