import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Switch, Modal, TextInput, TouchableOpacity } from 'react-native';
import { voucher_list, voucherFilter } from '../../redux/actions';
import * as GlobalStyle from '../../style/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GENDER_FILTERS } from '../../common/constant';
import Loading from './loading';
import VoucherSvc from '../../service/voucherService';

class VoucherNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addVoucherModal: false,
            duration: 1,
            quantity: 1,
            voucherTitle: "",
            infinite: false
        }
    }

    addVoucher() {
        this.setState({
            addVoucherModal: true,
            quantity: 1,
            duration: 1,
            voucherTitle: '',
            infinite: false
        });
    }

    async addVoucherWorker() {
        this.setState({ loading: true });
        let req = {
            title: this.state.voucherTitle,
            user_id: this.props.currentFilter,
            duration: Number(this.state.duration),
            quantity: Number(this.state.quantity)
        }
        let res = await VoucherSvc.postVoucher(req);
        console.log(res);
        if (res) {
            let voucher_list = await VoucherSvc.getVoucher();
            this.props.voucher_list(voucher_list);
            this.setState({ addVoucherModal: false, voucherTitle: "" })
        }
        this.setState({ loading: false });
    }

    setFilter(filter) {
        this.props.voucherFilter(filter);
    }

    onTitleChange(text) {
        this.setState({ voucherTitle: text });
    }

    onQuantityChange(text) {
        this.setState({ quantity: text });
    }

    onInfiniteChange(value) {
        let duration = value == true ? 0 : 1;
        this.setState({
            duration: duration,
            infinite: value
        });
    }

    onDurationChange(text) {
        this.setState({ duration: text });
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.addBtn}></View>
                <View style={styles.btnGroup}>
                    <TouchableWithoutFeedback onPress={() => { this.setFilter(GENDER_FILTERS.SHE) }}>
                        <View style={this.props.currentFilter == GENDER_FILTERS.SHE ? styles.focusBtn : styles.btn}>
                            <Text>
                                She
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { this.setFilter(GENDER_FILTERS.HE) }}>
                        <View style={this.props.currentFilter == GENDER_FILTERS.HE ? styles.focusBtn : styles.btn}>
                            <Text>
                                He
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={() => { this.addVoucher() }}>
                    <Icon name="plus" size={30} style={styles.addBtn} />
                </TouchableWithoutFeedback>
                <Loading visible={this.state.loading} />
                <Modal animationType="fade"
                    visible={this.state.addVoucherModal}
                    transparent={true}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modal}>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                                <Text style={{ width: 70 }}>Reason: </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.onTitleChange(text)}
                                    value={this.state.voucherTitle}
                                />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                                <Text style={{ width: 70 }}>quantity: </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.onQuantityChange(text)}
                                    value={this.state.quantity.toString()}
                                    textContentType={Number}
                                />
                            </View>
                            {
                                this.state.infinite == true ? null :
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                                        <Text style={{ width: 70 }}>Duration: </Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => this.onDurationChange(text)}
                                            value={this.state.duration.toString()}
                                            placeholder={"Months"}
                                        />
                                    </View>
                            }
                            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                                <Text style={{ width: 70 }}>Infinite: </Text>
                                <Switch
                                    trackColor={{ false: "#d9d9d9", true: GlobalStyle.ThemeColor }}
                                    thumbColor={this.state.infinite ? GlobalStyle.ThemeColor : "#f4f3f4"}
                                    onValueChange={(value) => { this.onInfiniteChange(value) }}
                                    value={this.state.infinite}
                                />
                            </View>




                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity onPress={() => { this.addVoucherWorker() }} style={styles.modalBtn} disabled={!this.state.voucherTitle.length}>
                                    <Text style={{ color: GlobalStyle.actionGreen, textAlign: 'center' }}>
                                        Add
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ addVoucherModal: false, voucherTitle: '' }) }} style={{ ...styles.modalBtn }}>
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
    navbar: {
        height: 50,
        backgroundColor: GlobalStyle.ThemeColor,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBtn: {
        color: 'white',
        width: 50,
        height: 30,
    },
    btnGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center'
    },
    btn: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row"
    },
    focusBtn: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center"
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
        width: 300,
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
    input: {
        borderColor: '#ffccc7',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        height: 40
    }
})

const mapStateToProps = state => {
    return {
        currentFilter: state.voucherDisplayFilter
    }
}

export default connect(
    mapStateToProps,
    { voucher_list, voucherFilter }
)(VoucherNavBar);