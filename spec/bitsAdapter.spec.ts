import BitsAdapter from '../src/core/bitsAdapter'

class TestBitsAdapter extends BitsAdapter {}

describe('BitsAdapter storage spec', () => {
    let input, flacMarker, bitsAdapter
    const f = '01100110'
    const L = '01001100'
    const a = '01100001'
    const C = '01000011'
    

    beforeAll(() => {
        input = flacMarker = Buffer.alloc(4, 'fLaC')
        bitsAdapter = new TestBitsAdapter()
    })

    it('bitsStorage should initialize with an empty storage', () => {
        expect(bitsAdapter._getBitsStorage()).toEqual([])
    })

    it('storeBuffer should return false with null input', () => {
        expect(bitsAdapter.storeBuffer(null)).toBe(false)
    })

    it(`storeBuffer should return true with 'fLaC' input`, () => {
        expect(bitsAdapter.storeBuffer(input)).toBe(true)
    })

    it(`getBitsAsString should return all storage content if called with no arguments: 'fLaC' binary representation`, () => {
        expect(bitsAdapter.getBitsAsString()).toEqual(f + L + a + C)
    })

    it(`getBitsAsString should return only 16 bits string if called with argument 16: 'fL' binary representation`, () => {
        bitsAdapter.storeBuffer(input)
        expect(bitsAdapter.getBitsAsString(16)).toEqual(f + L)
    })    

    it(`bitsStorage should have 16 bits remaining: 'aC' binary representation`, () => {
        expect(bitsAdapter._getBitsStorage().join('')).toEqual(a + C)
    })

    it(`getBitsAsString should return all storage content if called with argument > than storage size`, () => {
        bitsAdapter._flush()
        bitsAdapter.storeBuffer(input)
        expect(bitsAdapter._getBitsStorage(100).join('')).toEqual(f + L + a + C)
    })

    it(`_padToByteLength should return '00000001' for input '1'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '00000010' for input '2'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '00000100' for input '4'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '00001000' for input '8'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '00010000' for input '16'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '00100000' for input '32'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '01000000' for input '64'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '10000000' for input '128'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })

    it(`_padToByteLength should return '11111111' for input '255'`, () => {
        expect(bitsAdapter._padToByteLength(1)).toEqual('00000001')
    })
})