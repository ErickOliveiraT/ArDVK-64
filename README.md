# ArDVK-64
An encoding algorithm based on Base 64

#### Javascript Version Usage:
```javascript
const ArDVK64 = require('./ArDVK-64');

const ardvk = new ArDVK64();

//Codification/Decodification examples:
let enc = ardvk.encode('lorem ipsum');
console.log('Encoded: ', enc);
let dec = ardvk.decode(enc);
console.log('Decoded: ', dec);
```
#### Python Version Usage:
```python
from ArDVK64 import ArDVK64

#Codification/Decodification examples:
encoded = ArDVK64.encode('loren ipsum')
print('Encoded: ', encoded)
decoded = ArDVK64.decode(encoded)
print('Decoded: ', decoded)
```