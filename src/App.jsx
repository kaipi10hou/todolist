import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import List from "./components/List.jsx";
import './App.css'
import {useRef, useState} from "react";

const mockData = [
    {
        id: 0,
        isDone: false,
        content: "React 공부하기",
        date: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: "빨래하기",
        date: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: "청소하기",
        date: new Date().getTime(),
    }

]
function App () {
    const [todos, setTodos] = useState(mockData)
    const refId = useRef(3)

    const onCreate = (content) => {
        const newTodo = {
            id: refId.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
        }
        setTodos([newTodo, ...todos])
    }

    const onUpdate = (targetId) => {
        setTodos(
            todos.map((todo) =>
            todo.id === targetId
                ? {...todo, isDone: !todo.isDone}
                : todo)
        )
    }

    const onDelete = (targetId) => {
        setTodos(
            todos.filter((todo) =>
                todo.id !== targetId
            )
        )
    }

    return (
        <div className={'App'}>
            <Header />
            <Editor onCreate={onCreate}/>
            <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
        </div>
    )
}

export default App