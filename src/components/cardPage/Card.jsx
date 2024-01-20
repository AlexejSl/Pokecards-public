import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { uploadCard } from "../../api/apiMyCards";
import styles from "./Card.module.scss";
import CardError from "../other_LoadErrBtns/CardError";
import Spinner from "../other_LoadErrBtns/Spinner";

function Card({ user = "", isLoading }) {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [cardError, setCardError] = useState(false);

  // this unique card id ensures that user cant add multiple same cards to myCards, it cant be simply id because it wouldnt allow 2 users to have the same card added to My Cards
  const uniqueCardId = user.id ? id + user.id : "";

  // Providing pokemon card info when the user clicks on the card
  useEffect(() => {
    const fetchCard = async function () {
      try {
        const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "92a57536-3ee8-41e4-ae08-56fcadfa01dd",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const card = await res.json();
        setCard(() => card);
      } catch (error) {
        setCardError(true);
        console.error(error.message);
      }
    };
    fetchCard();
  }, [id]);

  //error screen for the user if there has been an error
  if (cardError) {
    return <CardError />;
  }

  //this acts as isLoading at the same time
  if (!card) {
    return <Spinner />;
  }

  async function uploadCardToSupabase() {
    try {
      // Calling the uploadCardToSupabase function with the necessary data
      await uploadCard(
        card.data.name,
        card.data.number,
        card.data.rarity,
        id,
        card.data.set.name,
        card.data.images.large,
        user.id,
        uniqueCardId
      );

      toast.success("Card successfully added");
    } catch (error) {
      // setCardAlreadyAdded(true);
      toast.error("You already added this card");
      console.error(error.message);
    }
  }

  return (
    <div className={styles.card}>
      <img className={styles.card__image} src={card.data.images.large} />
      <h2 className={styles.card__name}>
        {card.data.name} #{card.data.number}
      </h2>
      <p className={styles.card__rarity}>
        Rarity: {card.data.rarity || "No data"}
      </p>
      <p className={styles.card__set}>Set: {card.data.set.name}</p>
      <p className={styles.card__release}>
        Release date: {card.data?.set?.releaseDate || "No data"}
      </p>
      <a href={card.data?.cardmarket?.url || ""} className={styles.card__link}>
        {card.data.name} on Cardmarket
      </a>
      <a href={card.data?.tcgplayer?.url || ""} className={styles.card__link}>
        {card.data.name} on TCGplayer
      </a>
      <h3 className={styles.card__prices}>Prices</h3>
      <p className={styles.card__price}>
        1 day average: {card.data?.cardmarket?.prices?.avg1 || "No data"}$
      </p>
      <p className={styles.card__price}>
        7 day average: {card.data?.cardmarket?.prices?.avg7 || "No data"}$
      </p>
      <p className={styles.card__price}>
        30 day average: {card.data?.cardmarket?.prices?.avg30 || "No data"}$
      </p>
      <p className={styles.card__main_price}>
        Price:{" "}
        <span className={styles.red}>
          {card.data?.cardmarket?.prices?.averageSellPrice || "No data"}$
        </span>
      </p>
      {/* if card is already added it will display p tag, but if user is not
      logged in there will be no button in the first place */}
      {user && (
        <button className={styles.card__button} onClick={uploadCardToSupabase}>
          Add to my cards
        </button>
      )}
    </div>
  );
}

export default Card;
