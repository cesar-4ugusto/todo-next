import { useEffect, useState } from 'react';
import styles from '../../styles/tasklist.module.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('@Next-Todo:tasks');

    if (storage) {
      setTasks(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      '@Next-Todo:tasks',
      JSON.stringify(tasks),
    );
  }, [tasks]);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return
     
    const newTask: Task = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }
    setTasks(oldState => [...oldState,newTask]); //setState tbm pode ser usado com callback functions
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks);
  }

  return (
    <section className={`${styles.taskList} container`}>
      <header>
        <h2>Minhas Tasks</h2>

        <div className={styles.inputGroup}>
          <input 
            type="text" 
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>
      
      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? `${styles.completed}` : ''} data-testid="task">
                <label className={styles.checkboxContainer}>
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
              <FiTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}