import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { NODE_API_URL } from "../utils";

const SearchBar = ({ openModal, setSearchResults }) => {
  const [query, setQuery] = useState("");

  const getSearchResults = () => {
    fetch(NODE_API_URL + `/models/${query.trim()}/getByName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.soma_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2">
      <FiSearch className="mr-2" />
      <input
        className="bg-transparent outline-none flex-1"
        type="text"
        placeholder={"Type model name..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query !== "") {
            openModal();
            getSearchResults();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
