const sendEmail = require("./ses");

sendEmail(
    "bukemihci@gmail.com",
    "Hello from the other side",
    "Is anybody there?"
)
    .then((res) => {
        console.log("Success", res);
    })
    .catch((e) => {
        console.log("ERROR", e);
    });
