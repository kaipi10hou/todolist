import './List.css'
import TodoItem from "./TodoItem.jsx";
import {useMemo, useState, useContext} from "react";
import {TodoStateContext} from "../App.jsx";

// function List ({todos, onUpdate, onDelete}) {
function List () {
    console.log(useContext(TodoStateContext))
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState('')

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const getFilteredData = () => {
        if (search === '') return todos;
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
    }

    const filteredTodos = getFilteredData();

    /*
    const analyzedData = () => {
        console.log('호출됨')
        const totalCount = todos.length
        const doneCount = todos.filter((todo) => todo.isDone).length
        const notDoneCount = totalCount - doneCount
        return {totalCount, doneCount, notDoneCount}
    }

    const {totalCount, doneCount, notDoneCount} = analyzedData()
    */

    const {totalCount, doneCount, notDoneCount} = useMemo(() => {
        console.log('호출됨')
        const totalCount = todos.length
        const doneCount = todos.filter((todo) => todo.isDone).length
        const notDoneCount = totalCount - doneCount
        return {totalCount, doneCount, notDoneCount}
    },[todos])

    return (
        <div className={'List'}>
            <h4>Todo List 🌱</h4>
            <div>
                <div>Total Count : {totalCount}</div>
                <div>Done Count : {doneCount}</div>
                <div>Not Done Count : {notDoneCount}</div>
            </div>
            <input onChange={onChangeSearch} type="text" placeholder={`검색어를 입력하세요`}/>
            <div className={'TodosWrapper'}>
                {
                    filteredTodos.map(
                    // (todo) => <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
                    (todo) => <TodoItem key={todo.id} {...todo} />
                    )
                }
            </div>
        </div>
    )
}

export default List