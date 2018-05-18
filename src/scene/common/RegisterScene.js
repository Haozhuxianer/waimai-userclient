/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {screen, system} from '../../common'
import { Button } from '../../widget';

type Props = {
    navigation: any,
}

type State = {

}

class RegisterScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: 'Register',
        geturesEnable: true,
    })

    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (<View></View>)
    }

}

const styles = StyleSheet.create({

})

export default RegisterScene