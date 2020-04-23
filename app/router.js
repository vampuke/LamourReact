import React, { Component } from 'react';
import {
    Scene,
    Router,
    Lightbox, Drawer
} from 'react-native-router-flux';
import WelcomePage from './component/welcomePage';
import LoginPage from './component/loginPage';

const getRouter = () => {
    return (
        <Router>
            <Lightbox>
                <Scene key="main">
                    <Scene key="WelcomePage" component={WelcomePage} hideNavBar hideTabBar hide />

                </Scene>
                <Scene key="LoginPage">
                    <Scene component={LoginPage} hideNavBar showLabel={false} />
                </Scene>
            </Lightbox>
        </Router>
    )
};


export default getRouter;
