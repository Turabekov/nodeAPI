function getBodyData(req) {
    return new Promise((resolve, reject) =>{
        try {
            let body = ""

            req.on("data", (chunk) => {
                body = body + chunk.toString()
            })

            req.on("end", () => {
                resolve(body)
            })

        } catch (e) {
          reject(e)  
        }
    })
}



module.exports = getBodyData