/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {screen, system} from '../../common'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import { Button } from '../../widget';
import api from '../../api'

type Props = {
    navigation: any,
}

type State = {
    data: Array<Object>,
    refreshState: number,
}

class GroupPurchaseOrderScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '订单详情',
        gesturesEnabled: true,
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            refreshState: RefreshState.Idle,
        }
    }

    requestOrder = async () => {
        try{
            console.log("requestOrder")

            this.setState({refreshState: RefreshState.HeaderRefreshing})

            // let formData = new FormData();
            // formData.append('id', '123');

            let info = this.props.navigation.state.params.info
            let response = await fetch(api.serverhost + "/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(info)
            })
            let json = await response.json()

            console.log(JSON.stringify(json))
            // this.setState({
            //     refreshState: RefreshState.NoMoreData,
            // })
        } catch(error) {
            console.log(error)
            // this.setState({
            //     refreshState: RefreshState.Failure,
            // })
        }
    }

    render() {
        let info = this.props.navigation.state.params.info

        // console.log({info})

        return (
            <View style={styles.container}>
                <Text>id : {info.id}</Text>
                <Image style={styles.banner} source={{uri: info.imageurl.replace('w.h', '480.0')}}/>
                <Text>url : {info.imageUrl}</Text>
                <Text>brandname: {info.title}</Text>
                <Button 
                    titleStyle={{color: 'white', fontSize: 18}}
                    title='确认订单'
                    style={styles.buyButton}
                    onPress={ this.requestOrder}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5,
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
})

export default GroupPurchaseOrderScene