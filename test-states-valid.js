#! /usr/bin/env node

const assert = require('assert')
const fs = require('fs')
const CRDTs = require('delta-crdts')
const { decode } = require('delta-crdts-msgpack-codec')
const concat = require('concat-stream')

const chromeBase64 = fs.readFileSync('state-chrome.base64')
const encodedChrome = Buffer.from(chromeBase64.toString(), 'base64')
const decodedChrome = decode(encodedChrome)

// console.log('Chrome', decodedChrome)

const firefoxBase64 = fs.readFileSync('state-firefox.base64')
const encodedFirefox = Buffer.from(firefoxBase64.toString(), 'base64')
const decodedFirefox = decode(encodedFirefox)

// console.log('Firefox', decodedFirefox)

const RGA = CRDTs('rga')

const collaboration1 = RGA('imported')
collaboration1.apply(decodedChrome)
collaboration1.apply(decodedFirefox)

// console.log(collaboration1.value().join(''))

const collaboration2 = RGA('imported')
collaboration2.apply(decodedFirefox)
collaboration2.apply(decodedChrome)

// console.log(collaboration2.value().join(''))

assert(
  collaboration1.value().join('') ===
  collaboration2.value().join('')
)
