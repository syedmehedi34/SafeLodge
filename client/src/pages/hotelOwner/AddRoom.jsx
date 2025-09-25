/* eslint-disable no-unused-vars */
import { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  const [loading, setLoading] = useState(false);

  //
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // check if all inputs are filled
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((img) => img)
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      // append amenities
      const amenities = Object.keys(inputs.amenities).filter(
        (amenity) => inputs.amenities[amenity]
      );
      formData.append("amenities", JSON.stringify(amenities));

      // append images
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      // api call
      // console.log(formData);
      const { data } = await axios.post("/api/rooms/", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      console.log(formData);

      console.log(data);
      if (data.success) {
        toast.success(data.message);
        // reset all fields
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
      />

      {/* upload images area */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-13 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
            />
          </label>
        ))}
      </div>

      {/* room type and price */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        {/* left div -> used for select room type   */}
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* right div for price per night */}
        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, idx) => (
          <div key={idx}>
            <input
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
              type="checkbox"
              id={`amenities${idx + 1}`}
              checked={inputs.amenities[amenity]}
            />
            <label htmlFor={`amenities${idx + 1}`}> {amenity}</label>
          </div>
        ))}
      </div>

      <button
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
