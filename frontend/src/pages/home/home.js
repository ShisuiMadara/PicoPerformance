import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

import styles from "./home.module.css";

export default class Home extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    This is home
                </div>
                <Footer />
            </>
        );
    }
}
