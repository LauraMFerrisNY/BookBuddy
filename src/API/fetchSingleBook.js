const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

async function fetchSingleBook(bookId) {
  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const myBook = await response.json();
    return myBook;
  } catch (e) {
    console.error("Unable to collect book.", e);
  }
}
export default fetchSingleBook;