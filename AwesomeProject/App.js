// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Heading from './components/Heading'
import Input from './components/TextInput'
import HighLightButton from './components/Button'
import TodoList from './components/TodoList';

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

let todoIndex = 0
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
    this.submitTodo = this.submitTodo.bind(this) //将方法绑定
    this.toggleComplete = this.toggleComplete.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  inputChange(inputValue){
    console.log('Input value:', inputValue)
    this.setState({inputValue})
  }

  deleteTodo(todoIndex){
    let {todos} = this.state
    todos = todos.filter((todo)=>todo.todoIndex !== todoIndex)
    this.setState({todos})
  }

  toggleComplete(todoIndex){
    let todos = this.state.todos
    todos.forEach((todo)=>{
      if(todo.todoIndex === todoIndex){
        todo.complete = !todo.complete
      }
    })
    this.setState({todos})
  }

  submitTodo(){
    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }

    const todo = {
      title : this.state.inputValue,
      todoIndex,   //常规数据类型，直接传即可
      complete:false
    }
    todoIndex++
    const todos = [...this.state.todos,todo]
    this.setState({todos,inputValue:''},()=>{
      // console.log('State:',this.state)
    })
  }

  componentDidMount(){
    var sumNum = this.getMinus(2,1)
    this.setState({
      sum:sumNum
    });
  }

  getMinus(a,b) {
    return a - b;
  }
  
  render(){
    const {inputValue, todos} = this.state
    return(
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
          <Heading />
          <Text>{this.state.sum}</Text>
          <Input inputValue={inputValue}
          inputChange={(text)=>this.inputChange(text)}>
          </Input>
          <TodoList todos={todos}></TodoList>
          <HighLightButton submitTodo={this.submitTodo}>

          </HighLightButton>
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
