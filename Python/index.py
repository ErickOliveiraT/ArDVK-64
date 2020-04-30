from ArDVK64 import ArDVK64

#Codification/Decodification examples:
encoded = ArDVK64.encode('loren ipsum')
print('Encoded: ', encoded)
decoded = ArDVK64.decode(encoded)
print('Decoded: ', decoded)