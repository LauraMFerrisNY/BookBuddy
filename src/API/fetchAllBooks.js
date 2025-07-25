const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';
import sortAllBooks from "./sortAllBooks";

async function fetchAllBooks() {
  try {
    const response = await fetch(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const temp = await response.json();
    console.log("Full API response:", temp);
    const sortedBooks = await sortAllBooks(temp);
    return sortedBooks;
  } catch (e) {
    console.error("Unable to gather books.", e);
  }
}
export default fetchAllBooks;