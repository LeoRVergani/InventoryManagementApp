import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type User = {
  profile: string;
  name: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('profile');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.icon}>
        <AntDesign name="user" size={40} color="#FFF" />
      </View>
      <View style={styles.userContainer}>
        {user && <Text style={styles.userText}>Olá, {user.name}</Text>}
        <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
          <Text style={styles.textLogout}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    height: 100,
    width: '100%',
    backgroundColor: '#9df0c5',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  userText: {
    fontWeight: 'bold',
  },
  btnLogout: {
    backgroundColor: '#50CC8C',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  textLogout: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    backgroundColor: '#50CC8C',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
