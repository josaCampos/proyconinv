import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from "expo-constants";

export default function InvernaderoAdd({ navigation }) {
  const [invernadero, setInvernadero] = useState({
    nombre: '',
    cultivo:'',
    variedad:'',
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setInvernadero({ ...invernadero, nombre: value });
  };

  const onChangeCultivo = (value) => {
    setInvernadero({ ...invernadero, cultivo: value });
  };

  const onChangeVariedad = (value) => {
    setInvernadero({ ...invernadero, variedad: value });
  };

  const saveData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    console.log(invernadero);

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/invernaderos", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: invernadero.nombre,
        cultivo: invernadero.cultivo,
        variedad: invernadero.variedad,
      }),
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => {
        console.log("Result");
        navigation.push("Invernadero");
        console.log(result);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control Invernadero App</Text>
      <Text style={styles.title1}>Registro de invernadero</Text>
      
      <TextInput
        placeholder={"Nombre"}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Cultivo"}
        onChangeText={(value) => onChangeCultivo(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Variedad"}
        onChangeText={(value) => onChangeVariedad(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
        <View style={{ backgroundColor: "#4c669f", padding: 15, borderRadius: 30, width:200, height:50, alignSelf:'center',marginTop:40, }}>
          <Text style={{ color: "white", textAlign: "center",fontSize:16, fontWeight:'bold', }}>
            {loading ? "Cargando..." : "Guardar"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    },
    title1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      },
      input: {
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 10,
        height: 50,
        fontSize: 18,
        width: 350,
        backgroundColor: '#fff',
      },
      
    button: {
    backgroundColor: '#4c669f',
    borderRadius: 30,
    padding: 15,
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Añadimos esta propiedad para centrar el texto
    },
    });
    
