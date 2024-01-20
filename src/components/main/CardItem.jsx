import { useNavigate } from "react-router-dom";
import styles from "./CardItem.module.scss";

import { IoDiamondOutline } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { CgStack } from "react-icons/cg";
import { IoPricetag } from "react-icons/io5";

function CardItem({
  name,
  id,
  rarity,
  image,
  price,
  priceUpdatedAt,
  number,
  set,
}) {
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/card/${id}`);
  }

  return (
    <div className={styles.card} onClick={() => handleCardClick()}>
      <div className={styles.card__container}>
        <img className={styles.card__img} src={image} />
        <div className={styles.card__content}>
          <h2 className={styles.card__name}>
            {name}
            <span className={styles.card__name_number}>#{number}</span>
          </h2>
          <div className={styles.card__box}>
            <IoDiamondOutline className={styles.card__emote} />
            <p className={styles.card__rarity}>{rarity}</p>
          </div>
          <div className={styles.card__box}>
            <AiOutlineFieldNumber className={styles.card__emote} />
            <p className={styles.card__row1}>Card Id: {id}</p>
          </div>
          <div className={styles.card__box}>
            <CgStack className={styles.card__emote} />
            <p className={styles.card__row2}>Set: {set}</p>
          </div>
          <div className={styles.card__price}>
            {price && (
              <p className={styles.card__price_value}>
                <IoPricetag className={styles.card__price_tag} />
                {price}
                {price === "No data" ? "" : "$"}
              </p>
            )}
            <span className={styles.card__price_updatedat}>
              Price last updated {priceUpdatedAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
