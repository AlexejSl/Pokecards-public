import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import toast from "react-hot-toast";

import { useSearch } from "../../../store/SearchContext";
import SearchError from "../other_LoadErrBtns/SearchError";
import CardItem from "./CardItem";
import styles from "./MainPage.module.scss";

function MainPage() {
  const [initialCards, setInitialCards] = useState(null);
  const { searchResults, isLoading } = useSearch();

  // providing pokemon cards when the main page loads for the first time
  useEffect(() => {
    const fetchCards = async function () {
      try {
        const res = await fetch(
          "https://api.pokemontcg.io/v2/cards?pageSize=24",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "92a57536-3ee8-41e4-ae08-56fcadfa01dd",
            },
          }
        );
        const cards = await res.json();

        setInitialCards(() => cards);
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      }
    };
    fetchCards();
  }, []);

  if (!initialCards || isLoading) {
    const loadingArr = Array.from({ length: 24 }, (_, index) => index + 1);
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {loadingArr.map((num) => (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ borderRadius: "10px", bgcolor: "#e6e6e6" }}
              width="100%"
              height="27rem"
              key={num}
            ></Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (searchResults?.error || searchResults?.data?.length < 1) {
    return <SearchError />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {searchResults
          ? searchResults.data.map((card) => (
              <CardItem
                name={card.name}
                key={card.id}
                id={card.id}
                number={card.number}
                rarity={card?.rarity || "No data"}
                image={card.images.large}
                price={card?.cardmarket?.prices?.averageSellPrice || "No data"}
                priceUpdatedAt={card?.cardmarket?.updatedAt || "No data"}
                set={card.set.name}
              />
            ))
          : initialCards.data.map((card) => (
              <CardItem
                name={card.name}
                key={card.id}
                id={card.id}
                number={card.number}
                rarity={card?.rarity || "No data"}
                image={card.images.large}
                price={card?.cardmarket?.prices?.averageSellPrice || "No data"}
                priceUpdatedAt={card?.cardmarket?.updatedAt || "No data"}
                set={card.set.name}
              />
            ))}
      </div>
    </div>
  );
}

export default MainPage;
