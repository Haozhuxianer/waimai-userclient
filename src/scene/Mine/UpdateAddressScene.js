/**
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'
import Realm from 'realm'
import api from '../../api'
import model from '../../common/modelScheme'
type Props = {
    navigation: any,
}

type State = {
    realm: any,
    name: String,
    gender: String,
    address: String,
    tel: number,
    plate: String,
}

class UpdateAddressScene extends PureComponent<Props,State>{

    static navigationOptions = ({navigation}) => {
        
        const params = navigation.state.params || {};

        return {
            headerTitle: '编辑收货地址',
            headerRight: (
                <TouchableOpacity onPress={params.saveAddress}>
                    <Text 
                    style={{marginRight: 15, fontSize: 20, color: 'black', fontWeight: 'bold'}}
                    >保存</Text>
                </TouchableOpacity>)
        }
    
    }

    // infoScheme = {
    //     name:'AddressInfo', properties:{
    //     id: 'int',
    //     name: 'string',
    //     gender: 'string',
    //     address: 'string',
    //     tel: 'int'
    //     }
    // }

    constructor(props:Object) {
        super(props)

        this.state = {
            realm: null,
            name: '',
            address: '',
            gender: '',
            tel: 0,
            plate: "",
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({saveAddress: this._saveAddress})
    }

    _saveAddress = ()  => {
        Realm.open({schema: [model.AddressInfoScheme]})
        .then(realm => {
            realm.write(() => {
                realm.create('AddressInfo', {
                    id: 1,
                    name: this.state.name,
                    gender: this.state.gender,
                    address: this.state.address + this.state.plate,
                    tel: parseInt(this.state.tel)
                })
            })
            alert("保存成功")
            this.props.navigation.goBack();
        })
        .catch(err => {
            console.log(err)
            alert('保存失败')
        })
            
    }

    render() {
        return (
            <View style={styles.constainer}>
                <Text style={styles.titleText}>联系人</Text>
                <View style={{height:1, backgroundColor: color.border}}></View>
                <View style={styles.inputcontainer}>
                    <Text 
                    style={styles.inputTitleText}>姓名：</Text>
                    <TextInput 
                    style={{flex:4}}
                    onChangeText={(name) => this.setState({name})}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{height:1, backgroundColor: color.border, marginLeft:15}}></View>
                <View style={styles.inputcontainer}>
                    <Text 
                    style={styles.inputTitleText}>性别：</Text>
                    <TextInput 
                    style={{flex:4}}
                    onChangeText={(gender) => this.setState({gender})}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{height:1, backgroundColor: color.border, marginLeft:15}}></View>
                <View style={styles.inputcontainer}>
                    <Text 
                    style={styles.inputTitleText}>手机：</Text>
                    <TextInput 
                    style={{flex:4}}
                    onChangeText={(tel) => this.setState({tel})}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{height:1, backgroundColor: color.border}}></View>
                <Text style={styles.titleText}>收货地址</Text>
                <View style={{height:1, backgroundColor: color.border}}></View>
                <View style={styles.inputcontainer}>
                    <Text 
                    style={styles.inputTitleText}>小区/大厦/学校：</Text>
                    <TextInput 
                    style={{flex:2}}
                    onChangeText={(address) => this.setState({address})}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{height:1, backgroundColor: color.border, marginLeft:15}}></View>
                <View style={styles.inputcontainer}>
                    <Text 
                    style={styles.inputTitleText}>门牌号：</Text>
                    <TextInput 
                    style={{flex:4}}
                    onChangeText={(plate) => this.setState({plate})}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{height:1, backgroundColor: color.border}}></View>
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
    },
    inputcontainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize:15, 
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    inputTitleText: {
        flex:1, 
        alignSelf: 'center', 
        marginLeft: 15, 
        fontSize:17, 
        color: 'black',
    }
})

export default UpdateAddressScene