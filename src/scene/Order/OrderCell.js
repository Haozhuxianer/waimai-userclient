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
    onPress: Function,
}

class OrderCell extends PureComponent<Props>{
    render() {
        let {data} = this.props
        console.log(data)
        return(
            <TouchableOpacity style={styles.cellcontainer} onPress={()=> this.props.onPress(data)}>
                <Text style={styles.text}>{data.goodsInfo.title}</Text>
                <Text style={styles.text}>{data.goodsInfo.subtitle}</Text>
                <Text style={styles.text}>{data.goodsInfo.price}</Text>
                <Text style={styles.text}>{data.addressInfo.address}</Text>
                <Text style={styles.text}>{data.addressInfo.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cellcontainer: {
        flex:1,
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

export default OrderCell