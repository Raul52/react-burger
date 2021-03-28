import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {useState} from "react";

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    function sideDrawerCloseHandler() {
        setShowSideDrawer(false);
    }

    function sideDrawerOpenHandler() {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <>
            <Toolbar clickDrawerToggle={sideDrawerOpenHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
};

export default Layout;