const express = require("express")
const app = express()
const port = 3000


app.use(express.json())
app.listen(port, () => {
    console.log(`MyApp is listening at http://localhost:${port}`)
})


let books = [
    { id: 1, title: "Sách 1", author: "Tác giả 1" },
    { id: 2, title: "Sách 2", author: "Tác giả 2" },
    { id: 3, title: "Sách 3", author: "Tác giả 3" }
  ];

app.get('/', (req, res) => {
    res.send("Xin chào! Đây là ứng dụng quản lý sách")
})
app.get('/books', (req, res) => {
    res.json(books)    
})
app.get('/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const foundBook = books.find(book => book.id === bookId)
        if (!foundBook) {
            console.log("Book not found!");
        } else {
            console.log("Found book:", foundBook);
            res.status(200).json(foundBook)
        }
        
        
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }

})
app.post('/books', async (req, res) => {
    const bookData = req.body
    try {

        console.log(req.body)
        res.json(bookData)
        books.push(bookData)

    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})