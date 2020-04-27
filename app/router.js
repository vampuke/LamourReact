import React, { Component } from 'react';
import {
    Scene,
    Router,
    Lightbox, Drawer
} from 'react-native-router-flux';
import WelcomePage from './component/welcomePage';
import LoginPage from './component/loginPage';
import wishPage from './component/wishPage';
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text } from 'react-native';
import * as GlobalStyle from './style/globalStyle';

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
                <Scene key="MainPage" hideNavBar>
                    <Scene key="TabPage"
                        tabs
                        tabBarPosition={"bottom"}
                        showLabel={false}
                        tabBarStyle={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "#f5f5f5"
                        }}>
                        <Scene key="WishPage"
                            component={wishPage}
                            hideNavBar
                            title={'Wish'}
                            icon={WishIcon}
                            iconName={'magic'} />
                        <Scene key="WishPageer"
                            component={wishPage}
                            hideNavBar
                            title={'Voucher'}
                            icon={WishIcon}
                            iconName={'ticket'} />
                        <Scene key="WishPageersdsd"
                            component={wishPage}
                            hideNavBar
                            title={'Anniv'}
                            icon={WishIcon}
                            iconName={'calendar'} />
                        <Scene key="Wishersdsd"
                            component={wishPage}
                            hideNavBar
                            title={'FLower'}
                            icon={WishIcon}
                            iconName={'gift'} />
                    </Scene>
                </Scene>
            </Lightbox>
        </Router>
    )
};

class WishIcon extends Component {
    render() {
        var color = this.props.focused ? "#D3547E" : '#9e9e9e'
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ color: color }} name={this.props.iconName} size={20} />
                <Text style={{ color: color }}>{this.props.title}</Text>
            </View>
        )
    }
}

export default getRouter;
