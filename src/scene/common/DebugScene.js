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

class DebugScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: 'Debug',
        geturesEnable: true,
    })

    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Button
                title = 'Debug_Login'
                onPress={this.goToLoginScene}
            />
            <Button
                title = 'Debug_Register'
                onPress={this.goToRegisterSceme}
            />
            </View>
        )
    }

    goToLoginScene = () => {
        this.props.navigation.navigate('Login');
    }

    goToRegisterSceme = () => {
        this.props.navigation.navigate('Register');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default DebugScene