import {Text, StyleSheet, View, TextInput, Alert} from "react-native";
import {useEffect, useState} from 'react';
import { Button } from "../components/Button";
import {createOrSyncTableUsers, SignInOrUp} from '../entities/user/action'

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#abc1d1',
    },
    text: {
        textAlign: 'center',
        fontSize: 52,
        color: '#1f3954',
        marginTop: 200,
        marginBottom: 20,
        fontWeight: 'bold',
        lineHeight:52,
    },
    input: {
        width: 300,
        borderWidth: 1,
        color: '#f3f3f3',
        textAlign: 'center',
        fontSize: 28,
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#6a87a5',
        borderColor: 'rgba(75,113,152,0.8)',
    }
})

export const LoginPage = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // dropTableUsers()

        createOrSyncTableUsers();
    }, []);

    const signAction = async () => {
        if (login.length === 0 || password.length === 0) {
            Alert.alert('Данные не введены', 'Нужен логин и пароль для регистрации или входа.')
        } else {
            try {
                SignInOrUp(login, password, navigation)
                console.log(login, password)
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <View style={styles.body} >
            <Text style={styles.text}>
                Путевой Дневник
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Логин'
                placeholderTextColor='rgba(236,236,236,0.75)'
                onChangeText={(value) => setLogin(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Пароль'
                placeholderTextColor='rgba(236,236,236,0.75)'
                onChangeText={(value) => setPassword(value)}
            />
            <Button
                title='Вход или Регистрация'
                onPressFunc={signAction}
                color='#6a87a5'
            />
        </View>
  )
}
