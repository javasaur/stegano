const resultError = (error: string): ResultObject => {
    return {
        success: false,
        error,
    }
}

const resultSuccess = (): ResultObject => {
    return {
        success: true
    }
}

export default {
    resultError,
    resultSuccess
}