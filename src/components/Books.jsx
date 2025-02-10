import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import fetchAllBooks from "../API/fetchAllBooks"
import BookSearch from "./BookSearch";

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
      <div className="book_collection_heading">
        <h2>Book Collection</h2>
        <BookSearch setBooks={setBooks} />
      </div>
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