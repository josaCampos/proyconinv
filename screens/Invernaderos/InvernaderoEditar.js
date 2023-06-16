import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarInvernadero({ route, navigation }) {
  const invernadero = route.params.invernadero;

  const [nombre, setNombre] = useState(invernadero.nombre);
  const [cultivo, setCultivo] = useState(invernadero.cultivo);
  const [variedad, setVariedad] = useState(invernadero.variedad);


  const handleEditarInvernadero = () => {
    Alert.alert('Aviso', 'Invernadero editado');
    console.log(invernadero);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/invernaderos/" + invernadero.idInvernadero, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: nombre,
        cultivo: cultivo,
        variedad: variedad,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Invernadero");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/imagen5.jpg')} style={styles.imagen} />
      <TouchableOpacity style={styles.fab} onPress={handleEditarInvernadero}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>Detalles del invernadero</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{invernadero.idInvernadero}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.valor} value={nombre} onChangeText={(value) => setNombre(value)} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Cultivo:</Text>
          <TextInput style={styles.valor} value={cultivo} onChangeText={(value) => setCultivo(value)} />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Variedad:</Text>
          <TextInput style={styles.valor} value={variedad} onChangeText={(value) => setVariedad(value)} />
        </View>
      </View>
      <View style={styles.separador} />
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Temperatura:</Text>
        <Text style={[styles.text, styles.data]}>35°C</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Humedad:</Text>
        <Text style={[styles.text, styles.data]}>50%</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Luminiscencia:</Text>
        <Text style={[styles.text, styles.data]}>50%</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Status:</Text>
        <Text style={[styles.text, styles.data]}>OK</Text>
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
    width: 398,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    alignContent:'center',
  },
  separador: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop:1,
},
});
