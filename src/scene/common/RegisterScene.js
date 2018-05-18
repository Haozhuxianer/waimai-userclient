/*
 * @flow
 */

import React, {PureComponent} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {screen, system} from '../../common'
import { Button , color} from '../../widget';

type Props = {
    navigation: any,
}

type State = {
    id: String,
    pw: String,
    email: String,
    phone: String,
}

class RegisterScene extends PureComponent<Props, State> {

    static navigationOptions = ({navigation}: any) => ({
        header: null,
    })

    constructor(props: Props) {
        super(props)

        this.state = {

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
            <TextInput
				style={styles.textinput}
				underlineColorAndroid={'transparent'}
				autoFocus={true}
				numberOfLine = {1}
				placeholder="Your Email"
				textAlign='center'
				onChangeText = {(email) => this.setState({email})}
			/>
            <TextInput
				style={styles.textinput}
				underlineColorAndroid={'transparent'}
				autoFocus={true}
				numberOfLine = {1}
				placeholder="Your Telephone"
				textAlign='center'
				onChangeText = {(phone) => this.setState({phone})}
				/>
            <Button 
                style={styles.button}
                titleStyle={{fontSize: 18}}
                title='Register'
                onPress={()=> {
                    alert("Your account : " + this.state.id + " Your password :" + this.state.pw + this.state.email + this.state.phone);
                }}
            />
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

export default RegisterScene