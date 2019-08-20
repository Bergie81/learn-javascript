// -----------------------------------------------------------------------------
// CLOSURES
// -----------------------------------------------------------------------------

/* Closures allow a (inner) function to access variables from an enclosing scope or environment ("parent" function of a higher order function) even after it leaves the scope in which it was declared. Saves these variables in memory.
Allow functions to have access to all variables outside of the function.
It is a combination of function and the lexical scope (the Javascript Engine knows based on where the code is written before it even run the code)*/


// Create private variables with closures to ensure data privacy
const closure = () => {
  const privateVariable = 'This data can not be changed outside the function!';
  return () => {
    return privateVariable;
  }
}
//Higher Order Function (function that returns function)

const getPrivateVariable = closure();
const privateVariableOutside = getPrivateVariable() // or closure()()
// We have access to the (value of the) variable, but it can't we changed or overwritten
// Prevent to pollute global name space