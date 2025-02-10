import { useState } from "react";
import fetchAllBooks from "../API/fetchAllBooks";

function BookSearch({ setBooks }) {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  let matchedBooks = [];

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const allBooks = await fetchAllBooks();
      if (searchInput !== "") {
        allBooks.map((book) => {
          console.log(book);
          if (book.title.toLowerCase().includes(searchInput.toLowerCase())) {
            matchedBooks.push(book);
          } else if (book.author.toLowerCase().includes(searchInput.toLowerCase())) {
            matchedBooks.push(book);
          }
        })
        setError(null);
        setBooks(matchedBooks);
      } else {
        setError(null);
        setBooks(allBooks);
      }
    } catch (error) {
        setError(error);
    }
}

   return (
    <>
      <form className='search_form' onSubmit={handleSubmit}>
        <label className="search_bar">
          Book Search: 
          <input type="text" value ={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </label>
        <label className='search_button'>
          <button>Search</button>
        </label>
      </form>
      {error && <p className='submission_error'>{error}</p>}
    </>
   )
}
export default BookSearch