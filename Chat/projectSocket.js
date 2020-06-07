const mainSocket = (app) => {
    const io = require("socket.io")(app)

    io.on("connection", (socket) => {
        console.log("New connection!")
    })
}

module.exports = mainSocket