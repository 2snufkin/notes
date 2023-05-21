# CryptoJS
CryptoJS is a JavaScript library that provides cryptographic functionalities for web applications. It supports various encryption, hashing, and other cryptographic algorithms. With CryptoJS, developers can easily implement security features in their applications using a simple API. However, it's important to consider security risks and newer alternatives like the Web Crypto API.


## Algo
The library provides implementations of various symmetric and asymmetric encryption algorithms:
+ AES (Advanced Encryption Standard)
+ DES (Data Encryption Standard)
+ Triple DES, RC4, and more.
It also supports various hash functions like MD5, SHA-1, SHA-256, SHA-512, and HMAC (Hash-based Message Authentication Code).

## Data encodings
One of the notable features of CryptoJS is its support for different data encodings. It includes encoders for encoding and decoding data in various formats, such as:
+ Hex
+ Base64 
+ Latin1
+ UTF-8, and more. 

## Add packadge
`npm install crypto-js`

## Using AES
```js
const CryptoJS = require("crypto-js")
//or
import * as CryptoJS from 'crypto-js';


//replace secret with your secret key. save it as a env. variable

export function encryptData(data: string): string {
  const encryptedData = CryptoJS.AES.encrypt(data, secret);
  // if you want to save it as a string(in a database for example) call the toString() on encryptedData
  return encryptedData;
}


export function decryptData(encryptedData: string): string {
	const decrypted = CryptoJS.AES.decrypt(encryptedData, secret)
	const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
	return decrypted
}





```