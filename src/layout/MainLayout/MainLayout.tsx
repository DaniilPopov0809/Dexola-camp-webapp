import Header from "../../components/Header/Header";
import NavigationMenu from "../../components/UI/NavigationMenu/NavigationMenu";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
    return(
        <>
        <Header/>
        <main className={styles.main}>
            <NavigationMenu/>
            {/* <Suspense/>??????? */}
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default MainLayout;