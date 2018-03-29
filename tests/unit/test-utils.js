// Use as a synchronous wait with async/await: `async () => await wait(0);`
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Given = (message, fn) => describe("Given " + message, fn);
const When = (message, fn) => describe("When " + message, fn);
const Then = (message, fn) => it("Then " + message, fn);
const And = (message, fn) => describe("And " + message, fn);

export { Given, When, Then, And, wait };
