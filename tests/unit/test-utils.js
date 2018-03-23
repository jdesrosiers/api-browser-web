// Use as a synchronous wait with async/await: `async () => await wait(0);`
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export { wait };
