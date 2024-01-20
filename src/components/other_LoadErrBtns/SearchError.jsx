import CardErrImg from "../../assets/CardErrImg.png";
import styles from "./PageNotFound.module.scss";

//this page got almost the same styles as PageNotFound so i decided not to duplicate the CSS but use pageNotFound css
function SearchError() {
  return (
    <div className={styles.pagenotfound__container}>
      <img src={CardErrImg} className={styles.carderr_img} />
      <h1 className={styles.search_err__header}>
        Please enter a valid name of Pokemon card that you want to search for.
      </h1>
      <div className={styles.search_err__text}>
        <p className={styles.search_err__examples}>Examples:</p>
        <p>
          The search query has to contain name of the Pokemon card: &quot;
          <span className={styles.red}>Charizard&quot;</span> or &quot;
          <span className={styles.red}>Glaceon Vmax</span>&quot;
        </p>
        <p>
          If you want to be more specific, include the card number: &quot;
          <span className={styles.red}>Charizard Vmax 20&quot;</span>
        </p>
      </div>
    </div>
  );
}

export default SearchError;
