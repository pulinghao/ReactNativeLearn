import React from 'react'
import { View , Text} from 'react-native'
import Todo from './Todo'
const TodoList = ({todos, deleteTodo, toggleComplete, type})=>{
    const getVisibleTodos = (todos, type) =>{
        switch(type){
            case 'All':
            return todos
            case 'Complete':
            return todos.filter((t) => t.complete)
            case 'Active':
            return todos.filter((t) => !t.complete)
        }
        // return todos
    }
    todos = getVisibleTodos(todos,type)
    todos = todos.map((todo,i)=>{
        // todo是一个字典结构对象，key 为 todo
        return (
            <Todo
                deleteTodo={deleteTodo}
                toggleComplete = {toggleComplete}
                key={i} 
                todo={todo}>
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