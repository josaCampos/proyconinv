import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  MainStackNavigator,
  ContactStackNavigator,
  UsuarioStackNavigator,
  InvernaderoStackNavigator,
  GastoIngresoStackNavigator,
  AlertaStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "UsuariosTab") {
            iconName = focused ? "people-outline" : "people";
          } else if (route.name === "InvernaderosTab") {
            iconName = focused ? "leaf-outline" : "leaf";
          } else if (route.name === "GastoIngresosTab") {
            iconName = focused ? "cash-outline" : "cash";
          } else if (route.name === "AlertasTab") {
            iconName = focused ? "notifications-outline" : "notifications";
          } else if (route.name === "HomeTab") {
            iconName = focused ? "home-outline" : "home";
          } else if (route.name === "InfoTab") {
            iconName = focused ? "information-outline" : "information";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarStyle:{display: "none"},//en caso de no entrar borro
        }}
      />
      <Tab.Screen
        name="UsuariosTab"
        component={UsuarioStackNavigator}
        options={{
          tabBarLabel: "Usuarios",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="InvernaderosTab"
        component={InvernaderoStackNavigator}
        options={{
          tabBarLabel: "Invernaderos",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="GastoIngresosTab"
        component={GastoIngresoStackNavigator}
        options={{
          tabBarLabel: "Gasto/Ingreso",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AlertasTab"
        component={AlertaStackNavigator}
        options={{
          tabBarLabel: "Alertas",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="InfoTab"
        component={ContactStackNavigator}
        options={{
          tabBarLabel: "Info",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
