import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";

const FeaturedDestination = () => {
  return (
    <div>
      <div>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard room={room} index={index} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestination;
