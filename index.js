const http = require("http")
const getBodyData = require("./utils")
const {v4} = require("uuid")
const fs = require("fs")
const path = require("path")


function readFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, "/db", "database.json"), "utf8", (err, data)=>{
            if(err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }

        })
    });    
}

function writeFile(data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.join(__dirname, "/db", "database.json"), JSON.stringify(data), "utf8" , (err)=>{
            if(err) {
                reject(err)
            } else {
                resolve()
            }

        })
    });    
}


const server = http.createServer(async (req, res) => {
    try {
        let books = await readFile()

        if(req.url === "/books" && req.method === "GET") {
            // get All books
            const headers = {
               "Content-Type": "application/json charset=utf8",
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
               "Access-Control-Max-Age": 2592000, // 30 days
               /** add other headers as per requirement */
           };
       
           res.writeHead(200, headers)
           const resp = {
               status: "OK",
               books: books
           }
           res.end(JSON.stringify(resp))
   
   
       } else if (req.url === "/books" && req.method === "POST") {
           // post one book
           const headers = {
            "Content-Type": "application/json charset=utf8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            "Access-Control-Max-Age": 2592000, // 30 days
            /** add other headers as per requirement */
            };
   
               let body = await getBodyData(req)
               let {title, page, author} = JSON.parse(body)
               const newBook = {
                   id: v4(),
                   title,
                   page,
                   author
               }
               books.push(newBook)
               await writeFile(books)
   
               res.writeHead(200, headers)
   
               const resp = {
                   status: "OK",
                   book: newBook
               }
               res.end(JSON.stringify(resp))
   
       } else if (req.url.match(/\/books\/\w+/) && req.method === "PUT") {
           // update one book
           const id = req.url.split("/")[2]
           let body = await getBodyData(req)
           let {title, page, author} = JSON.parse(body)
   
           let idx = books.findIndex(item => item.id == id)
           
           books[idx] = {
               id: books[idx].id,
               title: title || books[idx].title,
               page: page || books[idx].page,
               author: author || books[idx].author,
           }
   
           await writeFile(books)
   
   
           res.writeHead(200, {"Content-Type": "application/json charset=utf8"})
   
           const resp = {
               status: "UPDATED",
               book: books[idx]
           }
           res.end(JSON.stringify(resp))
   
       } else if (req.url.match(/\/books\/\w+/) && req.method === "GET") {
           // get one book
           const id = req.url.split("/")[2]
           
           let idx = books.findIndex(item => item.id == id)
           console.log(idx)
   
   
           res.writeHead(200, {"Content-Type": "application/json charset=utf8"})
   
           const resp = {
               status: "OK",
               book: books[idx]
           }
           res.end(JSON.stringify(resp))
        } else if (req.url.match(/\/books\/\w+/) && req.method === "DELETE") {
           // delete one book
           const id = req.url.split("/")[2]
           
           books = books.filter(item => item.id != id)
           await writeFile(books)
   
           res.writeHead(200, {"Content-Type": "application/json charset=utf8"})
   
           const resp = {
               status: "DELETED",
           }
           res.end(JSON.stringify(resp))
        }

        
    } catch (error) {
        res.writeHead(404)

        const resp = {
            status: "ERROR",
            message: error.message
        }
        res.end(JSON.stringify(resp))
    }
    
})      
// RegExp ===  /pattern/flag 
server.listen(3000, () => console.log(`Server running on port: 3000`))