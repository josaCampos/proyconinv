import React, { useState } from "react";
import {  StyleSheet, Text, View, TextInput, Dimensions, Platform, Image,TouchableOpacity, Button, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


const Home = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState([]);

  const getUsuarioData = async () => {
    try {
      const response = await fetch("http://192.168.137.1:3000/usuarios");
      const data = await response.json();
      console.log(data);
      setUsuario(data);
    } catch (error) {
      Alert.alert('Aviso', 'No es posible conectar.');
      console.log('b');
      console.error(error);
    }
  };



  useState(() => {
    getUsuarioData();
  }, []);



  const handleSubmit = () => {
    // Validar correo y contraseña
    const persona = usuario.find((usuario) => usuario.correo === email && usuario.contrasena === password);
  if (persona) {
    navigation.navigate('InvernaderosTab');
    setError('');
  } else {
    setError('Correo o contraseña incorrectos');
  }
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../images/imagen4.jpg')} style={styles.imagen} />

      <Text style={styles.titulo}>Control Invernadero App</Text>
      <Text style={styles.subtitulo1}>¡Bienvenido!</Text>
      <Text style={styles.subtitulo2}>Agrega tus credenciales</Text>
      <TextInput
       style={styles.textInput}
       placeholder='josa@gmail.com'
       onChangeText={setEmail}
       value={email}
      />
      <TextInput
       style={styles.textInput}
       placeholder='Contraseña'
       secureTextEntry={true}
       onChangeText={setPassword}
       value={password}
      />
      
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit(navigation)}>
  <LinearGradient
    colors={['#4c669f', '#3b5998', '#192f6a']}
    style={styles.gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  />
  <Text style={styles.buttonText3}>Iniciar sesión</Text>
</TouchableOpacity>
{error ? <Text style={styles.errorText}>{error}</Text> : null}
<Button
        title="¿Aun no tienes cuenta? Registrate."
        onPress={() => navigation.navigate("About")}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  titulo: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  subtitulo1: {
    fontSize: 30,
    color: '#34434D',
    marginBottom: 1,
    fontWeight: 'bold',
  },
  subtitulo2: {
    fontSize: 20,
    marginBottom: 5,
    color: 'gray',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    fontSize: 18,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  imagen: {
    width: 420,
    height: 280,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  errorText: {
  color: 'red',
  marginTop: 10,
  },
  buttonText2: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    },
    button: {
      width: '40%',
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      borderWidth: 2,
      borderColor: '#fff', // Color del contorno del botón
    },
    buttonText3: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
});

export default Home;