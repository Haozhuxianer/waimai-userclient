/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Picker} from 'react-native'
import {screen, system} from '../../common'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import { Button, color } from '../../widget';
import api from '../../api'

type Props = {
    navigation: any,
}

type State = {
    data: Array<Object>,

}

class GroupPurchaseOrderScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '提交订单',
        gesturesEnabled: true,
        headerStyle: {backgroundColor: color.orange}
    })

    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    requestOrder = async () => {
        try{
            console.log("requestOrder")

            this.setState({refreshState: RefreshState.HeaderRefreshing})

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
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        let info = this.props.navigation.state.params.info

        console.log({info})

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {this.props.navigation.navigate('Address')}}>
                        <Text style={{fontSize: 20,margin:10,}}>选择收货地址</Text>
                        <Image style={{width:25, height:25, marginLeft: 180,alignSelf: 'center'}} source={require('../../img/public/icon_more.png')}/>
                    </TouchableOpacity>
                    <View style={{height:1,backgroundColor:color.border}}></View>
                    {/* <TouchableOpacity>
                        <Text style={{fontSize: 20,margin:10,alignSelf:'center'}}>选择收货时间</Text>
                    </TouchableOpacity> */}
                    <Picker
                        mode={'dropdown'}>
                        <Picker.item label="选择收货时间：11:30" value='11:30'/>
                        <Picker.item label="选择收货时间：11:30" value='11:30'/>
                        <Picker.item label="选择收货时间：11:30" value='11:30'/>
                    </Picker>
                </View>
                <View style={styles.midContainer}>
                    <Text style={{fontSize: 15,margin:10,color:'black'}}>{info.title}</Text>
                    <View style={styles.banner}>
                        <Image style={styles.icon} source={{uri: info.imageurl.replace('w.h','160.0')}}/>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <Text style={{paddingTop:10,paddingRight:10,color: 'black', fontSize:15}}>{info.subtitle}</Text>
                            <Text style={{paddingTop:10,paddingRight:10,color:'black', fontSize:15}}>${info.price}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{padding:10, color:'black'}}>包装费：</Text>
                        <Text style={{padding:10, color:'black'}}>$2</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{padding:10, color:'black'}}>配送费：</Text>
                        <Text style={{padding:10, color:'black'}}>$1</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{padding:10, color:'black'}}>优惠卷：</Text>
                        <Text style={{padding:10, color:'black'}}>无</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{padding:10, color:'black'}}>红包：</Text>
                        <Text style={{padding:10, color:'black'}}>无</Text>
                    </View>
                </View>
                <View style={styles.bottomBar}>
                    <Text style={{flex:2,fontSize:20,textAlign:'right',alignSelf:'center',marginRight:30,color:'white',}}>总计：{info.price+3}</Text>
                    <TouchableOpacity style={{flex:1,backgroundColor:color.orange}}>
                        <Text style={{fontSize: 20,color:'black',textAlign:'center',marginTop: 13}}>提交订单</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },
    banner: {
        flexDirection: 'row',
        backgroundColor: color.border,
    },
    icon: {
        margin:5,
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    header: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        borderColor: color.border,
    },
    midContainer: {
        flex:1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        borderColor: color.border,
    },
    bottomBar: {
        flexDirection: 'row',
        height:50,
        backgroundColor: '#333333',
    },
})

export default GroupPurchaseOrderScene