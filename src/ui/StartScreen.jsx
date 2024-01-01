import styles from "./AppLayout.module.scss";

function StartScreen() {
  return (
    <div className={styles.start_screen}>
      <img
        src="src\assets\pngegg.png"
        className={styles.start_screen__img}
      ></img>
      <h2 className={styles.start_screen__text}>Search for pokemon cards</h2>
    </div>
  );
}

export default StartScreen;
