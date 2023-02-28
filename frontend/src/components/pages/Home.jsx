import React, { useEffect, useState } from "react";
import axios from "axios";
import { useBookContext } from "../../hooks/useBookContext";
import Button from "../forms/Button";
import Label from "../forms/Label";
import Alert from "../forms/Alert";
import Input from "../forms/Input";

const Home = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { books, dispatch } = useBookContext();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/book");
      dispatch({ type: "FETCH_BOOKS", payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
    // const data = await response.json();
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/book/${id}`);
      dispatch({ type: "DELETE_BOOK", payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const book = {
      title,
      author,
      description,
      price,
      publisher,
      pages,
      genre,
    };
    addBook(book);
  };

  const addBook = async (book) => {
    await axios
      .post("http://localhost:4000/api/book", book)
      .then((res) => {
        setTimeout(() => {
          setTitle("");
          setAuthor("");
          setDescription("");
          setPrice("");
          setPublisher("");
          setPages("");
          setGenre("");
          dispatch({ type: "CREATE_BOOK", payload: res.data.data });
          console.log(res.data.data);
          setSuccess(true);
          setError([]);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setError(err.response.data.data);
        }, 500);
      });
  };

  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-2">
        {books &&
          books.map((book) => (
            <div key={book._id} className="w-full">
              <div className="bg-white shadow-md rounded-lg overflow-hidden m-2 h-full">
                <div className="px-8 py-6 space-y-2">
                  <h1 className="text-slate-700 font-bold text-2xl">
                    {book.title}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">{book.author}</p>

                  <p className="text-gray-600 text-sm mt-1">
                    {book.description}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{book.price}</p>
                  <p className="text-gray-600 text-sm mt-1">{book.genre}</p>
                  <Button
                    onClick={() => deleteBook(book._id)}
                    className={"bg-slate-700 py-2 px-4 rounded"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex my-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden m-2 h-full py-5">
          <form onSubmit={handleSubmit}>
            <div className="px-8 py-6 space-y-1">
              {error && error.length > 0 ? (
                <Alert className={"bg-red-500"}>
                  {Array.isArray(error) ? (
                    error.map((err, index) => (
                      <p key={index} className="text-white">
                        {err}
                      </p>
                    ))
                  ) : (
                    <p className="text-white">{error}</p>
                  )}
                </Alert>
              ) : (
                ""
              )}
              {success ? (
                <Alert className={"bg-green-500"}>
                  <p className="text-white">Book successfully added!</p>
                </Alert>
              ) : (
                ""
              )}

              <h1 className="text-slate-700 font-bold text-2xl">Add Book</h1>
              <div className="grid grid-cols-3 gap-1">
                <div className="my-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="text"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    type="text"
                    id="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
                <div className="my-1">
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    type="text"
                    id="pages"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className={
                    "bg-slate-700 col-span-3 py-2 px-4 rounded float-right "
                  }
                >
                  {loading ? "Loading..." : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
