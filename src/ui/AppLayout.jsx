import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import Header from "../components/Head/Header";
import Main from "./ContentBox";
import { SearchProvider } from "../components/Context/SearchContext";

function AppLayout() {
  return (
    <SearchProvider>
      <div className={styles.app}>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </SearchProvider>
  );
}

export default AppLayout;
