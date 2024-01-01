import { useNavigate } from "react-router-dom";
import styles from "./CardItem.module.scss";
import { useDeleteCard } from "../api/ApiHooks";

import { RiDeleteBinLine } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { CgStack } from "react-icons/cg";
import { IoPricetag } from "react-icons/io5";

function MyCardsCardItem({
  name,
  id,
  rarity,
  image,
  number,
  set,
  uniqueCardId,
}) {
  const navigate = useNavigate();
  const { isDeleting, deleteCard } = useDeleteCard();

  function handleCardClick() {
    navigate(`/card/${id}`);
  }

  function handleDelete(event) {
    event.stopPropagation();
    deleteCard(uniqueCardId);
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.card__container}>
        <img className={styles.card__img} src={image} />
        <div className={styles.card__content}>
          <h2 className={styles.card__name}>
            {name}
            <span className={styles.card__name_number}>#{number}</span>
          </h2>
          <div className={styles.card__box}>
            <IoDiamondOutline className={styles.card__emote} />
            <p className={styles.card__rarity}>{rarity || "No Data"}</p>
          </div>
          <div className={styles.card__box}>
            <AiOutlineFieldNumber className={styles.card__emote} />
            <p className={styles.card__row1}>Card Id: {id}</p>
          </div>
          <div className={styles.card__box}>
            <CgStack className={styles.card__emote} />
            <p className={styles.card__row2}>Set: {set}</p>
          </div>
          <p className={styles.card__end_text}>
            Click on the card for more info
          </p>
        </div>
        <button
          className={styles.delete_button}
          onClick={(event) => handleDelete(event)}
        >
          <RiDeleteBinLine className={styles.delete_button__emote} />
        </button>
      </div>
    </div>
  );
}

export default MyCardsCardItem;
