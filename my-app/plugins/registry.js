// const clientMap = new Map();

// export function register(key, fn) {
//   if (clientMap.has(key)) {
//     console.warn(`Overwriting client handler for "${key}"`);
//   }
//   clientMap.set(key, fn);
// }

// export function getClient(key) {
//   const fn = clientMap.get(key);
//   if (!fn) throw new Error(`No client registered for "${key}"`);
//   return fn;
// }