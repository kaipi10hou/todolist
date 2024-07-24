import Header from "./components/Header.jsx";
import Editor from "./components/Editor.jsx";
import List from "./components/List.jsx";
import './App.css'
import {
    // useState,
    useReducer,
    useRef,
    useCallback,
    useContext,
    createContext, useMemo,
} from "react";

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

function reducer(state, action) {
    switch (action.type) {
        case "CREATE" :
            return [action.data, ...state];
        case "UPDATE" :
            return state.map((item) =>
                item.id === action.targetId
                    ? {...item, isDone: !item.isDone}
                    : item
            )
        case "DELETE" :
            return state.filter((item) => item.id !== action.targetId)
        default:
            return state
    }
}

export const TodoStateContext = createContext()
export const TodoDispatchContext = createContext()


function App() {
    // const [todos, setTodos] = useState(mockData)
    const [todos, dispatch] = useReducer(reducer, mockData)
    const refId = useRef(3)

    /*const onCreate = (content) => {
        const newTodo = {
            id: refId.current++,
            isDone: false,
            content: content,
            date: new Date().getTime(),
        }
        setTodos([newTodo, ...todos])
    }*/
    const onCreate = useCallback((content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: refId.current++,
                isDone: false,
                content: content,
                date: new Date().getTime(),
            },
        })
    }, [])

    /*const onUpdate = (targetId) => {
        setTodos(
            todos.map((todo) =>
                todo.id === targetId
                    ? {...todo, isDone: !todo.isDone}
                    : todo)
        )
    }*/

    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE",
            targetId: targetId,
        })
    }, [])

    /*const onDelete = (targetId) => {
        setTodos(
            todos.filter((todo) =>
                todo.id !== targetId
            )
        )
    }*/

    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId: targetId
        })
    }, [])

    /** 하나의 객체로 묶인 연산 결과 (객체 주소값) 을 메모이제이션 하여 고정함. */
    const memoizedDispatch = useMemo(() => {
        return {onCreate, onUpdate, onDelete}
    }, [])

    return (
        <div className={'App'}>
            <Header/>
            {/*<Editor onCreate={onCreate}/>*/}
            {/*<List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>*/}
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={memoizedDispatch}>
                    <Editor/>
                    <List/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    )
}

export default App