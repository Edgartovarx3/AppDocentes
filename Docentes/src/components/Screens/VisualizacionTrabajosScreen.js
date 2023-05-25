import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';



const VisualizacionTrabajosScreen = () => {
  // Datos de ejemplo para mostrar los trabajos
  const trabajos = [
    { titulo: 'Trabajo 1', descripcion: 'Descripción del trabajo 1' },
    { titulo: 'Trabajo 2', descripcion: 'Descripción del trabajo 2' },
    { titulo: 'Trabajo 3', descripcion: 'Descripción del trabajo 3' },
  ];

  // Renderizar cada trabajo como una tarjeta
  const renderTrabajos = () => {
    return trabajos.map((trabajo, index) => (
      <View key={index} style={styles.tarjeta}>
        <Text style={styles.titulo}>{trabajo.titulo}</Text>
        <Text style={styles.descripcion}>{trabajo.descripcion}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderTrabajos()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
  },
});

export default VisualizacionTrabajosScreen;
