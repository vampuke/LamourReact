import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Button, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Modal, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { user, wish_list } from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as GlobalStyle from '../style/globalStyle';
import WishSvc from '../service/wishService';
import WishNavBar from './widget/wishNavBar';
import { getWishByFilter } from '../redux/wishActions';
import { WISH_FILTERS } from '../common/constant';
import Loading from './widget/loading';


class WishPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            modalShow: false,
            selectedWish: null,
            loading: false
        }
    }

    async componentDidMount() {
        await this.getWish();
    }

    componentDidUpdate() {
        this.wishScroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    async addWish() {
        this.getWish();
    }

    async getWish() {
        let res = await WishSvc.getWishList();
        this.props.wish_list(res);
    }

    wishAction(wish) {
        this.setState({ selectedWish: wish });
        this.setState({ modalShow: true });
    }

    deleteWish() {
        if (this.state.selectedWish) {
            Alert.alert(
                "Confirm",
                "Confirm delete?",
                [
                    {
                        text: "Confirm",
                        onPress: () => { this.deleteWorker() }
                    },
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ]
            )
        }
    }

    async deleteWorker() {
        this.setState({ loading: true });
        let res = await WishSvc.deleteWish(this.state.selectedWish.id);
        if (res) {
            await this.getWish();
            this.setState({ modalShow: false });
        }
        this.setState({ loading: false });
    }

    async wishStatusWorker() {
        this.setState({ loading: true });
        var req = {
            id: this.state.selectedWish.id,
            status: this.state.selectedWish.status == WISH_FILTERS.COMPLETE ? 1 : 3
        }
        let res = await WishSvc.wishStatus(req);
        if (res) {
            await this.getWish();
            this.setState({ modalShow: false, selectedWish: null });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.centered}>
                <WishNavBar />
                <Modal animationType="fade"
                    visible={this.state.modalShow}
                    onRequestClose={() => this.setState({ selectedWish: null })}
                    transparent={true}>
                    <View style={styles.modalWrapper}>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: GlobalStyle.actionGreen }} onPress={() => { this.wishStatusWorker() }}>
                            <Text style={styles.btnText}>{this.props.currentFilter == WISH_FILTERS.COMPLETE ? "Revert" : "Complete"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: GlobalStyle.dislikeRed }} onPress={() => { this.deleteWish() }}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.button, backgroundColor: '#919191' }} onPress={() => { this.setState({ modalShow: false, selectedWish: null }) }}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Loading visible={this.state.loading} />
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}
                        ref={(view) => { this.wishScroll = view; }}
                        refreshControl={
                            <RefreshControl
                                colors={[GlobalStyle.ThemeColor]}
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getWish()} />
                        }>
                        {this.props.display_list && this.props.display_list.length != 0
                            ? this.props.display_list.map((wish, index) => {
                                return (
                                    <TouchableWithoutFeedback activeOpacity={0.7} key={wish.id} onPress={() => { this.wishAction(wish) }}>
                                        <View style={styles.wishItem}>
                                            <Text>{wish.title}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
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
    wishItem: {
        elevation: 8,
        margin: 8,
        borderRadius: 8,
        padding: 14,
        backgroundColor: '#fff'
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
    }
})

const mapStateToProps = state => {
    const { wishDisplayFilter } = state;
    const display_list = getWishByFilter(state, wishDisplayFilter);
    return {
        display_list,
        currentFilter: state.wishDisplayFilter
    };
};

export default connect(
    mapStateToProps,
    { user, wish_list }
)(WishPage)