import styles from "./ContentBox.module.scss";

function ContentBox({ children }) {
  return <main className={styles.contentbox}>{children}</main>;
}

export default ContentBox;
