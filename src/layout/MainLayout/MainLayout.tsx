import Header from "../../components/Header/Header";
import NavigationMenu from "../../components/UI/NavigationMenu/NavigationMenu";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return(
        <>
        <Header/>
        <main>
            <NavigationMenu/>
            {/* <Suspense/>??????? */}
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default MainLayout;