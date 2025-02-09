const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations';

async function deleteReservation(token, reservationId) {
  try {
    if (token) {
      await fetch(`${API_URL}/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        } 
      });
    }
  } catch (e) {
    console.error(`Error returning book.`, e);
  }
}
export default deleteReservation;