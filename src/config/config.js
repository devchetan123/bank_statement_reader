const uatInfo = {
    emailAddress : "gautam@loantap.in",
    password : "Ky9@By#Kt7aYuT",
    baseUrl : "https://trial.fin360.in"
}

const prodInfo = {
    emailAddress : "nishant@loantap.in",
    password : "Nt!sTr$Nt5H#Ka@5yHr$",
    baseUrl : "https://fin360.in"
}

const getConfig = (env) => {

    if(env === "uat"){
        return uatInfo;
    }
    if(env === "prod"){
        return prodInfo;
    }
}

module.exports = { getConfig };
