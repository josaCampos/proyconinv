import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PantallaDetalles({ route }) {
  const invernadero = route.params.invernadero;

  // Verifica si los datos del invernadero están llegando correctamente
  console.log('Datos del invernadero:', invernadero);

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/imagen6.jpg')} style={styles.imagen} />
      <Text style={styles.titulo}>Detalles del Invernadero</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{invernadero.idInvernadero}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{invernadero.nombre}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Cultivo:</Text>
          <Text style={styles.valor}>{invernadero.cultivo}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Variedad:</Text>
          <Text style={styles.valor}>{invernadero.variedad}</Text>
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
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop:1,
},
});
