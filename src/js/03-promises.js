import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(delay, position) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      
      if (Math.random() > 0.3) {
        resolve({ delay, position });
      } else {
        reject({ delay, position });
      }
    }, delay);
  });
}

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', onFormElem);

function onFormElem(event) {
  event.preventDefault();

  let firstdelay = +event.currentTarget.elements.delay.value;
  let delay = +event.currentTarget.elements.step.value;
  let amount = +event.currentTarget.elements.amount.value;

  for (let i = 0; i < amount; i++) {
    let newdelay = firstdelay + delay * i;

    createPromise(newdelay, i + 1)
      .then(({ delay, position }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ delay, position }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }
}
