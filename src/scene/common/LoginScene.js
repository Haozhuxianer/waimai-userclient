/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import {screen, system} from '../../common'
import {color, SpacingView, Button} from '../../widget';

type Props = {
    navigation: any,
}

type State = {
    id: String,
    pw: String,
}


class LoginScene extends PureComponent<Props, State> {
    
    static navigationOptions = ({navigation}: any) => ({
        header: null,
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            id: "",
            pw: "",
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <TextInput
				style={styles.textinput}
				underlineColorAndroid={'transparent'}
				autoFocus={true}
				numberOfLine = {1}
				placeholder="Your Account"
				textAlign='center'
				onChangeText={(id) => this.setState({id})}
				/>
			<TextInput
				style={styles.textinput}
				underlineColorAndroid={'transparent'}
				autoFocus={true}
				numberOfLine = {1}
				placeholder="Your Password"
				textAlign='center'
				onChangeText = {(pw) => this.setState({pw})}
				/>
            <Button 
                style={styles.button}
                titleStyle={{fontSize: 18}}
                title='Login'
                onPress={() => {alert("Your account : " + this.state.id + " Your password :" + this.state.pw);}}
            />
            <TouchableOpacity >
                <Text style={{marginLeft: 10, marginTop: 10}}>No Account? join us!</Text>
            </TouchableOpacity>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.primary,
    },
    textinput: {
        marginTop: 10, 
        height: 40, 
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: color.paper,
    },
    button: {
        backgroundColor: color.paper,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        height: 40, 
        borderRadius: 7,
    }
})

export default LoginScene