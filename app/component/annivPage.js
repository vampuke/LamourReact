import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, TouchableOpacity } from 'react-native';
import AnnivSvc from '../service/annivService';
import Loading from './widget/loading';
import * as GlobalStyle from '../style/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'

class VoucherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annivList: [],
            loading: false,
            refreshing: false,
            addAnnivModal: false,
            annivTitle: '',
            date: new Date()
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await this.getAnniv();
        this.setState({ loading: false });
    }

    async getAnniv() {
        let res = await AnnivSvc.getAnnivList();
        if (res) {
            for (let anniv of res) {
                anniv.displayDate = new Date(anniv.datetime).getFullYear().toString() + "-" + (new Date(anniv.datetime).getMonth() + 1).toString() + '-' + new Date(anniv.datetime).getDate().toString();
            }
            this.setState({ annivList: res });
        }
    }

    addAnniv() {
        this.setState({ addAnnivModal: true });
    }

    async addAnnivWorker() {
        console.log(this.state.date, this.state.annivTitle);
        this.setState({ loading: true });
        let req = {
            title: this.state.annivTitle,
            datetime: Date.parse(this.state.date)
        }
        let res = await AnnivSvc.postAnniv(req);
        if (res) {
            this.setState({
                addAnnivModal: false,
                annivTitle: '',
                date: new Date()
            })
            await this.getAnniv();
        }
        this.setState({ loading: false });
    }

    onChangeText(text) {
        this.setState({ annivTitle: text });
    }

    render() {
        return (
            <View>
                <Loading visible={this.state.loading} />
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={[GlobalStyle.ThemeColor]}
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getAnniv()} />
                        }>
                        <View style={styles.scrollWrapper}>
                            {this.state.annivList.length
                                ? <View style={styles.dotWrapper}>
                                    <View style={styles.dash}></View>
                                </View> : null}
                            <View style={{ flexDirection: "column" }}>
                                {this.state.annivList.length
                                    ?
                                    this.state.annivList.map((anniv, index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: "row" }}>
                                                <View style={styles.annivWrapper}>
                                                    <View>
                                                        <Text style={{ fontWeight: "bold" }}>{anniv.displayDate}</Text>
                                                        <View style={styles.dot}></View>
                                                    </View>
                                                    <View style={styles.annivTitle}>
                                                        <Text style={{ color: "#FFF" }}>{anniv.title}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                    : <ActivityIndicator size="large" style={{ paddingTop: 50 }} color={GlobalStyle.ThemeColor} />}
                            </View>

                        </View>
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.floatBtn}>
                    <TouchableWithoutFeedback onPress={() => { this.addAnniv() }}>
                        <Icon name="plus" size={30} style={styles.addBtn} />
                    </TouchableWithoutFeedback>
                </View>
                <Modal animationType="fade"
                    visible={this.state.addAnnivModal}
                    transparent={true}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modal}>
                            <DatePicker
                                date={this.state.date}
                                mode={'date'}
                                onDateChange={(value) => { this.setState({ date: value }) }}
                            />
                            <TextInput
                                style={{ borderColor: '#ffccc7', borderWidth: 1, borderRadius: 10 }}
                                onChangeText={text => this.onChangeText(text)}
                            />
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity onPress={() => { this.addAnnivWorker() }} style={styles.modalBtn} disabled={!this.state.annivTitle.length}>
                                    <Text style={{ color: GlobalStyle.actionGreen, textAlign: 'center' }}>
                                        Add
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ addAnnivModal: false, annivTitle: '' }) }} style={{ ...styles.modalBtn }}>
                                    <Text style={{ color: GlobalStyle.actionGreen, textAlign: 'center' }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: GlobalStyle.contentHeightWithoutNav,
        paddingTop: 20
    },
    scrollWrapper: {
        flexDirection: "row"
    },
    dotWrapper: {
        width: 1,
        alignItems: "center",
        borderRightColor: "#d9d9d9",
        borderRightWidth: 2,
        marginRight: 13,
        marginLeft: 16
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: "#9B9B9B",
        position: "absolute",
        left: -18,
        top: 7
    },
    dash: {
        borderColor: '#000',
        borderRadius: 0.5,
        height: 5,
        borderWidth: 1,
        borderStyle: 'dotted'
    },
    modalWrapper: {
        width: GlobalStyle.screenWidth,
        height: GlobalStyle.screenHeight,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#fff",
        elevation: 10,
        // width: 300,
        borderRadius: 10,
        padding: 10
    },
    modalBtn: {
        marginTop: 20,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    annivWrapper: {
        flexDirection: "column",
    },
    annivTitle: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: GlobalStyle.orange,
        maxWidth: GlobalStyle.screenWidth - 50,
        marginBottom: 20
    },
    dash: {
        width: 2,
        height: 5,
        marginBottom: 5,
        marginLeft: 6,
        borderLeftWidth: 1,
        borderColor: "white"
    },
    floatBtn: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 50,
        height: 50,
        width: 50,
        backgroundColor: GlobalStyle.actionGreen,
        justifyContent: "center",
        alignItems: "center"
    },
    addBtn: {
        color: 'white',
    },
})

export default VoucherPage;