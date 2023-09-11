import Header from "../../components/Header/Header";
import Info from "../../components/Info/Info";
import NavigationMenu from "../../components/UI/NavigationMenu/NavigationMenu";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return(
        <>
        <Header/>
        <main>
            <Info/>
            <NavigationMenu/>
            {/* <Suspense/>??????? */}
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default MainLayout;