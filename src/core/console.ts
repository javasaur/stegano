import HideInput from '../interfaces/hideInput'

class Console {
    public getUserInput(): HideInput {
        const [path, data, ...flags] = [...this.getRawInput()]
        return {
            path,
            data,
            flags
        }
    }

    private getRawInput(): string[] {
        // First 2 arguments are system
        return process.argv.slice(2)
    }
}

export default Console