import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageLoader from "../../components/UI/PageLoader/PageLoader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        <Suspense fallback={<PageLoader/>}>
       <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
