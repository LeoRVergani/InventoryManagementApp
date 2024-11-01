import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

export default function UserRegisterScreen({ navigation }) {
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateFields = () => {
    if (!profile || !name || !document || !fullAddress || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
        profile,
        name,
        document,
        full_address: fullAddress,
        email,
        password
      });
      
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('UserList'); // Navega para a lista de usuários após o cadastro
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Perfil</Text>
      <Picker
        selectedValue={profile}
        style={styles.input}
        onValueChange={(itemValue) => setProfile(itemValue)}
      >
        <Picker.Item label="Selecione o Perfil" value="" />
        <Picker.Item label="Motorista" value="motorista" />
        <Picker.Item label="Filial" value="filial" />
      </Picker>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>{profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
      <TextInput
        style={styles.input}
        placeholder={profile === 'motorista' ? 'CPF' : 'CNPJ'}
        value={document}
        onChangeText={setDocument}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Endereço Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={fullAddress}
        onChangeText={setFullAddress}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
