import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarUsuario({ route, navigation }) {
  const usuario = route.params.usuario;

  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellidoPaterno, setApellidoPaterno] = useState(usuario.apellidoPaterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(usuario.apellildoMaterno);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [correo, setCorreo] = useState(usuario.correo);

  const handleEditarUsuario = () => {
    Alert.alert('Aviso', 'Usuario editado');
    console.log(usuario);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/usuarios/" + usuario.idUsuario, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellildoMaterno: apellidoMaterno,
        telefono: telefono,
        correo: correo,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("Usuario");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/imagen6.jpg')} style={styles.imagen} />
      <TouchableOpacity style={styles.fab} onPress={handleEditarUsuario}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>Detalles de usuario</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{usuario.idUsuario}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.valor} value={nombre} onChangeText={(value) => setNombre(value)} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Apellido paterno:</Text>
          <TextInput style={styles.valor} value={apellidoPaterno} onChangeText={(value) => setApellidoPaterno(value)} />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Apellido materno:</Text>
          <TextInput style={styles.valor} value={apellidoMaterno} onChangeText={(value) => setApellidoMaterno(value)} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Teléfono:</Text>
          <TextInput style={styles.valor} value={telefono} onChangeText={(value) => setTelefono(value)} />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Correo:</Text>
          <TextInput style={styles.valor} value={correo} onChangeText={(value) => setCorreo(value)} />
        </View>
      </View>
      <View style={styles.separador} />
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Status:</Text>
        <Text style={[styles.text, styles.data]}>Activo</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Tipo:</Text>
        <Text style={[styles.text, styles.data]}>Gerente</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Departamento:</Text>
        <Text style={[styles.text, styles.data]}>Mantenimiento</Text>
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
