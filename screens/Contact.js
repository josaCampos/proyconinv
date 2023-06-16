import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/logo.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.text1}>Instituto Tecnológico De Estudios Superiores De Zamora</Text>
      <Text style={styles.text}>Maestría en Sistemas Computacionales</Text>
      <Text style={styles.text}>Dispositivos Móviles</Text>
      <Text style={styles.text}>José Carlos Campos Pimentel</Text>
      <Text style={styles.text}>Profesor: Jorge Edgar Rojas Magdaleno</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  text1: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default Profile;
