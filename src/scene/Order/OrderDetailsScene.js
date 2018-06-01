/**
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {color, Button, NavigationItem, SpacingView} from '../../widget'

import {screen, system} from '../../common'
import api from '../../api'


type Props = {
    navigation: any,
}

type State = {

}

class OrderDetailsScene extends PureComponent<Props,State>{

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: '订单详情',
        gesturesEnabled: true,
        headerStyle: {backgroundColor: 'transparent'},
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }
    


    render() {

        let data = this.props.navigation.state.params.info
        console.log(data)
        var text = '等待商家接单中';
        var subtext = '订单申请已经发出，正在等待商家确认，如有问题请联系客服'
        switch(data.status){
            case -1:
                text= '商家拒绝接单'
                subtext='商家已经暂停服务，拒绝接受此次交易，请选择其他商家'
                break;
            case 1:
                text= '商家已接单'
                subtext='商品准备中，由商家配送，请耐心等待，配送进度请咨询商家'
                break;
            case 2:
                text= '订单已完成'
                subtext='此次订单已经完成，祝您用餐愉快~'
                break;
        }

        return(
            <View style={styles.cosntainer}>
                <View style={styles.banner}>
                <View style={{height:1,width:30,backgroundColor:color.border,alignSelf:'center',marginTop:10}}></View>
                    <Text style={{fontSize:20,color:'black',fontWeight:'bold',textAlign:'center',padding:10}}>{text}</Text>
                    <View style={{height:1,backgroundColor:color.border}}></View>
                    <Text style={{fontSize:15,textAlign:'center',padding:10}}>{subtext}</Text>
                    <View style={{height:1,width:30,backgroundColor:color.border,alignSelf:'center',marginBottom:10}}></View>
                </View>
                <View style={styles.midbanner}>
                    <View style={{height:1,width:30,backgroundColor:color.border,alignSelf:'center',margin:10}}></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>商家名</Text>
                        <Text style={styles.midtext}>{data.goodsInfo.title}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>商品名</Text>
                        <Text style={styles.midtext}>{data.goodsInfo.subtitle}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>价    格</Text>
                        <Text style={styles.midtext}>{data.goodsInfo.price}元</Text>
                    </View>
                    <View style={{height:1,backgroundColor:color.border,margin:10}}></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>收货姓名</Text>
                        <Text style={styles.midtext}>{data.addressInfo.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>收货地址</Text>
                        <Text style={styles.midtext}>{data.addressInfo.address}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.midtitle}>收货电话</Text>
                        <Text style={styles.midtext}>{data.addressInfo.tel}</Text>
                    </View>
                    <View style={{height:1,backgroundColor:color.border,margin:10}}></View>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center'}}>
                        <Image source={require('../../img/order/icon_phone.png')} style={{height:25,width:25,marginRight:10}}/>
                        <Text style={{fontSize:20,color:'black',fontWeight:'bold'}}>联系电话</Text>  
                    </TouchableOpacity>
                    <View style={{height:1,width:30,backgroundColor:color.border,alignSelf:'center',margin:10}}></View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize:20, fontWeight:'bold',color:'white',textAlign:'center',padding:5}}>确认订单</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cosntainer: {
        flex:1
    },
    banner: {
        margin:10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    midbanner: {
        margin:10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    midtext: {
        paddingLeft:20,
        fontSize:15,
        color: 'black',
        fontWeight: 'bold',
    },
    midtitle:{
        paddingLeft:20,
        fontSize:15,
        fontWeight: 'bold',
    },
    button:{
        backgroundColor: color.orange,
        margin:10,
        borderRadius: 5,
    }
})

export default OrderDetailsScene