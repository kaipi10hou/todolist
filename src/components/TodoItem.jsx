import './TodoItem.css'
import { memo, useContext } from 'react'
import { TodoDispatchContext} from "../App.jsx";

// function TodoItem({id, isDone, content, date, onUpdate, onDelete}) {
function TodoItem({id, isDone, content, date,}) {

    const { onUpdate, onDelete } = useContext(TodoDispatchContext)
    const onChangeCheckBox = () => {
        onUpdate(id)
    }

    const onClickDeleteButton = () => {
        onDelete(id)
    }

    return (
        <div className={'TodoItem'}>
            <input onChange={onChangeCheckBox} type="checkbox" checked={isDone} readOnly/>
            <div className={'content'}>{content}</div>
            <div className={'date'}>{new Date(date).toDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    )
}
/*
export default memo(TodoItem, (prevProps, nextProps) => {
    if (prevProps.id !== nextProps.id) return false
    if (prevProps.isDone !== nextProps.isDone) return false
    if (prevProps.content !== nextProps.content) return false
    if (prevProps.date !== nextProps.date) return false

    return true
})
*/
export default memo(TodoItem)