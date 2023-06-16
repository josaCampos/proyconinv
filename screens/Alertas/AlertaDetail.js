import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PantallaDetallesAlertas({ route }) {
  const alerta = route.params.alerta;

  // Verifica si los datos del invernadero están llegando correctamente
  console.log('Datos de la alerta:', alerta);

  return (
    <View style={styles.container}>
      <Image source={require('../ilustraciones/alerta.jpg')} style={styles.imagen} />
      <Text style={styles.titulo}>Detalles de la alerta</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.valor}>{alerta.idAlerta}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Concepto:</Text>
          <Text style={styles.valor}>{alerta.nombre}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={[styles.valor1, { textAlign: 'center' }]}>{alerta.descripcion}</Text>
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
    marginTop:20,
  },
  valor: {
    fontSize: 28,
    fontWeight: '200',
  },
  valor1: {
    fontSize: 18,
    fontWeight: '200',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
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
    marginBottom: 35,
    marginTop:35,
},
});
