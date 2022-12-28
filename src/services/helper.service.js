function getStatusCode(method = '') {
    switch (method) {
        case 'GET':
            return 200;
        case 'POST':
            return 201;
        case 'PUT':
            return 202;
        case 'DELETE':
            return 202;
        default:
            return 405;
    }
}

const http = (req, data) => {

    // create basic payload
    const payload = {
        statusCode: getStatusCode(req.method),
        success: true,
    };

    const isError = data.hasOwnProperty("error")
    if (isError) {
        payload.error = data["error"]
        payload.success = false
        if (data.hasOwnProperty("statusCode")) {
            payload.statusCode = data["statusCode"]
        }
    } else {
        payload.data = data
    }

    // iterate through each data item
    // for(const key in data ) {
    //     const item = data[key];
    //     const smallLetterKey = key.toLocaleLowerCase()
    //     if(smallLetterKey === 'error') {
    //         payload.error = item;
    //         payload.success = false;
    //     }
    //     else{
    //         payload.data = data
    //     }
    // }

    return payload;

}

const errorHandler = (err = null, message = null, code = 500) => {
    try {

        message = message ? message : 'something went wrong';

        // setup code base on the type of validation
        if (err && err.name === 'ValidationError') code = 400;
        // if(err && err.name !== 'ValidationError') this.logError(err);

        let payload = {
            statusCode: code,
            error: {
                message: message
            }
        };

        // errcode is present, then add it to response
        if (err.errCode && err.errCode.length > 0) {
            const error = {
                message: payload.error.message,
                error: err.errCode
            }
            payload.error = error;
        }

        return payload;

    } catch (err) { }

};


module.exports = { errorHandler, http }

