import { useState, useEffect } from "react"
import fetchReservations from "../API/fetchReservations";
import deleteReservation from "../API/deleteReservation";

function ReservedBooks({token}) {
  const [reservedBooks, setReservedBooks] = useState(null);
  useEffect(()=>{
    try {
      if (token) {
        async function gatherReservations() {
          const allReservations = await fetchReservations(token);
          if (allReservations.length === 0) {
            setReservedBooks(null);
          }else{
            setReservedBooks(allReservations);
          }
        }
        gatherReservations();
      }
    } catch (e) {
      console.error("Unable to gather reservations.", e);
    }
  })

  async function returnBook(reservationId) {
    try {
      if (token) {
        await deleteReservation(token, reservationId);
        const allReservations = await fetchReservations(token);
        setReservedBooks(allReservations);
      }
    } catch (e) {
      console.error(`Error returning book.`, e);
    }
  }

  return (
    <>
      {!reservedBooks && <p>You currently have no books reserved.</p>}
      <div className="book_reservations">
        {reservedBooks && reservedBooks.map((bookReservation)=>{
          return (
          <div key={bookReservation.id} className="reservation_card">
            <img src={bookReservation.coverimage} alt={bookReservation.title} />
            <div className="reservation_card_info">
              <h3>{bookReservation.title}</h3>
              <h4>Written By: {bookReservation.author}</h4>
              <button onClick={()=> returnBook(bookReservation.id)}>Return</button>
            </div>
          </div>
          )
        })}
      </div>
    </>
  )
}
export default ReservedBooks