import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
    return(
        <>
        <Header/>
        <main className={`${styles.main}`}>
            {/* <Suspense/>??????? */}
            <Outlet/>

        </main>
        <Footer/>
        </>
    )
}

export default MainLayout;