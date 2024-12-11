import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyReviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server-j5ltidx0f-ashraful-pathan-4d398455.vercel.app/datas")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleExploreDetails = (id) => {
    // আপনার ডিটেইল এক্সপ্লোর করার লজিক এখানে লিখুন
    console.log("Explore details for id:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold mt-5">See All Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-7">
          {data.map((HRate) => (
            <div key={HRate._id}>
              <div className="card bg-base-100 my-4 w-[300px] md:w-96 shadow-xl">
                <figure>
                  <img
                    className="h-[260px] object-cover"
                    src={HRate.Image}
                    alt="Review"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{HRate.name}</h2>
                  <p className="font-bold">{HRate.Hading}</p>
                  <p>{HRate.Description}</p>
                  <p>Rating: {HRate.Rating} ⭐</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleExploreDetails(HRate._id)}
                    >
                      Explore Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyReviews;
