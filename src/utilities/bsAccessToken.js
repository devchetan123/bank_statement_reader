const axios = require("axios");

const getAccessToken = async (envConfig) => {

    const payload = {
        emailAddress: envConfig.emailAddress,
        password: envConfig.password
    }

    const headers = {
        "content-type": "application/json"
    };


    const response = await axios.request({
        url: `${envConfig.baseUrl}/bank-auth/api/v1/login`,
        method: "post",
        data: payload,
        headers: headers
    });

    return response.data;
};


module.exports = { getAccessToken };