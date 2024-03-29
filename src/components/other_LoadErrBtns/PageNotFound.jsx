import styles from "./PageNotFound.module.scss";
import BackToMainButton from "./BackToMainButton";
import PageNotFoundImg from "../../assets/PageNotFoundImg.png";

function PageNotFound() {
  return (
    <div className={styles.pagenotfound__container}>
      <img src={PageNotFoundImg} className={styles.pokemon__img} />
      <h3 className={styles.message}>
        It looks like you got lost, return to the main page:
      </h3>
      <BackToMainButton />
    </div>
  );
}

export default PageNotFound;
