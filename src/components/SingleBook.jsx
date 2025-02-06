/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import fetchSingleBook from "../API/fetchSingleBook";

function SingleBook() {
  let { id } = useParams();
  const [book, setBook] = useState([])
  const navigate = useNavigate(); 

  useEffect(()=>{
    try {
      async function gatherBook() {
        const myBook = await fetchSingleBook(id);
        setBook(myBook);
      }
      gatherBook();
    } catch (e) {
      console.log("Unable to collect book");
    }
  },[])

  return (
      <>
          <h1 className="single_book_header">{book.title}</h1>
          <div className="single_book_content">
              <img src={book.coverimage} alt={book.title} className="single_book_cover"/>
              <div className="single_book_info">
                  <h3>Written By: {book.author}</h3>
                  <h3>Available: {`${book.available}`}</h3>
                  <div className="description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                  </div>
                  <button id="return"  onClick={()=> navigate(`/books`)}>Back to Book Collection</button>
              </div>
          </div>
      </>
  )
}
export default SingleBook