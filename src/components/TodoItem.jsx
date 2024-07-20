import './TodoItem.css'

function TodoItem({id, isDone, content, date, onUpdate}) {
    const onChangeCheckBox = () => {
        onUpdate(id)
    }

    return (
        <div className={'TodoItem'}>
            <input onChange={onChangeCheckBox} type="checkbox" checked={isDone} readOnly/>
            <div className={'content'}>{content}</div>
            <div className={'date'}>{new Date(date).toDateString()}</div>
            <button>삭제</button>
        </div>
    )
}

export default TodoItem