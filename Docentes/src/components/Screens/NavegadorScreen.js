import {  View,ScrollView, Text,Image,Alert,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import React, { useState,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { handleAuthError, obtenerTrayectoria } from "../../Metodos";
import { Buffer } from 'buffer';



 function NavegadorScreen({ navigation }) {
 const imageUrl='https://i.pinimg.com/736x/3f/66/85/3f6685138ab5143add56e03925b4e5a1.jpg'
 const [MostrarTrayectoria, SetMostrarTrayectorias] = useState(false);
 const [MostrarPerfil, SetMostrarPerfil] = useState(false);
 const items = [];
 const route = useRoute();
 const { Datos } = route.params;
 const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
 const [trayectoria, setTrayectoria] = useState([]);


 useEffect(() => {
  if(Datos.usuario.tipoUsuario=='D'){
  obtenerDatos(); // Llama a la función por primera vez al cargar el componente
  const interval = setInterval(() => {
    obtenerDatos();
  }, 5000);
    // Limpia el intervalo cuando el componente se desmonta o cambia
    return () => clearInterval(interval);
  // Establece un intervalo para llamar a obtenerDatos cada 5 segundos
  
}else if(Datos.usuario.tipoUsuario=='A'){
  obtenerDatos();
}

}, []);

const obtenerDatos = async () => {
  try {
    const datos = await obtenerTrayectoria(credentials);
    setTrayectoria(datos);
  } catch (error) {
    
    // Maneja el error
   
  }
};





 useEffect(() => {
    // Llama a la función obtenerDatosActualizados cada 5 segundos (5000 ms)
    const interval = setInterval(renderItems, 5000);
  
    // Limpia el intervalo cuando el componente se desmonta o cambia
    return () => clearInterval(interval);
  }, []);
 
 const renderItems = () => {
    const 
    items = [];
        
   
      const docente = {
        nombre:Datos.usuario.nombreUsuario,
        apellidoPaterno:Datos.usuario.apellidoPaUsuario,
        apellidoMaterno: Datos.usuario.apellidoMaUsuario,
        correo: Datos.usuario.correoUsuario,
        tipoUsuario:Datos.usuario.tipoUsuario
      }; 
      
    
   
        if(MostrarTrayectoria && !MostrarPerfil){
          if(Datos.usuario.tipoUsuario=='A'){
            items.push(
              <>
              <Text>Un administrador no tiene trayectorias weon!</Text>
              
              </>
              
                
              );
            
          }
          try{
          for (let i = 0; i < trayectoria.opciones.length; i++) {
            items.push(
              <>
              <View style={styles.card}>
                <Text style={styles.title}>{trayectoria.opciones[i].tituloParticipacion}</Text>
                
                {trayectoria.opciones[i].idTrayectoria && (
                  <Button
                    title="Más"
                    onPress={() =>
                      navigation.navigate('Trayectoria', {
                        Datos: Datos,
                        idTrayectoria: trayectoria.opciones[i].idTrayectoria,
                      })
                    }
                  />
                )}
              </View>
            </>
            
              
            );
          }

         
        }catch(error){
          handleAuthError(error);
        }
        }
        else if(!MostrarTrayectoria&& MostrarPerfil){
            items.push(<>
            <Text style={styles.title}>Datos de perfil</Text>
           
            <Text style={styles.description}>{docente.nombre +' '+docente.apellidoPaterno+' '+docente.apellidoMaterno}</Text>
            <Text style={styles.description}>{docente.correo}</Text>
            <Text style={styles.description}>{docente.tipoUsuario==='D'?'Docente':docente.tipoUsuario==='A'?'Administrador':<></> }</Text>
          
            
            </>);

        };
        
    


    return items;
  };



  
  return (
    <View style={styles.transparente}>
     <View style={styles.container}>
          <View style={styles.foto}>
        <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
        </View>
        
        <View style={styles.mover}>
          <Button title={Datos.usuario.tipoUsuario==='D'?'Informacion Docente':Datos.usuario.tipoUsuario==='A'?'Informacion Administrador':<></> }
          onPress={() => { SetMostrarPerfil(true);
           if (MostrarTrayectoria) {
              SetMostrarTrayectorias(false);}}}
              titleStyle={styles.buttonText} 
              buttonStyle={styles.button} />
    
          <Button title="Trayectoria Profesional" 
          onPress={() => { SetMostrarTrayectorias(true);
           if (MostrarPerfil) {
              SetMostrarPerfil(false);}}} titleStyle={styles.buttonText} buttonStyle={styles.button}/>
    
          <Button title="Grados Academicos" onPress={() => navigation.navigate("Materia")} titleStyle={styles.buttonText}buttonStyle={styles.button} />
          <Button title="Trabajos Realizados" onPress={() => navigation.navigate("Trabajo Realizado")} titleStyle={styles.buttonText}buttonStyle={styles.button} />
          <Button title="Carga de documentos" onPress={() => navigation.navigate("Materia")} titleStyle={styles.buttonText} buttonStyle={styles.button}/>
         
        </View>
        
        <ScrollView style={styles.boxContainer}>
        {MostrarTrayectoria ?  renderItems() :<></>}
        {MostrarPerfil ?  renderItems() :<></>}
        
           
        </ScrollView>
        
       </View>
       <View style={styles.buttonContainer}>
       {Datos.usuario.tipoUsuario === 'D' && (
  <>
    {MostrarTrayectoria ? (
      <>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Eliminar Trayectoria", { Datos: Datos })}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Agregar Trayectoria", { Datos: Datos })}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    )}
  </>
)}

{MostrarPerfil && Datos.usuario.tipoUsuario === 'A' && (
  <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Editar Perfil")}>
    <Text style={styles.buttonText}>Editar</Text>
  </TouchableOpacity>
)}
        
      </View>
       
     </View>
   
  );
  
};
const styles ={
  mover:{
    top:30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
    title: {
      textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
      },
      description: {
        textAlign: 'justify',
        fontSize: 14,
        color: '#000000',
      },
    transparente: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo transparente con 50% de opacidad
      },
    foto: {
        top:-250,
        left:230,
        width: 140,
        height: 140,
        borderRadius: 80,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    container: {
        width: '160%',
        height: '160%',
      top:40,
      left:-150,
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
       boxContainer: {
        width: '60%',
        height: '52%',
        top: 10,
       left:-80,
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
      },
    button: {
        top: -10,
        width: '55%',
        marginTop: 10,
        backgroundColor: 'f0f1f4',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#b2b3b6',
      },
    buttonText: {
      color: '#333333',
    fontSize: 16,
    textAlign: 'center',
     
    },
    button1:{
         width: '30%',
        height: '15%',
        flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
      },
      separator: {
        backgroundColor: '#e8e8e8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        top:-10,
        marginVertical: 10,
        marginHorizontal: 10,
      },

  };

  export default NavegadorScreen