/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native'
import {screen, system} from '../../common'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import { Button, color } from '../../widget';
import api from '../../api'
import OrderCell from './OrderCell'

type Props = {
    navigation: any,
}

type State = {
    orderInfos: Array<Object>,
    refreshing: boolean,
}

class OrderListScene extends PureComponent<Props,State>{

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '我的订单',
        gesturesEnabled: true,
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            orderInfos: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.setState({refreshing: true})
        this.requestOrders()
    }

    requestOrders = async () => {
        let res = await fetch(api.serverhost+'/index/getOrder')
                .then((response)=>{
                    if(response.ok){
                        return response.json()
                    }
                })
                .then((responseText)=>{
                    return responseText
                })
                .catch((err)=>{
                    console.log(err)
                    this.setState({
                        refreshing: false
                    })
                })
                console.log(res)
                this.setState({
                    orderInfos: res,
                    refreshing: false,
                })

    }

    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    renderCell = (info: Object) => {
        return(
            <OrderCell
                data={info.item}
                onPress={()=> {alert('hello')}}
            />
        )
    }

    render() {
        console.log(this.state.orderInfos)
        return(
            <View style={styles.cosntainer}>
                <FlatList
                    data={this.state.orderInfos}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestOrders}
                    refreshing={this.state.refreshing}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cosntainer: {
        flex:1,
    }
})

export default OrderListScene