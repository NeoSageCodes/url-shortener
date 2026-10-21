const database = require("../Model/database.json")

function validateURL(req, res, next) {
    const url = req.body.url;
    const colonIndex = url.indexOf(":");

    const scheme = url.slice(0, colonIndex);

    if (scheme === "http" || scheme === "https") {
        next();
    } else {
        res.status(400).json({
          message: `The scheme must either be "http" or "https"`,
        });
    }
};

const validateCode = function (req, res, next) {
    const code = req.params.code;
    const result = database.find((e) => e.code === code);

    if (result === undefined) {
        res.status(404).json({
            message: "Unknown Code"
        })
    } else {
        next();
    }
};

module.exports = {validateURL, validateCode}