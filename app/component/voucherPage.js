import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Modal, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { user, voucher_list } from '../redux/actions';
import * as GlobalStyle from '../style/globalStyle';
import VoucherSvc from '../service/voucherService';
import { getVoucherByFilter } from '../redux/voucherActions';
import { VOUCHER_TYPE } from '../common/constant';
import Loading from './widget/loading';
import VoucherNavBar from './widget/voucherNavBar';

class VoucherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: false,
            selectedVoucher: null
        }
    }

    async componentDidMount() {
        await this.getVoucher();
    }



    async getVoucher() {
        let res = await VoucherSvc.getVoucher();
        if (res) {
            this.props.voucher_list(res);
        }
    }

    redeemVoucher(voucher) {
        if (voucher) {
            this.setState({ selectedVoucher: voucher });
            Alert.alert(
                "Confirm",
                "Confirm redeem?",
                [
                    {
                        text: "Confirm",
                        onPress: () => { this.redeemVoucherWorker() }
                    },
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ]
            )
        }
    }

    async redeemVoucherWorker() {
        this.setState({ loading: true });
        let req = {
            id: this.state.selectedVoucher.id,
            status: 3
        }
        let res = await VoucherSvc.postVoucher(req);
        if (res) {
            await this.getVoucher();
        }
        this.setState({ loading: false });
    }

    render() {
        var dashArr = [];
        for (let i = 0; i < 8; i++) {
            dashArr.push(i);
        }
        return (
            <View>
                <VoucherNavBar />
                <Loading visible={this.state.loading} />
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={[GlobalStyle.ThemeColor]}
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getVoucher()} />
                        }>
                        {this.props.display_list && this.props.display_list.length != 0
                            ? this.props.display_list.map((voucher, index) => {
                                return (
                                    <View style={styles.voucherItem} key={voucher.id}>
                                        <View style={styles.voucherDetail}>
                                            <View style={{ height: 80, width: 170, justifyContent: "center", paddingLeft: 14 }}>
                                                <Text style={{ fontSize: 20, color: '#fff' }}>
                                                    {voucher.title}
                                                </Text>
                                            </View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                                <View style={{ flexDirection: "row", height: 15 }}>
                                                    <View style={{ width: 60 }}>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>Issue:</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>{voucher.date_create}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "row", height: 15 }}>
                                                    <View style={{ width: 60 }}>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>Expire:</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>{voucher.type == VOUCHER_TYPE.LIMITED ?
                                                            voucher.date_expire : "Infinite"}
                                                        </Text>
                                                    </View>
                                                </View>
                                                {voucher.type == VOUCHER_TYPE.LIMITED ?
                                                    <View style={{ flexDirection: "row", height: 15 }}>
                                                        <View style={{ width: 60 }}>
                                                            <Text style={{ color: "#fff", fontSize: 12 }}>Days left:</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ color: "#fff", fontSize: 12 }}>{voucher.daysLeft}</Text>
                                                        </View>
                                                    </View>
                                                    : null}
                                                <View style={{ flexDirection: "row", height: 15 }}>
                                                    <View style={{ width: 60 }}>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>Quantity:</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ color: "#fff", fontSize: 12 }}>{voucher.quantity}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dashWrapper}>
                                            <View style={{ ...styles.halfRound, top: -7 }}></View>
                                            {dashArr.map((dash, index) => {
                                                return (
                                                    <View style={styles.dash} key={index}></View>
                                                )
                                            })}
                                            <View style={{ ...styles.halfRound, bottom: -7 }}></View>
                                        </View>
                                        <View style={styles.redeemBtn}>
                                            <TouchableWithoutFeedback onPress={() => { this.redeemVoucher(voucher) }}>
                                                <Text style={{ fontWeight: 'bold', color: "#fff" }}>Redeem</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                )
                            })
                            : <ActivityIndicator size="large" style={{ paddingTop: 50 }} color={GlobalStyle.ThemeColor} />}
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: GlobalStyle.contentHeight
    },
    modalWrapper: {
        width: GlobalStyle.screenWidth,
        elevation: 10,
        marginTop: "auto"
    },
    button: {
        width: GlobalStyle.screenWidth - 40,
        marginLeft: 20,
        marginBottom: 10,
        padding: 14,
        borderRadius: 20,
        elevation: 18,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    },
    voucherItem: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "#FFAB40",
        margin: 8,
        height: 80
    },
    voucherDetail: {
        flex: 1,
        flexDirection: "row"
    },
    redeemBtn: {
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    dashWrapper: {
        width: 10,
        height: 80,
        flexDirection: "column"
    },
    halfRound: {
        borderRadius: 100,
        width: 14,
        height: 14,
        backgroundColor: "#fff",
        position: 'absolute',
    },
    dash: {
        width: 2,
        height: 5,
        marginBottom: 5,
        marginLeft: 6,
        borderLeftWidth: 1,
        borderColor: "white"
    }
})

const mapStateToProps = state => {
    const { voucherDisplayFilter } = state;
    const display_list = getVoucherByFilter(state, voucherDisplayFilter);
    return {
        display_list,
        currentFilter: state.voucherDisplayFilter
    };
};

export default connect(
    mapStateToProps,
    { user, voucher_list }
)(VoucherPage)