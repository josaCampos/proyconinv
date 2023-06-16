import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GastoIngreso = ({ navigation }) => {
  const [gastoingreso, setGastoIngreso] = useState();

  const [totalMonto, setTotalMonto] = useState(0);
  const [totalIngreso, setTotalIngreso] = useState(0);

  const getGastoIngresoData = async () => {
    try {
      //const headers = { "Content-Type": "application/json" };
      let response = await fetch("http://192.168.137.1:3000/gasto-ingresos");
      let data = await response.json();
      setGastoIngreso(data);

      let total = data.reduce((accumulator, item) => {
        if (item.tipo === "Gasto") {
        let monto = parseFloat(item.monto.replace(/[^0-9.-]+/g, ""));
        return accumulator + monto;
      }
        return accumulator;
      }, 0);
      setTotalMonto(total);

      let totalIngreso = data.reduce((accumulator, item) => {
        if (item.tipo === "Ingreso") {
          let monto = parseFloat(item.monto.replace(/[^0-9.-]+/g, ""));
          return accumulator + monto;
        }
        return accumulator;
      }, 0);
      setTotalIngreso(totalIngreso);
    } catch (error) {
      Alert.alert("Aviso", "No es posible conectar.");
      console.error(error);
    }
  };

  useState(() => {
    getGastoIngresoData();
  }, []);

  const handleAgregarGastoIngreso = () => {
    Alert.alert("Aviso", "Vas a agregar un movimiento");
    navigation.navigate("GastoIngresoAdd");
  };

  const handleBorrar = (idGastoIngreso) => {
    var myHeaders = new Headers();

    // myHeaders.append(
    //   "Authorization",
    //   "Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263"
    // );

    myHeaders.append("Content-Type", "application/json");

    fetch("http://192.168.137.1:3000/gasto-ingresos/" + idGastoIngreso, {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: gastoingreso.concepto,
        cultivo: gastoingreso.monto,
        variedad: gastoingreso.tipo,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push("GastoIngreso");
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleVer = (gastoIngreso) => {
    console.log("Invernadero seleccionado:", gastoIngreso);
    navigation.navigate("GastoIngresoDetail", { gastoIngreso });
  };

  const handleEditar = (gastoIngreso) => {
    console.log("Gasto/Beneficio seleccionado:", gastoIngreso);
    navigation.navigate("GastoIngresoEditar", { gastoIngreso });
  };

  const renderGastoIngreso = ({ item }) => (
    <View style={styles.gastoIngresoContainer}>
      <View style={styles.gastoIngresoInfoContainer}>
        <Text style={styles.gastoIngresoId}>ID: {item.idGastoIngreso}</Text>
        <Text style={styles.gastoIngresoNombre}>{item.concepto}</Text>
        <Text style={styles.gastoIngresoDescripcion}>Monto: {item.monto}</Text>
        <Text style={styles.gastoIngresoDescripcion}>Tipo: {item.tipo}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleBorrar(item.idGastoIngreso)}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleVer(item)}
        >
          <Ionicons name="eye-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleEditar(item)}
        >
          <Ionicons name="create-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control Invernadero App</Text>
      <Text style={styles.titulonombre}>Gastos/Ingresos</Text>
      <View style={styles.imagenContainer}>
        {/* Aquí va la lógica para mostrar la imagen */}
        <Image
          source={require("../ilustraciones/imagen7.jpg")}
          style={styles.imagen}
        />

        <Text style={styles.gastoText}>Gasto:</Text>
        <Text style={styles.totalMonto}>
          $
          {totalMonto
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            .replace(".", ",")}
        </Text>

        <Text style={styles.ingresoText}>Ingreso:</Text>
        <Text style={styles.totalIngreso}>
          $
          {totalIngreso
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            .replace(".", ",")}
        </Text>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => handleAgregarGastoIngreso(navigation)}
        >
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={gastoingreso}
        renderItem={renderGastoIngreso}
        keyExtractor={(item) => item.idGastoIngreso.toString()}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titulonombre: {
    fontSize: 20,
    fontWeight: "normal",
    marginBottom: 10,
  },
  imagenContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  imagen: {
    width: 420,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    bottom: 2,
    right: 4,
    backgroundColor: "#0047ab",
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  listContainer: {
    width: "100%",
    marginTop: 20,
  },
  gastoIngresoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  gastoIngresoNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gastoIngresoDescripcion: {
    fontSize: 16,
    color: "black",
  },
  gastoText: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  iconButton: {
    marginLeft: 12,
  },
  gastoIngresoInfoContainer: {
    flex: 1, // Ocupa el espacio disponible para los elementos de información del gastoIngreso
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
  gastoIngresoDescripcion2: {
    fontSize: 30,
    marginTop: 4,
    fontWeight: "400",
  },
  totalMonto: {
    position: "absolute",
    top: 55,
    left: 20,
    fontSize: 50,
    fontWeight: "200",
    color: "white",
  },
  ingresoText: {
    position: 'absolute',
    top: 130,
    left: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  totalIngreso: {
    position: 'absolute',
    top: 167,
    left: 20,
    fontSize: 50,
    fontWeight: '200',
    color: 'white',
  },
});

export default GastoIngreso;
