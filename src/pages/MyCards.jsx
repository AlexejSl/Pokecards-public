import styles from "../ui/AppLayout.module.scss";
import { Skeleton } from "@mui/material";
import { useGetMyCards } from "../api/ApiHooks";
import MyCardsCardItem from "../ui/MyCardsCardItem";
import toast from "react-hot-toast";

function MyCards({ user }) {
  const { isLoading, error, usersCards } = useGetMyCards(user.id);

  if (error) {
    return toast.error("There has been an error fetching your cards");
  }

  if (isLoading) {
    const loadingArr = Array.from({ length: 24 }, (_, index) => index + 1);
    return (
      <div className={styles.container__mycards}>
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

  return (
    <div className={styles.container__mycards}>
      <div className={styles.grid}>
        {usersCards.map((card) => (
          <MyCardsCardItem
            key={card.cardId}
            id={card.cardId}
            name={card.cardName}
            number={card.cardNum}
            image={card?.cardImgLink}
            rarity={card.cardRarity}
            set={card.cardSet}
            uniqueCardId={card.uniqueCardId}
          />
        ))}
      </div>
    </div>
  );
}

export default MyCards;
