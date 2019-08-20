// -----------------------------------------------------------------------------
// PROMISES
// -----------------------------------------------------------------------------

const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve('It worked');
  } else {
    reject('An error occured');
  }
});

promise.then(result => console.log(result));
// === EQUAL TO ===
// promise.then((result) => { return console.log(result) });
// promise.then(console.log);


// CHAINING
promise
  .then(result1 => result1 + "!")
  .then(result2 => console.log(result2));


// ERROR HANDLING
promise
  .then(result => {
    throw Error('Ooops!') //create an error
    console.log(result); // ...not logged
  })
  .catch(error => console.log("Show error: ", error)) // has to be at the end!
  .finally(() => console.log('finally.. ')); // will be logged no matter if promise resolved or rejected


// EXAMPLES
// fetch returns a promise
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data));



// -----------------------------------------------------------------------------
//  ASYNC AWAIT
// -----------------------------------------------------------------------------
// Syntactic sugar for promises

// Simple example with fetch from above
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
};
// === EQUAL TO ===
//const fetchUsers = async function() { //code }


// ERROR HANDLING
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    throw Error('Ooops!')
    console.log(data);
  } catch (error) {
    console.log('Show Error: ', error);
  };
};


// PARALLEL, SEQUENCE, and RACE
const promisify = (item, delay) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

// All promises run at the same time
async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `PARALLEL is done: ${output1} ${output2} ${output3}`;
};

// Next promise starts after the previous has finished
async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `SEQUENCE is done: ${output1} ${output2} ${output3}`;
};

// Start all promises, waits for the first promise and ignores all other
async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `RACE is done: ${output1}`;
};

sequence().then(console.log);
parallel().then(console.log);
race().then(console.log);


// EXAMPLES
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
];

const getData1 = async function () {
  try {
    const [users, posts, albums] = await Promise.all(urls.map(async function (url) {
      const response = await fetch(url);
      return response.json();
    }))
    console.log('Users: ', users);
    console.log('Posts: ', posts);
    console.log('albums: ', albums);
  } catch (error) {
    console.log('Show error: ', error);
  }
};

// getData1 with AWAIT FOR (ES2018): loop through multiple promises
const getData2 = async function () {
  const arrayOfPromises = urls.map(url => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};