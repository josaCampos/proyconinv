import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//inverndaros stack files
import InvernaderoScreen from "../screens/Invernaderos/Invernadero";
import InvernaderoDetailScreen from "../screens/Invernaderos/InvernaderoDetail";
import InvernaderoAddScreen from "../screens/Invernaderos/InvernaderoAdd";
import InvernaderoEditarScreen from "../screens/Invernaderos/InvernaderoEditar";

//usuarios stack files
import UsuarioScreen from "../screens/Usuarios/Usuario";
import UsuarioDetailScreen from "../screens/Usuarios/UsuarioDetail";
import UsuarioAddScreen from "../screens/Usuarios/UsuarioAdd";
import UsuarioEditarScreen from "../screens/Usuarios/UsuarioEditar";

//gastoingreso stack files
import GastoIngresoScreen from "../screens/GastoIngresos/GastoIngreso";
import GastoIngresoDetailScreen from "../screens/GastoIngresos/GastoIngresoDetail";
import GastoIngresoAddScreen from "../screens/GastoIngresos/GastoIngresoAdd";
import GastoIngresoEditarScreen from "../screens/GastoIngresos/GastoIngresoEditar";

//alertas stack files
import AlertaScreen from "../screens/Alertas/Alerta";
import AlertaDetailScreen from "../screens/Alertas/AlertaDetail";
import AlertaAddScreen from "../screens/Alertas/AlertaAdd";
import AlertaEditarScreen from "../screens/Alertas/AlertaEditar";

import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contact";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#3A75C4",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{ headerTitle:'Inicio' }}/>
      <Stack.Screen name="About" component={About} options={{ headerTitle:'Registro' }} />
      <Stack.Screen name="InvernaderoStack" component={InvernaderoStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Info" component={Contact} />
      </Stack.Navigator>
    );
  }

  const InvernaderoStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Invernadero" component={InvernaderoScreen} options={{ headerTitle:'Invernaderos' }}/>
        <Stack.Screen name="InvernaderoDetail" component={InvernaderoDetailScreen} options={{ headerTitle:'Detalles' }}/>
        <Stack.Screen name="InvernaderoAdd" component={InvernaderoAddScreen} options={{ headerTitle:'Registro' }}/>
        <Stack.Screen name="InvernaderoEditar" component={InvernaderoEditarScreen} options={{ headerTitle:'Editar invernadero' }}/>
      </Stack.Navigator>
    );
  }

  const UsuarioStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Usuario" component={UsuarioScreen} options={{ headerTitle:'Usuarios' }}/>
        <Stack.Screen name="UsuarioDetail" component={UsuarioDetailScreen} options={{ headerTitle:'Detalles' }}/>
        <Stack.Screen name="UsuarioAdd" component={UsuarioAddScreen} options={{ headerTitle:'Registro' }}/>
        <Stack.Screen name="UsuarioEditar" component={UsuarioEditarScreen} options={{ headerTitle:'Editar usuario' }}/>
      </Stack.Navigator>
    );
  }

  const GastoIngresoStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="GastoIngreso" component={GastoIngresoScreen} options={{ headerTitle:'Gastos/Ingresos' }}/>
        <Stack.Screen name="GastoIngresoDetail" component={GastoIngresoDetailScreen} options={{ headerTitle:'Detalles' }}/>
        <Stack.Screen name="GastoIngresoAdd" component={GastoIngresoAddScreen} options={{ headerTitle:'Registro' }}/>
        <Stack.Screen name="GastoIngresoEditar" component={GastoIngresoEditarScreen} options={{ headerTitle:'Editar Gasto/Ingreso' }}/>
      </Stack.Navigator>
    );
  }

  const AlertaStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Alerta" component={AlertaScreen}options={{ headerTitle:'Alertas' }}/>
        <Stack.Screen name="AlertaDetail" component={AlertaDetailScreen} options={{ headerTitle:'Detalles' }}/>
        <Stack.Screen name="AlertaAdd" component={AlertaAddScreen} options={{ headerTitle:'Registro' }}/>
        <Stack.Screen name="AlertaEditar" component={AlertaEditarScreen} options={{ headerTitle:'Editar Alerta' }}/>
      </Stack.Navigator>
    );
  }

  export { MainStackNavigator, ContactStackNavigator, InvernaderoStackNavigator, UsuarioStackNavigator, GastoIngresoStackNavigator, AlertaStackNavigator };