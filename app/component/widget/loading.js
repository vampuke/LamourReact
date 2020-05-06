import React from 'react';
import { Modal, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as GlobalStyle from '../../style/globalStyle';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                animationType="fade"
                transparent={true}>
                <View style={styles.modal}>
                    <View style={styles.wrapper}>
                        <ActivityIndicator size="large" color={GlobalStyle.ThemeColor} />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        width: GlobalStyle.screenWidth,
        height: GlobalStyle.screenHeight,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapper: {
        padding: 20,
        elevation: 10,
        borderRadius: 8,
        backgroundColor: '#fff'
    }
})

export default Loading;