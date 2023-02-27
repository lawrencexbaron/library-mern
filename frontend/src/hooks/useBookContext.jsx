import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export const useBookContext = () => {
  const context = useContext(BookContext);

  if (!context)
    throw Error("useBookContext must be used within a BookContextProvider");

  return context;
};
