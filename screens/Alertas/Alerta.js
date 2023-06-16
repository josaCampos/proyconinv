import React, { useState} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const AlertaScreen = ({navigation}) => {
  const [alerta,setAlerta]=useState();

  const getAlertaData = async () => {
    try {
         //const headers = { "Content-Type": "application/json" };
      let response = await fetch("http://192.168.137.1:3000/alertas");
      let data = await response.json();
      setAlerta(data);
    } catch (error) {
      Alert.alert('Aviso', 'No es posible conectar.');
      console.error(error);
    }
  };

  useState(() => {
    getAlertaData();
  }, []);

  const handleAgregarAlerta = () => {
    Alert.alert('Aviso', 'Vas a agregar una alerta');
    navigation.navigate('AlertaAdd');
    
  };

  const handleBorrar = (idAlerta) => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/alertas/" + idAlerta, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: alerta.nombre,
        descripcion: alerta.descripcion,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Alerta");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
   
  };

  const handleVer = (alerta) => {
    console.log('Alerta seleccionada:', alerta);
    navigation.navigate('AlertaDetail', { alerta });
  };

  const handleEditar = (alerta) => {
    console.log('Alerta seleccionada:', alerta);
    navigation.navigate('AlertaEditar', { alerta });
  };

  const renderAlerta = ({ item }) => (
    <View style={styles.alertaContainer}>
      <View style={styles.alertaInfoContainer}>
        <Text style={styles.alertaId}>ID: {item.idAlerta}</Text>
        <Text style={styles.alertaNombre}>Concepto: {item.nombre}</Text>
        <Text style={styles.alertaDescripcion1}>Descripción: {item.descripcion}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleBorrar(item.idAlerta)}>
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
      <Text style={styles.titulonombre}>Lista de alertas</Text>
      <View style={styles.imagenContainer}>
        {/* Aquí va la lógica para mostrar la imagen */}
        <Image source={require('../ilustraciones/imagen11.jpg')} style={styles.imagen} />
        <TouchableOpacity style={styles.fab} onPress={() => handleAgregarAlerta(navigation)}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={alerta}
        renderItem={renderAlerta}
        keyExtractor={(item) => item.idAlerta.toString()}
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
  alertaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  alertaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertaDescripcion: {
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
  alertaDescripcion1: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '400',
  },
});

export default AlertaScreen;
