import styles from "./AppLayout.module.scss";

function ContentBox({ children }) {
  return <main className={styles.contentbox}>{children}</main>;
}

export default ContentBox;
