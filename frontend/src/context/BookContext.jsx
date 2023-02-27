import { createContext, useReducer } from "react";

const BookContext = createContext();

export const bookReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "CREATE_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    default:
      return state;
  }
};

const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, { books: [] });

  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookContextProvider };
