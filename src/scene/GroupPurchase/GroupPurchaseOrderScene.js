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
    addressInfo: Object,

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
            addressInfo: {
                address: '三峡大学',
                name: '余闻浩',
                gender: '男士',
                tel: '17671732097'
            }
        }
    }

    requestOrder = async () => {
        try{
            console.log("requestOrder")

            this.setState({refreshState: RefreshState.HeaderRefreshing})

            let goodsinfo = this.props.navigation.state.params.info
            let addressInfo = this.state.addressInfo
            let orderInfo = {
                goodsInfo: {
                    id: goodsinfo.id,
                    title:goodsinfo.title,
                    subtitle: goodsinfo.subtitle,
                    price: goodsinfo.price
                },
                addressInfo
            }
            let info = await JSON.stringify(orderInfo)
            console.log(info)
            let response = await fetch(api.serverhost + "/index/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: info
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
                    <TouchableOpacity
                        style={{flexDirection: 'row'}} 
                        onPress={() => {
                            this.props.navigation.navigate('Address',{
                                callback: (data) => {
                                    console.log("callback:",data);
                                    this.setState({
                                        addressInfo:data
                                    })
                                }
                            })
                        }}>
                        <View style={{flex:1,paddingLeft:5}}>
                            <Text style={styles.text}>{this.state.addressInfo.address}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.text}>{this.state.addressInfo.name}</Text>
                                <Text style={styles.text}>{this.state.addressInfo.gender}</Text>
                                <Text style={styles.text}>{this.state.addressInfo.tel}</Text>
                            </View>
                        </View>
                        <Image style={{width:25, height:25, marginLeft: 180,alignSelf: 'center'}} source={require('../../img/public/icon_more.png')}/>
                    </TouchableOpacity>
                    <View style={{height:1,backgroundColor:color.border}}></View>
                    <Picker
                        mode={'dropdown'}>
                        <Picker.item label="选择收货时间：11:30" value='11:30'/>
                        <Picker.item label="选择收货时间：12:30" value='12:30'/>
                        <Picker.item label="选择收货时间：13:30" value='13:30'/>
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
                    <TouchableOpacity style={{flex:1,backgroundColor:color.orange}} onPress={this.requestOrder}>
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
    text: {
        fontSize: 15,
        color: 'black',
        margin: 5,
    },
})

export default GroupPurchaseOrderScene