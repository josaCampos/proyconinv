import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const UsuarioScreen = ({navigation}) => {
  const [usuario, setUsuario]=useState();

  const getUsuarioData = async () => {
    try {
         //const headers = { "Content-Type": "application/json" };
      let response = await fetch("http://192.168.137.1:3000/usuarios");
      let data = await response.json();
      setUsuario(data);
    } catch (error) {
      Alert.alert('Aviso', 'No es posible conectar.');
      console.error(error);
    }
  };

  useState(() => {
    getUsuarioData();
  }, []);

  const handleAgregarUsuario = () => {
    Alert.alert('Aviso', 'Vas a agregar un usuario');
    navigation.navigate('UsuarioAdd');
    
  };

  const handleBorrar = (idUsuario) => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/usuarios/" +idUsuario, {
      method: "DELETE",
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
        response.text();
        navigation.push("Usuario");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleVer = (usuario) => {
    console.log('Usuario seleccionado:', usuario);
    navigation.navigate('UsuarioDetail', { usuario });
  };

  const handleEditar = (usuario) => {
    console.log('Usuario seleccionado:', usuario);
    navigation.navigate('UsuarioEditar', { usuario });
  };

  const renderUsuario = ({ item }) => (
    <View style={styles.usuarioContainer}>
      <View style={styles.usuarioInfoContainer}>
        <Text style={styles.usuarioId}>ID: {item.idUsuario}</Text>
        <Text style={styles.usuarioNombre}>Nombre: {item.nombre}</Text>
        <Text style={styles.usuarioDescripcion}>Apellido paterno: {item.apellidoPaterno}</Text>
        <Text style={styles.usuarioDescripcion}>Apellido materno: {item.apellildoMaterno}</Text>
        <Text style={styles.usuarioDescripcion}>Teléfono: {item.telefono}</Text>
        <Text style={styles.usuarioDescripcion}>Correo: {item.correo}</Text>
        <Text style={styles.usuarioDescripcion}>Contraseña: {item.contrasena}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleBorrar(item.idUsuario)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleVer(item)}>
          <Ionicons name="eye-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleEditar(item)}>
    <Ionicons name="create-outline" size={24} color="green" />
  </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control Invernadero App</Text>
      <Text style={styles.titulonombre}>Lista de usuarios</Text>
      <View style={styles.imagenContainer}>
        {/* Aquí va la lógica para mostrar la imagen */}
        <Image source={require('../ilustraciones/imagen10.jpg')} style={styles.imagen} />
        <TouchableOpacity style={styles.fab} onPress={() => handleAgregarUsuario(navigation)}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={usuario}
        renderItem={renderUsuario}
        keyExtractor={(item) => item.idUsuario.toString()}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titulonombre: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  imagenContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagen: {
    width: 400,
    height: 320,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    backgroundColor: '#0047ab',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  listContainer: {
    width: '100%',
    marginTop: 20,
  },
  usuarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  usuarioNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usuarioDescripcion: {
    fontSize: 16,
    color: 'black',
  },
  iconButton: {
    marginLeft: 12,
  },
  usurarioInfoContainer: {
    flex: 1, // Ocupa el espacio disponible para los elementos de información del invernadero
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  usuarioDescripcion2: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '400',
  },
});

export default UsuarioScreen;
