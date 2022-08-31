import React from 'react'
import { View , Text} from 'react-native'
import Todo from './Todo'
const TodoList = ({todos})=>{
    todos = todos.map((todo,i)=>{
        // todo是一个字典结构对象，key 为 todo
        return (
            <Todo key={todo.todoIndex} todo={todo}>
            </Todo>   
        )
    })

    return (
        <View>
            {todos}
        </View>
    )
}

export default TodoList