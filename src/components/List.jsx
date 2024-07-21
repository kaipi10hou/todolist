import './List.css'
import TodoItem from "./TodoItem.jsx";
import {useState} from "react";

function List ({todos, onUpdate, onDelete}) {

    const [search, setSearch] = useState('')

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const getFilteredData = () => {
        if (search === '') return todos;
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()))
    }

    const filteredTodos = getFilteredData();

    return (
        <div className={'List'}>
            <h4>Todo List 🌱</h4>
            <input onChange={onChangeSearch} type="text" placeholder={`검색어를 입력하세요`}/>
            <div className={'TodosWrapper'}>
                {
                    filteredTodos.map(
                    (todo) => <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
                    )
                }
            </div>
        </div>
    )
}

export default List