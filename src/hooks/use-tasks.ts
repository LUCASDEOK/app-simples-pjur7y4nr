import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '@/types'

const TASKS_STORAGE_KEY = 'minhas-tarefas'

const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Comprar pão e leite para o café da manhã',
    completed: false,
    description: 'Passar na padaria antes de ir para casa.',
  },
  {
    id: uuidv4(),
    title: 'Reunião de equipe às 10h',
    completed: false,
    description: 'Discutir o progresso do projeto Alpha.',
  },
  {
    id: uuidv4(),
    title: 'Pagar a conta de luz',
    completed: true,
    description: 'Vence amanhã.',
  },
  {
    id: uuidv4(),
    title: 'Levar o carro para a revisão',
    completed: false,
    description: 'Agendado para sexta-feira às 9h.',
  },
]

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY)
      if (storedTasks) {
        return JSON.parse(storedTasks)
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do localStorage', error)
    }
    // Return initial mock data if localStorage is empty
    return initialTasks
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage', error)
    }
  }, [tasks])

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    const newTask = { ...task, id: uuidv4(), completed: false }
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }, [])

  const getTaskById = useCallback(
    (taskId: string) => {
      return tasks.find((task) => task.id === taskId)
    },
    [tasks],
  )

  return { tasks, addTask, updateTask, deleteTask, toggleTask, getTaskById }
}

// Mocking uuid for tests if needed, but for browser it should be fine.
// Since `uuid` is not listed as a dependency, I will use a simple id generator.
const simpleId = () =>
  `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useTasksSimpleId = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY)
      const parsed = storedTasks ? JSON.parse(storedTasks) : []
      return parsed.length > 0
        ? parsed
        : [
            {
              id: simpleId(),
              title: 'Comprar pão e leite para o café da manhã',
              completed: false,
              description: 'Passar na padaria antes de ir para casa.',
            },
            {
              id: simpleId(),
              title: 'Reunião de equipe às 10h',
              completed: false,
              description: 'Discutir o progresso do projeto Alpha.',
            },
            {
              id: simpleId(),
              title: 'Pagar a conta de luz',
              completed: true,
              description: 'Vence amanhã.',
            },
            {
              id: simpleId(),
              title: 'Levar o carro para a revisão',
              completed: false,
              description: 'Agendado para sexta-feira às 9h.',
            },
          ]
    } catch (error) {
      console.error('Erro ao carregar tarefas do localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage', error)
    }
  }, [tasks])

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    const newTask = { ...task, id: simpleId(), completed: false }
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }, [])

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }, [])

  const getTaskById = useCallback(
    (taskId: string) => {
      return tasks.find((task) => task.id === taskId)
    },
    [tasks],
  )

  return { tasks, addTask, updateTask, deleteTask, toggleTask, getTaskById }
}
