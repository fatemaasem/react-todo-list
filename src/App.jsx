import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    const newTask = task.trim()

    if (!newTask) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), text: newTask, completed: false },
    ])
    setTask('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === taskId
          ? { ...item, completed: !item.completed }
          : item,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== taskId),
    )
  }

  return (
    <main className="page">
      <section className="todo-card">
        <div className="heading">
          <span className="eyebrow">STAY ORGANIZED</span>
          <h1>My Tasks</h1>
          <p>Add what you need to get done today.</p>
        </div>

        <div className="task-form">
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Write a new task..."
            aria-label="New task"
          />
          <button type="button" onClick={addTask}>
            Add task
          </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Your task list is empty.</p>
          ) : (
            <ul>
              {tasks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`task-item${item.completed ? ' completed' : ''}`}
                    onClick={() => toggleTask(item.id)}
                    aria-pressed={item.completed}
                  >
                    <span className="task-dot" aria-hidden="true" />
                    <span className="task-text">{item.text}</span>
                  </button>
                  <button
                    type="button"
                    className="delete-task"
                    onClick={() => deleteTask(item.id)}
                    aria-label={`Delete ${item.text}`}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
