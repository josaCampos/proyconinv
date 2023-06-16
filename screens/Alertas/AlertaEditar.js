import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarAlerta({ route, navigation }) {
  const alerta = route.params.alerta;

  const [nombre, setNombre] = useState(alerta.nombre);
  const [descripcion, setDescripcion] = useState(alerta.descripcion);


  const handleEditarAlerta = () => {
    Alert.alert('Aviso', 'Alerta editada');
    console.log(alerta);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/alertas/" + alerta.idAlerta, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: nombre,
        descripcion: descripcion,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Alerta");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/alerta.jpg')} style={styles.imagen} />
      <TouchableOpacity style={styles.fab} onPress={handleEditarAlerta}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>Detalles de la alerta</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{alerta.idAlerta}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Concepto:</Text>
          <TextInput style={styles.valor} value={nombre} onChangeText={(value) => setNombre(value)} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput style={styles.valor} value={descripcion} onChangeText={(value) => setDescripcion(value)} />
        </View>
      </View>
      <View style={styles.separador} />
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Status:</Text>
        <Text style={[styles.text, styles.data]}>Pendiente</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignContent:'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    alignContent:'center',
  },
  fab: {
    position: 'absolute',
    bottom: 400,
    right: 10,
    backgroundColor: '#0047ab',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  valor: {
    fontSize: 24,
    fontWeight: '200',
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  data: {
    fontSize: 26,
    fontWeight: '200',
  },
  imagen: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    alignContent:'center',
    alignSelf:'center',
  },
  separador: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop:1,
},
});
