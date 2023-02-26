import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios
      .get("http://localhost:4000/api/book")
      .then((res) => {
        setBooks(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    // const data = await response.json();
  };

  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2">
        {books &&
          books.map((book) => (
            <div key={book._id} className="w-full">
              <div className="bg-white shadow-md rounded-lg overflow-hidden m-2 h-full">
                <div className="px-8 py-6 space-y-2">
                  <h1 className="text-gray-900 font-bold text-2xl">
                    {book.title}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">{book.author}</p>

                  <p className="text-gray-600 text-sm mt-1">
                    {book.description}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{book.price}</p>
                  <p className="text-gray-600 text-sm mt-1">{book.genre}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
