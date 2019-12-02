
import React, {Component} from 'react';
import {TextInput,DeviceEventEmitter,StyleSheet, Text, View,Button,ActivityIndicator,Image,ImageBackground} from 'react-native';
import Sockets from 'react-native-sockets';
import dia from './src/Dia.png';
import noite from './src/Noite.png';


export default class App extends Component{

  constructor(props){
    super(props);
    this.socket2;
    this.state = {
      messages: [],
      client:[],//
      status: 'stopped',
      clients: 0,
      error: '',
      mostra:'inicio', 
      loading:false,
      ip:"192.168.0.100"
      }
      this.config={
        address: "192.168.0.100", //ip address of server
        port: 700, //port of socket server
     //   timeout: 5000, // OPTIONAL (default 60000ms): timeout for response
        reconnect:true, //OPTIONAL (default false): auto-reconnect on lost server
   //   reconnectDelay:500, //OPTIONAL (default 500ms): how often to try to auto-reconnect
       // maxReconnectAttempts:10, //OPTIONAL (default infinity): how many time to attemp to auto-reconnect
       
    }

    // this.socket = io.connect('http://192.168.2.250:700',{json:false});
   

    // this.socket.on('connect',function(){
    //   console.log('connect');
    //  })
    // this.socket.on('event',function(data){
    //  console.log(data);
    // })
    // this.socket.on('disconnect',function(){
    //   console.log('disconnect');
    //  })
    

      DeviceEventEmitter.addListener('socketClient_connected', () => {
    
        console.log('socketClient_connected');
        //this.messages();
        Sockets.write("#Alan");


        this.setState({loading:true});
      });
      //on timeout
      DeviceEventEmitter.addListener('socketClient_timeout', (data) =>  {
        console.log('socketClient_timeout',data.error);

        // this.setState({loading:false});
      });
      //on error
      DeviceEventEmitter.addListener('socketClient_error', (data) => {
        
        console.log('socketClient_error',data.error);


        Sockets.disconnect();
        this.setState({"mostra":'Inicio',"loading":false})   
       
      });
      //on new message
      DeviceEventEmitter.addListener('socketClient_data', (payload) => {
       var comando= payload.data;
        console.log('socketClient_data message:', comando);
        this.setState({"mostra":'carregando'})
        
//       var handle = setTimeout(() => {this.setState({"mostra":'carregando'})}, 4000);
       //
        if (comando ==="Inicio"){

             this.setState({"mostra":'Inicio'})   
        }
        else
        if (comando ==="Teste"){
          this.setState({"mostra":'Teste'})   
        }  
        if (comando ==="1"){
          setTimeout(() => {this.setState({"mostra":'dia'})}   , 500);
//          this.setState({"mostra":'dia'})   
        }
        if (comando ==="2"){
          setTimeout(() => {this.setState({"mostra":'noite'})  }   , 500);
          //this.setState({"mostra":'noite'})   
        } 
        if (comando ==="3"){
          setTimeout(() => {this.setState({"mostra":'notnoite'})    }   , 500);
         // this.setState({"mostra":'notnoite'})   
        }
        if (comando ==="4"){
          setTimeout(() => {this.setState({"mostra":'notdia'})    }   , 500);
         // this.setState({"mostra":'notdia'})   
        }
        if(comando =='5'){
                   this.setState({"mostra":'final'})   
        }
        if(comando =='10'){
          this.setState({"mostra":'Inicio',"loading":true}) 
        }
        if(comando =='11'){
          this.setState({"mostra":'carregando'}) 
        }
        //clearTimeout(handle);   
      
      });

      //on client closed
      DeviceEventEmitter.addListener('socketClient_closed', (data) => {
        console.log('socketClient_closed',data.error);
        this.setState({"mostra":'Inicio',"loading":false})   
      });

  }


  getList(){
    Sockets.getIpAddress(ipList => {
      console.log('Ip address list', ipList);  
    }, err => {
      console.log('getIpAddress_error', err);
    })
  }


  renderMessages(){
   
  }
  onChangeText(ip){
    this.config.address= ip;
    this.setState({ip:ip});
  }

  messages(){


    Sockets.write("cliente:comando\n");

  }
  disconnect(){
    Sockets.disconnect();
  }
  connect(){
    Sockets.startClient(this.config);
   
   // Sockets.write('alan');
  //  setTimeout(function(){ Sockets.write('');}, 1000);
  }
  render() {
    
    if(this.state.mostra === 'carregando'){
      return(
        <ImageBackground
        style={styles.container1}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    else
    if(this.state.mostra === 'final'){
      return(
        <ImageBackground  source={require("./src/smile.png")}
        style={styles.container}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    else
    if(this.state.mostra === 'dia'){
      return(
        <ImageBackground  source={require("./src/Dia.png")}
        style={styles.container1}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    else
    if(this.state.mostra === 'noite'){
      return(
        <ImageBackground  source={require("./src/Noite.png")}
        style={styles.container1}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    else
    if(this.state.mostra === 'notnoite'){
      return(
        <ImageBackground  source={require("./src/Dia.png")}
        style={styles.containerComborder}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    else
    if(this.state.mostra === 'notdia'){
      return(
        <ImageBackground  source={require("./src/Noite.png")}
        style={styles.containerComborder}
        />
        // <View style={styles.container}>
          
        //  <Image style={{ margin:"10px"} }/>
     // </View>)
      ) 
    }
    // if(this.state.mostradia){
    //   return(
     
    //      <View style={styles.container1}>
          
    //       <Image  source={require("./src/Dia.png")}></Image>
    //   </View>
    //   ) 
    // }


    else if(this.state.loading){
      return (

        <ImageBackground  source={require("./src/placaaguarde2.png")}
        style={styles.container1}
        >
       
        
          <Text style={styles.instructions}>Aguardando Orientador:</Text> 
        {/* <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <Button
          title="Enviar"
          color="green"
          onPress={() => this.messages()}
          ></Button> */}

      </ImageBackground>
      )
    }
    else
    return (
      <ImageBackground  source={require("./src/placaaguarde2.png")}
       style={styles.container}>
        <Text style={styles.instructions}>Ip ou Nome do Computador</Text>
        <TextInput
          textAlign={'center'}
          style={{fontSize:30,color : 'white' }}
          
          placeholder="Digite ip ou nome do Computador"
          onChangeText={(ip) => this.onChangeText(ip)}
          value={this.state.ip}
        />
        {/* <Text style={styles.welcome}>Websockets server</Text> */}
        {/* <Text style={styles.instructions}>Server status: {this.state.status}</Text> */}
       
        {/* { this.renderMessages() } */}
        {/* <Text style={styles.instructions}>{this.state.error}</Text> */}
        
        <Button
          title="Connect"
          color="#04B486"
          onPress={() => this.connect()}
          ></Button>
        {/* <Button
          title="Enviar"
          color="green"
          onPress={() => this.messages()}
          ></Button>
        <Button
          title="Disconnect"
          color="red"
          onPress={() => this.disconnect()}
          ></Button> */}
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
        backgroundColor: '#088A4B',
    // backgroundColor: '#F5FCFF',
    margin: 100,
    marginBottom:100,
    borderRadius:50,
  
  
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 5,
  },
  messages:{
    flexDirection: 'column',
  },
  msg: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  msgTitle: {
    marginVertical: 15,
  },
  containerComborder: {
    borderColor:"red",
    borderWidth:30,
    backgroundColor:"grey",
    
    alignItems: 'center',
    flex: 1,
   margin:30
  },
  container1: {

    backgroundColor:"grey",
    alignItems: 'center',
    flex: 1,
   margin:30
  },
  
  
});

