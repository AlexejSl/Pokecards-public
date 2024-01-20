import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import Header from "../head/Header";
import ContentBox from "./ContentBox";
import { SearchProvider } from "../../../store/SearchContext";

function AppLayout() {
  return (
    <SearchProvider>
      <div className={styles.app}>
        <Header />
        <ContentBox>
          <Outlet />
        </ContentBox>
      </div>
    </SearchProvider>
  );
}

export default AppLayout;
