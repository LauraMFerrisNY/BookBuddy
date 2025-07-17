import sortAllBooks from "./sortAllBooks";
const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations';

async function fetchReservations(token) {
  try {
    const response = await fetch(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const temp = await response.json();
    const sortedReservations = await sortAllBooks(temp);
    return sortedReservations;
  } catch (e) {
    console.error("Unable to gather books.", e);
  }
}
export default fetchReservations;