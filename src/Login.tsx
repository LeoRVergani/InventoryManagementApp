import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        };
        checkLoginStatus();
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
                email,
                password,
            });

            if (response) {
                if (response === "admin")
                await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                Alert.alert('Erro', response.data.message);
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.bgGreen}>
                <View style={styles.logo}>
                    <Image 
                            source={require('../assets/OIG4.png')}
                            style={{width: 260, height: 260}}
                        />
                </View>


            <View style={styles.login}>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                    <Text style={styles.bold}>Entrar</Text>
                </TouchableOpacity>
            </View>

            </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#50CC8C'
    },
    input: {
        height: 40,
        borderColor: '#137440',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#c7ffe2'
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50CC8C'
    },
    login: {
        backgroundColor: '#FFF',
        padding: 50,
        marginTop: 20,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingBottom: 270
    },
    btnLogin: {
        backgroundColor: '#50CC8C',
        borderRadius: 8,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    bold: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 20
    },
    bgGreen: {
        flex: 1,
        backgroundColor: '#50CC8C',
        marginTop: 60
    }
});

export default LoginScreen;