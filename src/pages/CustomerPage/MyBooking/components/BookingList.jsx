import BookingCard from "./BookingCard";

const BookingList = ({ bookings = [], onView, onReschedule, onCancel }) => {
  if (!bookings.length) return <p>Không có lịch hẹn nào phù hợp.</p>;

  return (
    <div>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onView={onView}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default BookingList;
