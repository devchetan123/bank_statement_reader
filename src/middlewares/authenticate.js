const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

module.exports = async (req, res, next) => {
  const bearerToken = req?.headers?.authorization;

  //return res.status(200).send(JSON.stringify(bearerToken));

  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).json({ status: "failed", message: "token is missing" });

  const token = bearerToken.split(" ")[1];
  try {
    let payload = await verifyToken(token);
    req.CLIENTNAME = payload.sub;
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "failed",
      message: "Invalid bearer token",
    });
  }
  return next();
};