const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'
const special = '/+'
const pos = upper + lower + digits + special

function getHex(ent) {
  return Buffer.from(ent, 'utf8').toString('hex');
}

function hexToString(str) {
  return Buffer.from(str, 'hex').toString('utf8');
}

function getBinary(string) {
  return string.split('').map(function (char) {
    let bin = char.charCodeAt(0).toString(2)
    if (bin.length == 8) return bin;
    else {
      let dif = 8-bin.length;
      let fixed = new String();
      for (let i = 0; i < dif; i++) fixed += '0';
      return fixed+bin;
    }
  }).join('');
}

function getBlocks(ent) {
  let count = 0;
  let block = new String();
  let blocks = new Array();
  for (i in ent) {
    block += ent[i];
    count += 1;
    if (count == 6) {
      blocks.push(block);
      block = new String();
      count = 0;
    }
  }
  blocks.push(block);
  let last_block = blocks[blocks.length-1];
  let zeros_added = 0;
  if (last_block.length < 6) {
    let new_last = last_block;
    let dif = 6-last_block.length;
    for (i = 0; i < dif; i++) { 
      new_last += '0';
      zeros_added += 1;
    }
    blocks.pop();
    blocks.push(new_last);
  }
  return {blocks: blocks, zeros: zeros_added};
}

function getDec(bin) {
  return parseInt(bin, 2);
}

function reverseString(str) { 
   return str.split('').reverse().join('') 
} 

function assemble(blocks_data) {
  let encoded = new String();
  blocks_data.blocks.forEach((block) => {
    encoded += pos[getDec(block)];
  });
  return reverseString(encoded+blocks_data.zeros.toString());
}

function binaryToString(str) {
  str = str.replace(/\s+/g, ''); //Remove spaces
  str = str.match(/.{1,8}/g).join(" "); //Divides in bytes
  var newBinary = str.split(" ");
  var binaryCode = [];
  for (i = 0; i < newBinary.length; i++) {
    binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
  }   
  return binaryCode.join("");
}

function disassemble(encoded) {
  encoded = reverseString(encoded);
  const zeros_added = Number(encoded[encoded.length-1]);
  let blocks = new Array();
  for (let i = 0; i < encoded.length-1; i++) {
    let index = pos.indexOf(encoded[i]);
    let binary = index.toString(2);
    if (binary.length < 6) {
      let dif = 6-binary.length;
      let new_bin = new String();
      for (let i = 0; i < dif; i++) new_bin += '0';
      new_bin += binary;
      blocks.push(new_bin);
    }
    else blocks.push(binary);
  }
  let bin = new String();
  blocks.forEach((block) => {
    bin += block;
  });
  if (zeros_added > 0){
    for (let i = 0; i < zeros_added; i++) bin += '0'
  }
  return bin;
}

function encode(msg) {
  let bin = getBinary(getHex(msg));
  let blocks_return = getBlocks(bin);
  let encoded = assemble(blocks_return);
  return encoded;
}

function decode(encoded) {
  const bin = disassemble(encoded);
  const hex = binaryToString(bin);
  const dec = hexToString(hex);
  return dec;
}

let enc = encode('loren ipsum');
console.log('Encoded: ', enc);
let dec = decode(enc);
console.log('Decoded: ', dec);