import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import styles from "./layoutGeneral.module.css"

const LayoutGeneral = () => {
    return (
        <div className={styles.container}>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default LayoutGeneral;