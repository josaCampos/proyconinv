import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function GastoIngresoAdd({ navigation }) {
  const [gastoIngreso, setGastoIngreso] = useState({
    concepto: '',
    monto: '',
    tipo: '',
  });

  const [loading, setLoading] = useState(false);

  const onChangeConcepto = (value) => {
    setGastoIngreso({ ...gastoIngreso, concepto: value });
  };

  const onChangeMonto = (value) => {
    setGastoIngreso({ ...gastoIngreso, monto: value });
  };

  const onChangeTipo = (value) => {
    setGastoIngreso({ ...gastoIngreso, tipo: value });
  };

  const saveData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    console.log(gastoIngreso);

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/gasto-ingresos/", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        concepto: gastoIngreso.concepto,
        monto: gastoIngreso.monto,
        tipo: gastoIngreso.tipo,
      }),
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => {
        console.log("Result");
        navigation.push("GastoIngreso");
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
      <Text style={styles.title1}>Gasto/Ingreso</Text>

      <TextInput
        placeholder={"Concepto"}
        onChangeText={(value) => onChangeConcepto(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Monto"}
        onChangeText={(value) => onChangeMonto(value)}
        style={styles.input}
      />
      <View style={styles.pickerContainer}>
        <Text>Tipo:</Text>
        <TouchableOpacity
          onPress={() => onChangeTipo('Gasto')}
          style={[
            styles.pickerOption,
            gastoIngreso.tipo === 'Gasto' && styles.selectedPickerOption,
          ]}
        >
          <Text style={styles.pickerOptionText}>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeTipo('Ingreso')}
          style={[
            styles.pickerOption,
            gastoIngreso.tipo === 'Ingreso' && styles.selectedPickerOption,
          ]}
        >
          <Text style={styles.pickerOptionText}>Ingreso</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={saveData}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {loading ? "Cargando..." : "Guardar"}
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerOption: {
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bbb',
  },
  selectedPickerOption: {
    backgroundColor: '#4c669f',
    borderColor: '#4c669f',
  },
  pickerOptionText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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
});
