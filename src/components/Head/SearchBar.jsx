import { BiSearch } from "../../../node_modules/react-icons/bi";
import styles from "./SearchBar.module.scss";
import { useSearch } from "../Context/SearchContext";
import { useState } from "react";
import { containsNumber } from "../../helpers/containsNum";
import { useNavigate } from "react-router-dom";

function SearchBar({ windowWidth }) {
  const { updateSearchResults, isLoadingCheck } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async function (e) {
    e.preventDefault();
    //check if the search query contains a number, also trims the search of spaces, because it causes bugs
    const { cardName, cardNumber } = containsNumber(searchQuery.trim());
    navigate("/main");
    try {
      isLoadingCheck(true);
      const res = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:"${cardName}" ${cardNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "92a57536-3ee8-41e4-ae08-56fcadfa01dd",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      const cards = await res.json();
      isLoadingCheck(false);
      updateSearchResults(cards);
      setSearchQuery("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      action=""
      className={styles.searchbar}
      id="search"
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        type="text"
        placeholder={windowWidth < 550 ? "Search" : "Search a pokemon card"}
        className={styles.searchbar__input}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className={styles.searchbar__button}
        disabled={!searchQuery}
      >
        <BiSearch />
      </button>
    </form>
  );
}

export default SearchBar;
