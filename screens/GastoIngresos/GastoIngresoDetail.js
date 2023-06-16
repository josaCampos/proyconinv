import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PantallaDetallesGastoIngreso({ route }) {
  const gastoIngreso = route.params.gastoIngreso;

  // Verifica si los datos del invernadero están llegando correctamente
  console.log('Datos del invernadero:', gastoIngreso);

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/imagen7.jpg')} style={styles.imagen} />
      <Text style={styles.titulo}>Detalles del movimiento</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{gastoIngreso.idGastoIngreso}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Concepto:</Text>
          <Text style={styles.valor}>{gastoIngreso.concepto}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Monto:</Text>
          <Text style={styles.valor}>{gastoIngreso.monto}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.valor}>{gastoIngreso.tipo}</Text>
        </View>
      </View>
      <View style={styles.separador} />
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Status:</Text>
        <Text style={[styles.text, styles.data]}>Aplicado</Text>
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
    marginBottom: 30,
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
    fontSize: 28,
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
    borderBottomWidth: 3,
    marginBottom: 35,
    marginTop:1,
},
});
