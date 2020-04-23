import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import * as GlobalStyle from '../style/globalStyle';
import { Actions } from 'react-native-router-flux';
import LocalStorage from '../common/storage';
import * as Config from '../common/Config';


export default class WelcomePage extends Component {

    async componentDidMount() {
        let test = await LocalStorage.read(Config.USER_INFO);
        try {
            console.log(JSON.parse(test));
        } catch (err) { }
        setTimeout(() => {
            Actions.reset('LoginPage');
        }, 1000);
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
