import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { startTimeButton } from './refs';

startTimeButton.addEventListener('click', onStartTimeBtn);

startTimeButton.disabled = true;

function onStartTimeBtn() {

}

flatpickr('.data-time', {
  minDate: Date.now(),
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  onChange: function (selectedDates, dateStr, instance) {
    console.log(dateStr);
  },
});