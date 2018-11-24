interface BitsStorage extends Array<string> { }

const BITS_IN_BYTE = 8
const BINARY_RADIX = 2
const LEFT_BIT_PADDED = '0'

class BitsAdapter {
    private readonly _bits: BitsStorage

    public constructor() {
        this._bits = []
    }

    public getBits(count?: number): string {
        if(!count || count > this._bits.length) {
            return this._bits.join('')
        }

        return this._bits.splice(0, count).join('')
    }

    public storeBuffer(bytes: Buffer): boolean {
        if (!bytes) {
            return false
        }

        bytes.forEach(this._addToStorage)
        return true
    }

    protected _addToStorage = (byte: number): void => {
        this._bits.push(...this._padToByteLength(byte).split(''))
    }

    protected _padToByteLength = (num: number): string => {
        return num.toString(BINARY_RADIX).padStart(BITS_IN_BYTE, LEFT_BIT_PADDED)
    }
}

export default BitsAdapter
