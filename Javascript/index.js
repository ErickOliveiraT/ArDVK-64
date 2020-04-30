const ArDVK64 = require('./ArDVK-64');

const ardvk = new ArDVK64();

//Codification/Decodification examples:
let enc = ardvk.encode('lorem ipsum');
console.log('Encoded: ', enc);
let dec = ardvk.decode(enc);
console.log('Decoded: ', dec);