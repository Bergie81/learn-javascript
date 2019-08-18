// -----------------------------------------------------------------------------
// SPREAD OPERATOR
// -----------------------------------------------------------------------------

//OBJECTS
const jungle = {
  bear: "Balu",
  human: "Mogli",
  panther: "Baghira",
  snake: "Kaa",
  tiger: 'Shir Khan'
}

const {
  human,
  ...animals
} = jungle;
console.log(human); // "Mogli"
console.log(animals) // { bear: "Balu", panther: "Baghira", snake: "Kaa", tiger: "Shir Khan" }


//ARRAYS
const array = [1, 2, 3, 4, 5];

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
};
sum(...array); // 15