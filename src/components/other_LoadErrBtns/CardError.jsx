import BackToMainButton from "./BackToMainButton";
import styles from "./PageNotFound.module.scss";
import CardErrImg from "../../assets/CardErrImg.png";

//this page got almost the same styles as PageNotFound so i decided not to duplicate the CSS but use pageNotFound css
function CardError() {
  return (
    <div className={styles.pagenotfound__container}>
      <img
        src={CardErrImg}
        className={styles.carderr_img}
        alt="Card Error image"
      />
      <h3 className={styles.message_carderr}>
        Sorry there has been an error or this card doesn&apos;t exist.
      </h3>
      <p className={styles.message_return}>Please return to the main page:</p>
      <BackToMainButton />
    </div>
  );
}

export default CardError;
