import './TodoItem.css'

function TodoItem({id, isDone, content, date, onUpdate, onDelete}) {
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

export default TodoItem