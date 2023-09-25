import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PageLoader from "../../components/UI/PageLoader/PageLoader";
import { MainProvider } from "../../context/MainContext";
import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NotificationThumb from "../../components/NotificarionThumb/NotificationThumb";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {

  //add timiout for PageLoader if good network connection
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        <MainProvider>
          <Suspense fallback={isLoading ? <PageLoader /> : null}>
            <Outlet />
          </Suspense>
          <NotificationThumb />
        </MainProvider>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
