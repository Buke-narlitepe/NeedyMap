const aws = require("aws-sdk");
const fs = require("fs");
const config = require("../config.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../secrets.json");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send();
    }
    const { filename, mimetype, size, path } = req.file;
    s3.putObject({
        Bucket: "bukegram",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            req.body.url = config.s3Url + filename;

            fs.promises.unlink(path);

            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
};
