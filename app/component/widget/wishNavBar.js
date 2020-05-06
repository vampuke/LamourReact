import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { wishFilter, wish_list } from '../../redux/actions';
import * as GlobalStyle from '../../style/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WISH_FILTERS } from '../../common/constant';
import { getWishListNumber } from '../../redux/wishActions';
import Loading from './loading';
import WishSvc from '../../service/wishService';

class WishNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addWishModal: false,
            wishTitle: ""
        }
    }

    addWish() {
        this.setState({ addWishModal: true });
    }

    async addWishWorker() {
        this.setState({ loading: true });
        let req = {
            title: this.state.wishTitle
        }
        let res = await WishSvc.wishStatus(req);
        if (res) {
            let res = await WishSvc.getWishList();
            this.props.wish_list(res);
            this.setState({ addWishModal: false, wishTitle: "" })
        }
        this.setState({ loading: false });
    }

    setFilter(filter) {
        this.props.wishFilter(filter);
    }

    onChangeText(text) {
        this.setState({ wishTitle: text });
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.addBtn}></View>
                <View style={styles.btnGroup}>
                    <TouchableWithoutFeedback onPress={() => { this.setFilter(WISH_FILTERS.INCOMPLETE) }}>
                        <View style={this.props.currentFilter == WISH_FILTERS.INCOMPLETE ? styles.focusBtn : styles.btn}>
                            <Text>
                                Incomplete
                            </Text>
                            <View style={styles.badge}>
                                <Text style={this.props.currentFilter == WISH_FILTERS.INCOMPLETE ? styles.badgeText : {}}>
                                    {this.props.currentFilter == WISH_FILTERS.INCOMPLETE ? this.props.currentLength : ""}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { this.setFilter(WISH_FILTERS.COMPLETE) }}>
                        <View style={this.props.currentFilter == WISH_FILTERS.COMPLETE ? styles.focusBtn : styles.btn}>
                            <Text>
                                Completed
                            </Text>
                            <View style={styles.badge}>
                                <Text style={this.props.currentFilter == WISH_FILTERS.COMPLETE ? styles.badgeText : {}}>
                                    {this.props.currentFilter == WISH_FILTERS.COMPLETE ? this.props.currentLength : ""}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={() => { this.addWish() }}>
                    <Icon name="plus" size={30} style={styles.addBtn} />
                </TouchableWithoutFeedback>
                <Loading visible={this.state.loading} />
                <Modal animationType="fade"
                    visible={this.state.addWishModal}
                    transparent={true}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modal}>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                style={{ borderColor: '#ffccc7', borderWidth: 1, borderRadius: 10 }}
                                onChangeText={text => this.onChangeText(text)}
                            />
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity onPress={() => { this.addWishWorker() }} style={styles.modalBtn} disabled={!this.state.wishTitle.length}>
                                    <Text style={{ color: GlobalStyle.actionGreen, textAlign: 'center' }}>
                                        Add
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ addWishModal: false, wishTitle: '' }) }} style={{ ...styles.modalBtn }}>
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
    badge: {
        backgroundColor: GlobalStyle.deleteRed,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 4
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        paddingLeft: 4,
        paddingRight: 4
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
    }
})

const mapStateToProps = state => {
    const { wishDisplayFilter } = state;
    const length = getWishListNumber(state, wishDisplayFilter);
    return {
        currentFilter: state.wishDisplayFilter,
        currentLength: length
    }
}

export default connect(
    mapStateToProps,
    { wish_list, wishFilter }
)(WishNavBar);