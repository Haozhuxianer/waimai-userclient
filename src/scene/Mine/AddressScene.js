/**
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'
import AddressCell from './AddressCell'
import Realm from 'realm'
import model from '../../common/modelScheme'

type Props = {
    navigation: any,
}

type State = {
    dataList: Array<Object>,
    refreshing: boolean,
}


class AddressScene extends PureComponent<Props,State>{

    static navigationOptions = ({navigation}: any) => ({
            headerTitle: '选择收货地址',
            headerRight: (
                <TouchableOpacity onPress={() => {alert("管理")}}>
                    <Text 
                    style={{marginRight: 15, fontSize: 20, color: 'black', fontWeight: 'bold'}}
                    >管理</Text>
                </TouchableOpacity>
            )
        
    })

    constructor(props: Object) {
        super(props)

        this.state = {
            dataList: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.setState({refreshing:true})
        this.getDataFromRealm()
    }

    getDataFromRealm = async ()  =>{
        await Realm.open({schema: [model.AddressInfoScheme]})
        .then(realm => {
            let data = realm.objects('AddressInfo')
            this.setState({dataList: data, refreshing: false})
        }).catch(err => {
            this.setState({refreshing:false})
            console.log(err)
        })
    }

    renderHeader = () => {
        return (
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('UAddress')}}>
                <SpacingView />
                <View style={{flexDirection: 'row',backgroundColor: 'white', alignItems: 'center',padding: 15}}>
                    <Image style={{width:25, height:25}} source={require('../../img/public/icon_add.png')}/>
                    <Text
                        style={{marginLeft: 10,fontSize: 17, fontWeight: 'bold'}}
                    >
                    新增收货地址</Text>
                    <Image style={{width:25, height:25, marginLeft: 180}} source={require('../../img/public/icon_more.png')}/>
                </View>
                <SpacingView />
            </TouchableOpacity>
        )
    }

    renderCell = (dataList: Object) => {
        return (
            <AddressCell
                data={dataList.item}
                onPressEdit={(data) => {alert('edite')}}
                onPressSelect={(data) => {alert('selecter')}}
            />
        )
    }

    _keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    render() {
        // let dataList = [{id:1, name: "语文卷", gender: '男士', address: '新苑四栋', tel: '17671732097'}]
        return (
            <View style={styles.constainer}>
                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderCell}
                    // keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.state.refreshing}
                    onRefresh={this.getDataFromRealm}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: color.paper
    },
    cellcontainer: {
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white',
    }
})

export default AddressScene