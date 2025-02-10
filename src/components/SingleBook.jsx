import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import fetchSingleBook from "../API/fetchSingleBook";
import checkoutBook from "../API/checkoutBook";

function SingleBook({ token }) {
  let { id } = useParams();
  const [book, setBook] = useState([])
  const navigate = useNavigate(); 

  useEffect(()=>{
    try {
      async function gatherBook() {
        const singleBook = await fetchSingleBook(id);
        setBook(singleBook);
      }
      gatherBook();
    } catch (e) {
      console.error("Unable to collect book",e);
    }
  },[])

  async function  handleCheckoutRequest() {
    try {
      if (token) {
        await checkoutBook(token, id);
        const singleBook = await fetchSingleBook(id);
        setBook(singleBook);
      }
    } catch (e) {
      console.error("Unable to checkout book",e);
    }
  }

  return (
      <>
          <h2 className="single_book_header">{book.title}</h2>
          <div className="single_book_content">
              <img src={book.coverimage} alt={book.title} className="single_book_cover"/>
              <div className="single_book_info">
                  <h3>Written By: {book.author}</h3>
                  <h3>Available: {`${book.available}`}</h3>
                  <div className="description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                  </div>
                  {token && <div className="checkout_button">
                    {book.available && <button onClick={()=> handleCheckoutRequest()}>Checkout Book</button>}
                  </div>}
                  <button id="return"  onClick={()=> navigate(`/books`)}>Back to Book Collection</button>
              </div>
          </div>
      </>
  )
}
export default SingleBook