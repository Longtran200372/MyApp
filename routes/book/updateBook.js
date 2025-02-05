const express = require("express")
const books = require("../../public/book")


const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const {title, author} = req.body
        const bookIndex = books.findIndex(book => book.id == id)
        console.log(books[bookIndex])
        console.log(title)
        if (!id) {
            return res.status(404).json({message: "ID not found"})
        }
        if (bookIndex === -1) {
            return res.status(404).json({ message: "Book not found" });
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
}

module.exports = updateBook