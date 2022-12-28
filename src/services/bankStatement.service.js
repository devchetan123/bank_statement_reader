const axios = require("axios");
var FormData = require('form-data');

const uploadBankStatementService = async (req, envConfig, accessToken) => {

    var reqBody = req.body;
    const buff = Buffer.from(reqBody.bankStmt, 'base64');
    let data = new FormData();
    data.append("bank", reqBody.bank);
    data.append("accountType", reqBody.accountType);
    data.append("bankStmt", buff, {
        filename: 'bankStatement.pdf'
    });

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...data.getHeaders()
    };
    const response = await axios.request({
        url: `${envConfig.baseUrl}/bank-connect/api/v1/uploadStatement?access_token=${accessToken.access_token}`,
        method: "post",
        headers: headers,
        data: data,
    });

    let result = response.data;
    return result

}

const getTransactionsService = async (accountUID, envConfig, accessToken) => {

    var data = new FormData();

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...data.getHeaders()
    };

    const response = await axios.request({
        method: 'post',
        url: `${envConfig.baseUrl}/bank-account/api/v1/transactions/` + accountUID + ".json?access_token=" + accessToken.access_token,
        headers: headers,
        data: data
    });

    let result = response.data;
    return result
}

const getSummaryService = async (accountUID, envConfig, accessToken) => {
    
    var data = new FormData();

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...data.getHeaders()
    };

    const response = await axios.request({
        method: 'post',
        url: `${envConfig.baseUrl}/bank-account/api/v1/summary/` + accountUID + ".json?access_token=" + accessToken.access_token,
        headers: headers,
        data: data
    });

    let result = response.data;
    return result
}


// const uploadMultiBankStatementService = async (req) => {

//     const accessToken = await getAccessToken();

//     var jsonData = req.body;
//     var reqBody = JSON.parse(JSON.stringify(jsonData));
//     var dataLength = (Object.keys(reqBody).length) / 3;
//     var data = new FormData();
//     //let buffer = [];
//     for (let i = 0; i < dataLength; i++) {

//         buffer = Buffer.from(reqBody['statement.' + i + '.bankStmt'], 'base64');
//         //fs.writeFileSync(TEMPDIR+'multiple-bank-statement' + i + '.pdf', buffer[i]);
//         data.append('statement.' + i + '.bank', reqBody['statement.' + i + '.bank']);
//         data.append('statement.' + i + '.accountType', reqBody['statement.' + i + '.accountType']);
//         //data.append('statement.' + i + '.bankStmt', fs.createReadStream(TEMPDIR+'multiple-bank-statement' + i + '.pdf'));
//         data.append('statement.' + i + '.bankStmt', buffer, {
//             filename: 'multiple-bank-statement' + i + '.pdf'
//         });
//     }


//     let headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'multipart/form-data',
//         ...data.getHeaders()
//     };
//     const response = await axios.request({
//         method: 'post',
//         url: 'https://www.fin360.in/bank-connect/api/v1/uploadMultipleStatements?access_token=' + accessToken.access_token,
//         headers: headers,
//         data: data
//     });

//     let result = response.data;
//     return result

// }



module.exports = { uploadBankStatementService, getTransactionsService, getSummaryService };