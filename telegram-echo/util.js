const axios = require("axios").default;
const fs = require("fs")


async function updateImage() {
    await axios({
        method: "get",
        url: "https://picsum.photos/200/300",
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream("image.jpg"));
    }).catch(function(err) {
        console.log(err);
    })
}

module.exports = { updateImage }