/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import fetchAllBooks from "../API/fetchAllBooks"

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(()=>{
    try{
      async function gatherBooks() {
        const allBooks = await fetchAllBooks();
        setBooks(allBooks);
      }
      gatherBooks();
    } catch (e) {
      console.error("Unable to gather books", e);
    }
  }, [])
  
  return (
    <>
      <h2>Book Collection</h2>
      <div className="book_content">
        {books && books.map((book)=>{
          return (
            <div key={book.id} className="book_card" onClick={()=> navigate(`/books/${book.id}`)}>
              <img src={book.coverimage} alt={book.title} />
              <div className="book_card_info">
                <h3>{book.title}</h3>
                <h4>Written By: {book.author}</h4>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Books