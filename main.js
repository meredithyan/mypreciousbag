const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

/* 1. the promise version of the "callback hell"  */
alice1.animate(aliceTumbling, aliceTiming);

const promise1=alice1.animate(aliceTumbling, aliceTiming).finished;
    
promise1.then(() => {
    alice2.animate(aliceTumbling, aliceTiming);
    const promise2=alice2.animate(aliceTumbling, aliceTiming).finished;
    promise2.then(() => {
        alice3.animate(aliceTumbling, aliceTiming);
    });
});

/* 2. the promise chain version  */
promise1
    .then(() => {
    alice2.animate(aliceTumbling, aliceTiming);
    return alice2.animate(aliceTumbling, aliceTiming).finished;
    })
    .then(() => {
        alice3.animate(aliceTumbling, aliceTiming);
    })
    .catch(error =>console.error(`there is something wrong: ${error}`));


    /* 3. implement it using async and await */
async function anima() {
    alice1.animate(aliceTumbling, aliceTiming);
  try {
    const pro1 = await alice1.animate(aliceTumbling, aliceTiming).finished;
    if (pro1){
        alice2.animate(aliceTumbling, aliceTiming);
        const pro2 = await alice2.animate(aliceTumbling, aliceTiming).finished;
        if (pro2){
            alice3.animate(aliceTumbling, aliceTiming);
        }
    }
  }
  catch(error) {
    console.error(`there is something wrong: ${error}`);
  }
}

anima();

