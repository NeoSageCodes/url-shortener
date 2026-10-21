// Loading the fs module
const fs = require('fs');
const database = require('../Model/database.json');

// Write DB
const saveToDB = (data) => {
    return new Promise((resolve, reject) => {
        return fs.writeFile("./Model/database.json", data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

// Generating Unique Short Codes
function codeGenerator(database) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    while (database.some((e) => e.code === code)) {
      code = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
      }
    }
    return code;
}

/*                                      LOGIC                                  */

const shortURL = async (req,res) => {
    // Extracting the url from the req body
    const {url} = req.body;

    const code = codeGenerator(database);

    const shortURL = `http://localhost:1000/${code}`;

    const linkInfo = {
        code: code,
        url: url,
        shortURL: shortURL,
        visitCount: 0
    }

    database.push(linkInfo)

    try {
        await saveToDB(JSON.stringify(database, null, 2));

        res.status(200).json({
          message: `Long URL shortened successfully`,
          code: code,
          shortURL: shortURL,
        });
    } catch (error) {
        database.pop();
        
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

    
    
};

async function redirectToURL (req, res) {
    const code = req.params.code;

    const linkInfo = database.find((e) => e.code === code);
    const longURL = linkInfo.url;

    linkInfo.visitCount++;
    try {
        await saveToDB(JSON.stringify(database, null, 2));
        res.redirect(longURL);

    } catch (error) {
        linkInfo.visitCount--;

        res.status(500).json({
            message: "Internal Server Error"
        });
    }

};


const stats = function(req, res) {
    const code = req.params.code;

    const found = database.find((e) => e.code === code);
    res.status(200).json({
      message: `Number of visits received  by ${code} gotten successfully`,
      originalURL: found.url,
      Visit_Count: found.visitCount,
    });
};



module.exports = {shortURL, redirectToURL, stats}