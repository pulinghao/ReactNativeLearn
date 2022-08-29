// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Heading from './components/Heading'
import TextInput from './components/TextInput'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function getSum(a,b){
  return a+b;
}

const Stack = createNativeStackNavigator();

// 主程序入口
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      inputValue:'',
      todos:[],
      type:'All',
      sum:0,
    }
  }
  componentDidMount(){
    var sumNum = getSum(1,2);
    this.setState({
      sum:sumNum
    });
  }
  
  render(){
    return(
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
          <Heading />
          <Text>{this.state.sum}</Text>
        </ScrollView>
      </View>
    )
    
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //   <Stack.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       title: 'My home',
    //       headerStyle: {
    //         backgroundColor: '#f4511e',
    //       },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: {
    //         fontWeight: 'bold',
    //       },
    //       headerRight: () => (
    //         <Button
    //           onPress={() => alert('This is a button!')}
    //           title="Info"
    //           color="#fff"
    //         />
    //       ),
    //     }}
    //   />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  }
}

const styles = StyleSheet.create({
  header:{
    marginTop : 80
  },
  headText:{
    textAlign:'center',
    fontSize:72,
    color:'rgba(175,47,47,0.25)',
    fontWeight:'100'
  },
  container:{
    flex:1,
    backgroundColor:'#f5f5f5'
  },

  content:{
    flex:1,
    paddingTop:60
  }
})

export default App;
