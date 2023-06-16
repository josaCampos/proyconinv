import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from "expo-constants";

export default function RegFor({ navigation }) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellidoPaterno:'',
    apellildoMaterno:'',
    telefono:'',
    correo:'',
    contrasena:'',
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setUsuario({ ...usuario, nombre: value });
  };

  const onChangeAP = (value) => {
    setUsuario({ ...usuario, apellidoPaterno: value });
  };

  const onChangeAM = (value) => {
    setUsuario({ ...usuario, apellildoMaterno: value });
  };

  const onChangeTelefono = (value) => {
    setUsuario({ ...usuario, telefono: value });
  };

  const onChangeCorreo = (value) => {
    setUsuario({ ...usuario, correo: value });
  };

  const onChangeCon = (value) => {
    setUsuario({ ...usuario, contrasena: value });
  };

  const saveData = () => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(usuario.correo)) {
      setError('Ingresa un correo electrónico válido');
      return;
    }

    if (usuario.contrasena.length < 5) {
      Alert.alert('La contraseña debe tener al menos 5 caracteres');
      return;
    }

    if (
      usuario.nombre.trim() === '' ||
      usuario.apellidoPaterno.trim() === '' ||
      usuario.apellildoMaterno.trim() === '' ||
      usuario.correo.trim() === '' ||
      usuario.contrasena.trim() === '' ||
      usuario.telefono.trim() === ''
    ) {
      Alert.alert('Por favor, complete todos los campos');
      return;
    }

    // Validación del número de teléfono (10 dígitos)
    if (usuario.telefono.length !== 10 || isNaN(usuario.telefono)) {
      Alert.alert('El número de teléfono debe tener exactamente 10 dígitos');
      return;
    }
    
    
    setLoading(true);
    var myHeaders = new Headers();
    console.log(usuario);

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/usuarios", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: usuario.nombre,
        apellidoPaterno: usuario.apellidoPaterno,
        apellildoMaterno: usuario.apellildoMaterno,
        telefono: usuario.telefono,
        correo: usuario.correo,
        contrasena:usuario.contrasena,        
      }),
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => {
        console.log("Result");
        navigation.push("Usuario");
        console.log(result);
        Alert.alert('Registro con exito.');
        navigation.push("Home");
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control Invernadero App</Text>
      <Text style={styles.title1}>Formato de registro</Text>
      
      <TextInput
        placeholder={"Nombre"}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Apellido paterno"}
        onChangeText={(value) => onChangeAP(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Apellido materno"}
        onChangeText={(value) => onChangeAM(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Teléfono"}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Correo"}
        onChangeText={(value) => onChangeCorreo(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Contraseña"}
        onChangeText={(value) => onChangeCon(value)}
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
        borderWidth: 1,
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
