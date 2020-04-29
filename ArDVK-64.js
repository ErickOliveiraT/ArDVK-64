const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'
const special = '/+'
const pos = upper + lower + digits + special

function getHex(ent) {
  return Buffer.from(ent, 'utf8').toString('hex');
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

function encode(blocks_data) {
  let encoded = new String();
  blocks_data.blocks.forEach((block) => {
    encoded += pos[getDec(block)];
  });
  return reverseString(encoded+blocks_data.zeros.toString());
}



let msg = 'Ola'

let bin = getBinary(getHex(msg))
console.log(bin);
let blocks_return = getBlocks(bin);
console.log(blocks_return);
let encoded = encode(blocks_return);
console.log(encoded)