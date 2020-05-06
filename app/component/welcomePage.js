import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import * as GlobalStyle from '../style/globalStyle';
import { Actions } from 'react-native-router-flux';
import LocalStorage from '../common/storage';
import * as Config from '../common/Config';
import { connect } from 'react-redux';
import { user } from '../redux/actions';


class WelcomePage extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let userInfo = await LocalStorage.read(Config.USER_INFO);
        try {
            if (userInfo !== null && userInfo.length) {
                this.props.user(JSON.parse(userInfo));
                Actions.reset('MainPage');
            } else {
                Actions.reset('LoginPage');
            }
        } catch (err) { Actions.reset('LoginPage'); }
    }

    render() {
        return (
            <View style={styles.welcome}>
                <StatusBar hidden={true} />
                <Image source={require("../assets/img/logo.png")} resizeMode={"contain"} style={styles.img} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        backgroundColor: GlobalStyle.ThemeColor,
        flex: 1,
        justifyContent: "center",
    },
    img: {
        width: GlobalStyle.screenWidth
    }
});

export default connect(
    null,
    { user }
)(WelcomePage)