#! /usr/bin/env node

const assert = require('assert')
const fs = require('fs')

const CRDTs = require('delta-crdts')
const { decode } = require('delta-crdts-msgpack-codec')
const concat = require('concat-stream')
const chalk = require('chalk')

const chromeBase64 = fs.readFileSync('state-chrome.base64')
const encodedChrome = Buffer.from(chromeBase64.toString(), 'base64')
const decodedChrome = decode(encodedChrome)

// console.log('Chrome', decodedChrome)

const firefoxBase64 = fs.readFileSync('state-firefox.base64')
const encodedFirefox = Buffer.from(firefoxBase64.toString(), 'base64')
const decodedFirefox = decode(encodedFirefox)

// console.log('Firefox', decodedFirefox)

// console.log('Jim', decodedChrome)

function makePosMap (decoded) {
  const [vertices, removed, edges] = decoded
  const posMap = []
  const idToPos = []

  let id = null
  let pos = -1
  // console.log('Id', id)
  while (true) {
    const edge = edges.get(id)
    // console.log('Edge', id, '-->', edge)
    //console.log('Id', id)
    id = edge
    if (!id) break
    pos++  
    const vertex = vertices.get(id)
    const removedVertex = removed.has(id)
    posMap[pos] = {
      id,
      vertex,
      removedVertex
    }
    idToPos[id] = pos
  }
  return [posMap, idToPos]
}

const [posMapChrome, idToPosChrome] = makePosMap(decodedChrome)
const [posMapFirefox, idToPosFirefox] = makePosMap(decodedFirefox)

for (let pos = 0; pos < posMapChrome.length; pos++) {
  const { id } = posMapChrome[pos]
  console.log('C:', pos, posMapChrome[pos], '=> F:', idToPosFirefox[id])
}

console.log()

for (let pos = 0; pos < posMapFirefox.length; pos++) {
  const { id } = posMapFirefox[pos]
  console.log('F:', pos, posMapFirefox[pos], '=> C:', idToPosChrome[id])
}

