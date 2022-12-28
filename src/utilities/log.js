const axios = require("axios");

const clientLog = async (body) => {
  return axios.request({
    url: "https://59dw4qwlbf.execute-api.ap-south-1.amazonaws.com/client/log",
    method: "post",
    data: body,
  });
};

const apiLog = async (body) => {
  return axios.request({
    url: "https://59dw4qwlbf.execute-api.ap-south-1.amazonaws.com/internal/log",
    method: "post",
    data: body,
  });
};


module.exports = { clientLog, apiLog };
