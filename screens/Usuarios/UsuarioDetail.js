import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PantallaDetallesUsuario({ route }) {
  const usuario = route.params.usuario;

  // Verifica si los datos del invernadero están llegando correctamente
  console.log('Datos del usuario:', usuario);

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/imagen6.jpg')} style={styles.imagen} />
      <Text style={styles.titulo}>Detalles de usuario</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{usuario.idUsuario}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{usuario.nombre}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Apellido paterno:</Text>
          <Text style={styles.valor}>{usuario.apellidoPaterno}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Apellido materno:</Text>
          <Text style={styles.valor}>{usuario.apellildoMaterno}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{usuario.telefono}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.valor}>{usuario.correo}</Text>
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
