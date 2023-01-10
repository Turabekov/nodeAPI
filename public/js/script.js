// const btn = document.querySelector("#btn")
const title = document.querySelector("#title")
const page = document.querySelector("#page")
const author = document.querySelector("#author")
const form = document.querySelector("#form")


console.log("Helloooooo")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(title.value && page.value && author.value) {
        let obj = {}
        obj.title = title.value
        obj.page = page.value
        obj.author = author.value
        console.log(obj)

        fetch('http://localhost:3000/books', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(obj),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert("Book has breated")
        })
        .catch((error) => {
           alert("404 error")
        }).finally(() => {
            console.log("Finally")
        })

        
    } else {
        alert("Please fill empty fields")
    }

})

// fetch('http://localhost:3000/books')
// .then((response) => {
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
// }).catch(err =>{
//     console.log(err)
// }).finally(() => {
//     console.log("Finally")
// })

