const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

async function checkoutBook(token, bookId) {
  await fetch(`${API_URL}/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      available: false,
    })
  });
}
export default checkoutBook;