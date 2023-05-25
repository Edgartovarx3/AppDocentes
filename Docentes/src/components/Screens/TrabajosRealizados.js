import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity,Button } from 'react-native';
import * as yup from 'yup';


const schema = yup.object().shape({
  title: yup.string().required('Este campo es requerido'),
  description: yup.string().required('Este campo es requerido'),
});

export default function JobForm({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSave = () => {
    schema
      .validate({ title, description }, { abortEarly: false })
      .then(() => {
        setErrors(null);
        console.log('Título:', title);
        console.log('Descripción:', description);
        // Aquí se podría enviar los datos del formulario a un servidor o guardarlos en un almacenamiento local
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleVisualize = () => {
    navigation.navigate(
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Visualizacion Trabajos')}></TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View >
        
      </View>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, errors?.title && styles.inputError]}
      />
      {errors?.title && <Text style={styles.error}>{errors.title}</Text>}
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multilineInput, errors?.description && styles.inputError]}
        multiline={true}
        numberOfLines={4}
      />
      {errors?.description && <Text style={styles.error}>{errors.description}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVisualize}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(' Visualizacion Trabajos')}>
  <Text style={styles.buttonText}>Ver los trabajos</Text>
</TouchableOpacity>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleBar: {
    backgroundColor: '#2196F3',
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  job: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  }
});
;