import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./components/Header";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Header />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "85%",
          marginTop: 60,
          borderWidth: 1,
          borderRadius: 8,
          padding: 25,
          borderColor: "#41745e",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="box-open" size={40} color="#306b51" />
          <Text style={styles.TextBtn}>Estoque</Text>
        </View>

        <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('ProductList')}>
          <Text style={styles.TextBtn}>Gerenciar</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('MovementMoto')}>
          <Text style={styles.TextBtn}>MovementMoto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('Movimentos')}>
          <Text style={styles.TextBtn}>Movimentos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.TextBtn}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('MovementRegisterScreen')}>
          <Text style={styles.TextBtn}>MovementRegisterScreen</Text>
        </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "85%",
          marginTop: 40,
          borderWidth: 1,
          borderRadius: 8,
          padding: 25,
          borderColor: "#41745e",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="users-cog" size={40} color="#306b51" />
          <Text style={styles.TextBtn}>Usuários</Text>
        </View>

        <TouchableOpacity style={styles.btnGeral} onPress={() => navigation.navigate('UserList')}>
          <Text style={styles.TextBtn}>Gerenciar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bgEffect}>
        <LottieView
          source={require("../assets/boxanimation.json")}
          style={{ width: 250, height: 250 }}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextBtn: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#214737",
  },
  btnGeral: {
    backgroundColor: "#8fccab",
    padding: 10,
    borderRadius: 5,
  },
  bgEffect: {
    backgroundColor: "#38CC8C",
    height: "100%",
    width: "100%",
    marginTop: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
});
