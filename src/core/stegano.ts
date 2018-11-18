import HideInput from '../interfaces/hideInput';
import utils from '../util/common'
import errors from '../consts/errors'
import * as fs from 'fs'

class Stegano {
    public async hide(input: HideInput): Promise<ResultObject> {
        try {
            const validation = this._validateInput(input)
            if (!validation.success) {
                return {
                    success: false,
                    error: validation.error
                }
            }

        } catch (err) {
            console.log(err)
            return utils.resultError(`Unknown error occurred`)
        }
    }

    protected _validateInput(input: HideInput): ResultObject {
        let validation
        if (!(validation = this._validatePath(input.path)).success) {
            return utils.resultError(validation.error)
        }

        if (!(validation = this._validateData(input.data)).success) {
            return utils.resultError(validation.error)
        }

        return utils.resultSuccess()
    }

    protected _validatePath(path: string): ResultObject {
        const exists = fs.existsSync(path)
        return exists ? utils.resultSuccess() : utils.resultError(errors.WRONG_PATH_ERROR)
    }

    protected _validateData(data: string): ResultObject {
        const isValid = !!data && data.length > 0
        return isValid ? utils.resultSuccess() : utils.resultError(errors.NO_DATA_PROVIDED_ERROR)
    }
}

export default Stegano