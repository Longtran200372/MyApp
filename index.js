const express = require("express")
const app = express()
const port = 3000
// const books = require("./public/book")
const updateBook = require("./routes/book/updateBook");
const requestLogger = require("./middlewares/requestLogger");


let books = [
    { id: 1, title: "Sách 1", author: "Tác giả 1" },
    { id: 2, title: "Sách 2", author: "Tác giả 2" },
    { id: 3, title: "Sách 3", author: "Tác giả 3" }
  ];

app.use(express.json())
app.use(requestLogger)
app.listen(port, () => {
    console.log(`MyApp is listening at http://localhost:${port}`)
})




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
            return res.status(404).json("Book not found")
        } else {
            res.status(200).json(foundBook)
        }        
    }
    catch(error) {
        res.status(400).json(error)
    }

})
app.post('/books', async (req, res) => {
    const {id, author, title} = req.body
    try {
        if(!id || !author || !title) {
            return res.status(400).json("Nhập thiếu thông tin")
        }
        if (books.some(book => book.id == id)) {
            return res.status(400).json({ message: "ID bị trùng với sách hiện có "});
        }
        const newBook = {id, title, author}
        
        books.push(newBook)
        // console.log(newBook)     
        res.status(200).json("Thêm sách thành công")
        
    }
    catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.put('/books/:id', (req, res) => {
    try {
        const id = req.params.id
        const {title, author} = req.body
        const bookIndex = books.findIndex(book => book.id == id)
        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!title || !author) {
            return res.status(400).json({message: "Not enough information"})
        }
        if (title === books[bookIndex].title && author === books[bookIndex].author) {
            return res.status(200).json({ message: "No changes detected"});
        }
    
        // Cập nhật nếu có thay đổi
        if (title) books[bookIndex].title = title;
        if (author) books[bookIndex].author = author;
    
        res.json({ message: "Book updated successfully", book: books[bookIndex] });


    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.delete('/books/:id', (req, res) => {
    const id = req.params.id
    const foundBook = books.find(book => book.id == id)
    const bookIndex = books.findIndex(book => book.id == id)
    if (!foundBook) {
        return res.status(400).json({message: "ID không tồn tại"})
    }
    books.splice(bookIndex, 1)
    res.status(200).json({message: "Delete book successfully"})
})
