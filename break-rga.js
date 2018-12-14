const CRDTs = require('delta-crdts')

const RGA = CRDTs('rga')

const rgaAbc = RGA('abc')
rgaAbc.push('a')
rgaAbc.push('b')
rgaAbc.push('c')
console.log('ABC:', rgaAbc.value().join(''))

const rgaDef = RGA('def')
rgaDef.push('d')
rgaDef.push('e')
rgaDef.push('f')
console.log('DEF:', rgaDef.value().join(''))

const rgaAbcdef1 = RGA('abcdef1')
rgaAbcdef1.apply(rgaAbc.state())
rgaAbcdef1.apply(rgaDef.state())
console.log('ABCDEF (1):', rgaAbcdef1.value().join(''))

const rgaAbcdef2 = RGA('abcdef2')
rgaAbcdef2.apply(rgaDef.state())
rgaAbcdef2.apply(rgaAbc.state())
console.log('ABCDEF (2):', rgaAbcdef2.value().join(''))

const rgaX = RGA('x')
rgaX.push('X')
console.log('X:', rgaX.value().join(''))

const rgaAbcdefx1 = RGA('abcdefx1')
rgaAbcdefx1.apply(rgaAbc.state())
rgaAbcdefx1.apply(rgaDef.state())
rgaAbcdefx1.apply(rgaX.state())
console.log('ABCDEFX (1):', rgaAbcdefx1.value().join(''))

const rgaAbcdefx2 = RGA('abcdefx2')
rgaAbcdefx2.apply(rgaAbc.state())
rgaAbcdefx2.apply(rgaX.state())
rgaAbcdefx2.apply(rgaDef.state())
console.log('ABCDEFX (2):', rgaAbcdefx2.value().join(''))

const rgaAbcdefx3 = RGA('abcdefx3')
rgaAbcdefx3.apply(rgaX.state())
rgaAbcdefx3.apply(rgaAbc.state())
rgaAbcdefx3.apply(rgaDef.state())
console.log('ABCDEFX (3):', rgaAbcdefx3.value().join(''))

const rgaAbcdefx4 = RGA('abcdefx4')
rgaAbcdefx4.apply(rgaDef.state())
rgaAbcdefx4.apply(rgaAbc.state())
rgaAbcdefx4.apply(rgaX.state())
console.log('ABCDEFX (4):', rgaAbcdefx4.value().join(''))

const rgaAbcdefx5 = RGA('abcdefx5')
rgaAbcdefx5.apply(rgaDef.state())
rgaAbcdefx5.apply(rgaX.state())
rgaAbcdefx5.apply(rgaAbc.state())
console.log('ABCDEFX (5):', rgaAbcdefx5.value().join(''))

const rgaAbcdefx6 = RGA('abcdefx6')
rgaAbcdefx6.apply(rgaX.state())
rgaAbcdefx6.apply(rgaDef.state())
rgaAbcdefx6.apply(rgaAbc.state())
console.log('ABCDEFX (6):', rgaAbcdefx6.value().join(''))

const rgaAbcdefy1 = RGA('abcdefy1')
rgaAbcdefy1.apply(rgaAbc.state())
rgaAbcdefy1.apply(rgaDef.state())
const deltaY = rgaAbcdefy1.insertAt(3, 'Y')
console.log('ABCDEFY (1):', rgaAbcdefy1.value().join(''))

const rgaAbcdefy1a = RGA('abcdefy1a')
rgaAbcdefy1a.apply(rgaAbc.state())
rgaAbcdefy1a.apply(rgaDef.state())
rgaAbcdefy1a.apply(deltaY)
console.log('ABCDEFY (1a):', rgaAbcdefy1a.value().join(''))

const rgaAbcdefy2 = RGA('abcdefy2')
rgaAbcdefy2.apply(rgaDef.state())
rgaAbcdefy2.apply(rgaAbc.state())
rgaAbcdefy2.apply(deltaY)
console.log('ABCDEFY (2):', rgaAbcdefy2.value().join(''))

const rgaAbcdefy3 = RGA('abcdefy3')
rgaAbcdefy3.apply(rgaAbc.state())
rgaAbcdefy3.apply(deltaY)
rgaAbcdefy3.apply(rgaDef.state())
console.log('ABCDEFY (3):', rgaAbcdefy3.value().join(''))

const rgaAbcdefy4 = RGA('abcdefy4')
rgaAbcdefy4.apply(deltaY)
rgaAbcdefy4.apply(rgaAbc.state())
rgaAbcdefy4.apply(rgaDef.state())
console.log('ABCDEFY (4):', rgaAbcdefy4.value().join(''))

const rgaAbcdefy5 = RGA('abcdefy5')
rgaAbcdefy5.apply(deltaY)
rgaAbcdefy5.apply(rgaDef.state())
rgaAbcdefy5.apply(rgaAbc.state())
console.log('ABCDEFY (5):', rgaAbcdefy5.value().join(''))

const rgaAbcdefy6 = RGA('abcdefy6')
rgaAbcdefy6.apply(rgaDef.state())
rgaAbcdefy6.apply(deltaY)
rgaAbcdefy6.apply(rgaAbc.state())
console.log('ABCDEFY (6):', rgaAbcdefy6.value().join(''))

console.log('X State', rgaX.state())
console.log('Y Delta', deltaY)

const rgaDefy1 = RGA('defy1')
rgaDefy1.apply(rgaDef.state())
rgaDefy1.apply(deltaY)
console.log('DEFY (1):', rgaDefy1.value().join(''))

const rgaDefy2 = RGA('defy2')
rgaDefy2.apply(deltaY)
rgaDefy2.apply(rgaDef.state())
console.log('DEFY (2):', rgaDefy2.value().join(''))

const rgaAbcy1 = RGA('abcy1')
rgaAbcy1.apply(rgaAbc.state())
rgaAbcy1.apply(deltaY)
console.log('ABCY (1):', rgaAbcy1.value().join(''))

const rgaAbcy2 = RGA('abcy2')
rgaAbcy2.apply(deltaY)
rgaAbcy2.apply(rgaAbc.state())
console.log('ABCY (2):', rgaAbcy2.value().join(''))




