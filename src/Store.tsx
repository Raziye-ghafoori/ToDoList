import {configureStore , createSlice} from '@reduxjs/toolkit';


const todolist = createSlice({
    name:'ToDoList',
    initialState:{todos:[{id:1,text:'sample work',complated:false}]},
    reducers:{
        AddToDo:(state, action)=>{
            state.todos = [...state.todos,{id:Date.now(),text:action.payload.text , complated:false}]
        },
        ToggleToDo: (state,action)=>{
           state.todos = state.todos.map(todo=>
                todo.id == action.payload.id? {...todo,complated:!todo.complated}:todo
            )
        },
        RemoveToDo:(state,action)=>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload.id)
        },
        RemoveToDoALL:(state)=>{
            state.todos = state.todos.filter(todo=>todo.complated == false)
        }
    }
})

export const {AddToDo,ToggleToDo,RemoveToDo,RemoveToDoALL} = todolist.actions
export const store = configureStore({
    reducer:{
        ToDoList:todolist.reducer
    }
})