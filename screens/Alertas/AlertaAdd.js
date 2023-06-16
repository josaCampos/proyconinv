import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';
import { Calendar } from 'react-native-calendars';

export default function AlertaAdd({ navigation }) {
  const [alerta, setAlerta] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
  });

  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangeNombre = (value) => {
    setAlerta({ ...alerta, nombre: value });
  };

  const onChangeDescripcion = (value) => {
    setAlerta({ ...alerta, descripcion: value });
  };

  const onChangeFecha = (day) => {
    setAlerta({ ...alerta, fecha: day.dateString });
    setShowCalendar(false);
  };

  const saveData = () => {
    setLoading(true);
  var myHeaders = new Headers();
  console.log(alerta);

  myHeaders.append("Content-Type", "application/json");

  const descripcion = alerta.fecha
    ? `${alerta.descripcion} - Fecha: ${alerta.fecha}`
    : alerta.descripcion;

  fetch("http://192.168.137.1:3000/alertas", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      nombre: alerta.nombre,
      descripcion: descripcion,
    }),
  })
    .then((response) => {
      setLoading(false);
      response.text();
    })
    .then((result) => {
      console.log("Result");
      navigation.push("Alerta");
      console.log(result);
    })
    .catch((error) => {
      console.log("Error");
      console.log(error);
    });
};

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Control Invernadero App</Text>
    <Text style={styles.title1}>Registro de alertas</Text>

    <TextInput
      placeholder={'Concepto'}
      onChangeText={(value) => onChangeNombre(value)}
      style={styles.input}
    />
    <TextInput
      placeholder={'Descripción'}
      onChangeText={(value) => onChangeDescripcion(value)}
      style={styles.input}
    />

    <TouchableOpacity onPress={() => setShowCalendar(true)}>
      <View style={styles.dateLabel}>
        <Text style={styles.dateLabelText}>
          {alerta.fecha ? alerta.fecha : 'Seleccionar fecha'}
        </Text>
      </View>
    </TouchableOpacity>

    <Modal
      visible={showCalendar}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}
    >
      <View style={styles.modalContainer}>
        <Calendar onDayPress={onChangeFecha} style={styles.calendar} />
      </View>
    </Modal>

    <TouchableOpacity onPress={saveData}>
      <View
        style={{
          backgroundColor: '#4c669f',
          padding: 15,
          borderRadius: 30,
          width: 200,
          height: 50,
          alignSelf: 'center',
          marginTop: 40,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {loading ? 'Cargando...' : 'Guardar'}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    },
    title1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      },
      input: {
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 10,
        height: 50,
        fontSize: 18,
        width: 350,
        backgroundColor: '#fff',
      },
      
    button: {
    backgroundColor: '#4c669f',
    borderRadius: 30,
    padding: 15,
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    },
    dateLabel: {
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 2,
      borderColor: '#bbb',
      borderRadius: 10,
      height: 50,
      fontSize: 18,
      width: 350,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  
    dateLabelText: {
      fontSize: 18,
      color: '#333',
    },
  
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  
    calendar: {
      backgroundColor: '#fff',
    },
    });