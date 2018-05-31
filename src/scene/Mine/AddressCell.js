/**
 * @flow
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native'

import {Heading2, Heading3, Paragraph} from '../../widget/Text'
import {screen, system} from '../../common'
import {color, DetailCell, NavigationItem, SpacingView} from '../../widget'

type Props = {
    data: Object,
    onPressEdit: Function,
    onPressSelect: Function,
}


class AddressCell extends PureComponent<Props> {
    render() {
        let {data} = this.props
        console.log("AddressCellData:",data);
        return(
            <View style={styles.cellcontainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => this.props.onPressSelect(data)}>
                    <Text style={styles.text}>{data.address}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}>{data.name}</Text>
                        <Text style={styles.text}>{data.gender}</Text>
                        <Text style={styles.text}>{data.tel}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  style={{alignSelf: 'center'}} onPress={() => this.props.onPressEdit()}>
                    <Image source={require('../../img/public/icon_edit.png')} style={{width:25, height:25}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellcontainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 15,
        color: 'black',
        margin: 5,
    }
})

export default AddressCell