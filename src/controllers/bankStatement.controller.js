const express = require("express");
const { getConfig } = require("../config/config");
const { uploadBankStatementService, getTransactionsService, getSummaryService } = require("../services/bankStatement.service");
const { errorHandler, http } = require("../services/helper.service");
const { getAccessToken } = require("../utilities/bsAccessToken");
const uuid = require("uuid");
const { apiLog, clientLog } = require("../utilities/log");
const router = express.Router();

router.post("/:env/transactions", async (req, res) => {

    const requestBody = req.body;
    const requestId = uuid.v4();
    let accountUID;
    let data = {}
    const { env } = req.params;
    const allowed = ["uat", "prod"]
    let envConfig = {}

    try {

        if (allowed.includes(env.toLowerCase())) {
            envConfig = getConfig(env.toLowerCase());
        }
        else {
            return res.status(404).json({
                statusCode: 404,
                error: {
                    message: `Not found - /${env}/summary`
                }
            });
        }

        if (!requestBody.bank) {
            throw new Error('bank key is required');
        }
        if (!requestBody.accountType) {
            throw new Error('accountType key is required');
        }
        if (!requestBody.bankStmt) {
            throw new Error('bankStmt key is required');
        }

        const accessToken = await getAccessToken(envConfig);

        const response = await uploadBankStatementService(req, envConfig, accessToken);
        accountUID = response.accountUID ?? "";

        if (!accountUID) {
            let errorMsg = "something went wrong!"
            if (response?.errorInfo) {
                errorMsg = response.errorInfo[0]?.errorMessage
            }
            throw new Error(errorMsg);
        }

        data = await getTransactionsService(accountUID, envConfig, accessToken);
    }
    catch (error) {
        data = errorHandler(error, error.message);
    }

    const response = http(req, data);

    let client_log = {
        id: requestId,
        client_name: req.CLIENTNAME,
        api_path: `/bankStatement/${env.toLowerCase()}/transactions`,
        function_name: `bank-statement-reader-${env.toLowerCase()}`,
        request_data: requestBody,
        response_data: response,
        extracted_data: "",
        status: "success",
    };

    await clientLog(client_log);

    let internal_log = {
        lt_flow_logs_id: requestId,
        thirdparty_name: "Finbit",
        env: env,
        api_path: "upload & transactions both api called",
        function_name: `bank-statement-reader-${env.toLowerCase()}`,
        request_data: requestBody,
        response_data: response,
        status: "success",
    };

    await apiLog(internal_log);

    return res.status(response.statusCode).json(response)
})



router.post("/:env/summary", async (req, res) => {

    let requestId = uuid.v4();
    const requestBody = req.body
    let accountUID;
    let data = {}
    const { env } = req.params;
    const allowed = ["uat", "prod"]
    let envConfig = {}


    try {

        if (allowed.includes(env.toLowerCase())) {
            envConfig = getConfig(env.toLowerCase());
        }
        else {
            return res.status(404).json({
                statusCode: 404,
                error: {
                    message: `Not found - /bankStatement/${env}/summary`
                }
            });
        }

        if (!requestBody.bank) {
            throw new Error('bank key is required');
        }
        if (!requestBody.accountType) {
            throw new Error('accountType key is required');
        }
        if (!requestBody.bankStmt) {
            throw new Error('bankStmt key is required');
        }

        const accessToken = await getAccessToken(envConfig);

        const response = await uploadBankStatementService(req, envConfig, accessToken);
        accountUID = response.accountUID ?? "";

        if (!accountUID) {
            let errorMsg = "something went wrong!"
            if (response?.errorInfo) {
                errorMsg = response.errorInfo[0]?.errorMessage
            }
            throw new Error(errorMsg);
        }

        data = await getSummaryService(accountUID, envConfig, accessToken);
    }
    catch (error) {
        data = errorHandler(error, error.message);
    }

    const response = http(req, data);

    let client_log = {
        id: requestId,
        client_name: req.CLIENTNAME,
        api_path: `/bankStatement/${env.toLowerCase()}/summary`,
        function_name: `bank-statement-reader-${env.toLowerCase()}`,
        request_data: requestBody,
        response_data: response,
        extracted_data: "",
        status: "success",
    };

    await clientLog(client_log);

    let internal_log = {
        lt_flow_logs_id: requestId,
        thirdparty_name: "Finbit",
        env: env,
        api_path: "upload & summary both api called",
        function_name: `bank-statement-reader-${env.toLowerCase()}`,
        request_data: requestBody,
        response_data: response,
        status: "success",
    };

    await apiLog(internal_log);

    return res.status(response.statusCode).json(response)
})


// router.post("/uploadStatement", async (req, res) => {

//     const requestBody = req.body
//     let data = {}

//     try {

//         if (!requestBody.bank) {
//             throw new Error('bank key is required');
//         }
//         if (!requestBody.accountType) {
//             throw new Error('accountType key is required');
//         }
//         if (!requestBody.bankStmt) {
//             throw new Error('bankStmt key is required');
//         }

//         data = await uploadBankStatementService(req);

//     } catch (error) {
//         data = errorHandler(error, error.message);
//     }

//     const response = http(req, data);
//     return res.status(response.statusCode).json(response)
// })


// router.post("/uploadMultipleStatement", async (req, res) => {

//     let data = {}

//     try {

//         data = await uploadMultiBankStatementService(req);

//     } catch (error) {

//         data = errorHandler(error, error.message);
//     }

//     const response = http(req, data);
//     return res.status(response.statusCode).json(response)
// })


module.exports = router;