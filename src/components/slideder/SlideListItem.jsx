import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SlideListItem({ children }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Hiển thị 3 card
    slidesToScroll: 4, // Trượt từng 1 card
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {children}
      {/* {doctors.map((doctor, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <CardDoctor
            name={doctor.name}
            specialty={doctor.specialty}
            description={doctor.description}
            image={doctor.image}
          />
        </div>
      ))} */}
    </Slider>
  );
}

export default SlideListItem;
