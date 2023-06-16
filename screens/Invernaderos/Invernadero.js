import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const InvernaderoScreen = ({navigation}) => {

  const [invernadero, setInvernadero]=useState();

  

  const getInvernaderoData = async () => {
    try {
         //const headers = { "Content-Type": "application/json" };
      let response = await fetch("http://192.168.137.1:3000/invernaderos");
      let data = await response.json();
      setInvernadero(data);
    } catch (error) {
      Alert.alert('Aviso', 'No es posible conectar.');
      console.error(error);
    }
  };

  useState(() => {
    getInvernaderoData();
  }, []);
  
  const handleAgregarInvernadero = () => {
    Alert.alert('Aviso', 'Vas a agregar un invernadero');
    navigation.navigate('InvernaderoAdd');
    
  };

  const handleBorrar = (invernaderoId) => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/invernaderos/" + invernaderoId, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: invernadero.nombre,
        cultivo: invernadero.cultivo,
        variedad: invernadero.variedad,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Invernadero");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
   
  };

  const handleVer = (invernadero) => {
    console.log('Invernadero seleccionado:', invernadero);
    navigation.navigate('InvernaderoDetail', { invernadero });
  };

  const handleEditar = (invernadero) => {
    console.log('Inverndero seleccionado:', invernadero);
    navigation.navigate('InvernaderoEditar', { invernadero });
  };

  const renderInvernadero = ({ item }) => (
    <View style={styles.invernaderoContainer}>
      <View style={styles.invernaderoInfoContainer}>
        <Text style={styles.invernaderoId}>ID: {item.idInvernadero}</Text>
        <Text style={styles.invernaderoNombre}>{item.nombre}</Text>
        <Text style={styles.invernaderoDescripcion}>Cultivo: {item.cultivo}</Text>
        <Text style={styles.invernaderoDescripcion}>Variedad: {item.variedad}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleBorrar(item.idInvernadero)}>
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
      <Text style={styles.titulonombre}>¡Hola!</Text>
      <View style={styles.imagenContainer}>
        {/* Aquí va la lógica para mostrar la imagen */}
        <Image source={require('../ilustraciones/imagen5.jpg')} style={styles.imagen} />
        <TouchableOpacity style={styles.fab} onPress={() => handleAgregarInvernadero(navigation)}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={invernadero}
        renderItem={renderInvernadero}
        keyExtractor={(item) => item.idInvernadero.toString()}
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
    width: 420,
    height: 300,
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
  invernaderoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  invernaderoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  invernaderoDescripcion: {
    fontSize: 16,
    color: 'black',
  },
  iconButton: {
    marginLeft: 12,
  },
  invernaderoInfoContainer: {
    flex: 1, // Ocupa el espacio disponible para los elementos de información del invernadero
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  invernaderoDescripcion2: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '400',
  },
});

export default InvernaderoScreen;
