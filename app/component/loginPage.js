import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image, Button, Text } from 'react-native';
import * as GlobalStyle from '../style/globalStyle';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Api from '../service/httpService';
import { user } from '../redux/actions'
import LocalStorage from '../common/storage';
import * as Config from '../common/Config';
import * as Address from '../service/address';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user_name: "" }
        this.param = {
            user_name: '',
            password: ''
        }
    }

    async componentDidMount() {
        try {
            let name = await LocalStorage.read(Config.USER_NAME);
            if (name && name.length) {
                this.setState({ user_name: name });
            }
        } catch (err) { }
    }

    userInputChange(text) {
        this.param.user_name = text;
        this.setState({ user_name: text });
    }

    pwdInputChange(text) {
        this.param.password = text;
    }

    async loginIn() {
        let res = await Api.postFetch(Address.LOGIN, this.param);
        console.log(res);
        if (res && !res.code) {
            try {
                await LocalStorage.save(Config.USER_INFO, JSON.stringify(res));
                await LocalStorage.save(Config.USER_NAME, this.param.user_name);
                this.props.user(res);
            }
            catch (err) { }
        }
    }

    render() {
        return (
            <View style={styles.welcome}>
                <StatusBar hidden={false} backgroundColor={GlobalStyle.ThemeColor} translucent
                    barStyle={'light-content'} />
                <View style={styles.container}>
                    <Image source={require("../assets/img/logo.png")} resizeMode={"contain"} style={styles.img} />
                    <View style={styles.input}>
                        <TextInput placeholder={"User"} onChangeText={(text) => this.userInputChange(text)} value={this.state.user_name}></TextInput>
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder={"Password"} onChangeText={(text) => this.pwdInputChange(text)} secureTextEntry={true}></TextInput>
                    </View>
                    <View style={styles.input}>
                        <Button
                            title="Login"
                            onPress={() => this.loginIn()}
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        backgroundColor: GlobalStyle.ThemeColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: 300,
        height: 430,
        backgroundColor: "#fff",
        borderRadius: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 18
    },
    img: {
        width: 240,
        height: 150
    },
    input: {
        width: 240,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: GlobalStyle.LigthGray,
    }
});

const mapStateToProps = state => {
    return {
        userInfo: state.user
    }
}

export default connect(
    mapStateToProps,
    { user }
)(LoginPage)