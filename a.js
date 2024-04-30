import React, { useState, useRef } from "react";
import { v4 as uuid } from 'uuid';

function App() {
  const inputRef = useRef('');
  const [taskList, setTaskList] = useState([]);
  const [filterCondition, setFilterCondition] = useState('すべて');

  const clickAddHandler = () => {
    const newTaskList = [...taskList];
    newTaskList.push({ id: uuid(), comment: inputRef.current.value, condition: '作業中' });
    setTaskList(newTaskList);
    inputRef.current.value = '';
  }

  const clickConditionHandler = (e) => {
    setTaskList(taskList.map((task) => {
      if (task.id === e.target.value) {
        return { ...task, condition: task.condition === '作業中' ? '完了' : '作業中' };
      } else {
        return task;
      }

    }))
  }

  const clickDeleteHandler = (e) => {
    setTaskList(taskList.filter((task) => task.id !== e.target.value));
  }

  const changeConditionHandler = (e) => {
    setFilterCondition(e.target.value);
  }

  const getViewTask = () => {
    if (filterCondition === "すべて") {
      return taskList;
    } else {
      return taskList.filter((task) => task.condition === filterCondition);
    }
  }

  return (
    <>
      <div>
        <h1>Todoアプリ</h1>
      </div>
      <div>
        <div>
          <input type="radio" id="すべて" name="condition" value="すべて" onChange={changeConditionHandler} checked={filterCondition === "すべて"}></input>
          <label for="すべて">すべて</label>
          <input type="radio" id="作業中" name="condition" value="作業中" onChange={changeConditionHandler} checked={filterCondition === "作業中"}></input>
          <label for="作業中">作業中</label>
          <input type="radio" id="完了" name="condition" value="完了" onChange={changeConditionHandler} checked={filterCondition === "完了"}></input>
          <label for="完了">完了</label>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>コメント</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            {getViewTask().map((task, id) => (
              <tr key={task.id}>
                <td>{id}</td>
                <td>{task.comment}</td>
                <td><button value={task.id} onClick={clickConditionHandler}>{task.condition}</button></td>
                <td><button value={task.id} onClick={clickDeleteHandler}>削除</button></td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <input type="text" ref={inputRef}></input>
        <button onClick={clickAddHandler}>追加</button>
      </div>
    </>
  );
}

export default App;
