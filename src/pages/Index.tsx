import { useState } from 'react'
import { Plus, ClipboardList } from 'lucide-react'
import { useTasksSimpleId as useTasks } from '@/hooks/use-tasks'
import { useToast } from '@/hooks/use-toast'
import { TaskItem } from '@/components/TaskItem'
import { Button } from '@/components/ui/button'
import { AddTaskDialog } from '@/components/AddTaskDialog'
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog'
import { Task } from '@/types'
import { Header } from '@/components/Header'

const Index = () => {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks()
  const { toast } = useToast()
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
    addTask(task)
    toast({ title: 'Sucesso!', description: 'Tarefa adicionada com sucesso.' })
  }

  const handleDeleteRequest = (taskId: string) => {
    setTaskToDelete(taskId)
  }

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete)
      toast({ title: 'Sucesso!', description: 'Tarefa excluída.' })
      setTaskToDelete(null)
    }
  }

  const handleToggleTask = (taskId: string) => {
    toggleTask(taskId)
  }

  return (
    <>
      <Header title="Minhas Tarefas" />
      <div className="container mx-auto max-w-screen-md flex-grow p-4 md:p-6">
        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <img
              src="https://img.usecurling.com/p/400/400?q=checklist%20notebook&color=blue"
              alt="Ilustração de uma prancheta"
              className="mb-6 h-48 w-48"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Nenhuma tarefa adicionada ainda.
            </h2>
            <p className="mt-2 text-gray-500">
              Que tal começar com uma nova tarefa?
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Use o botão '+' para adicionar sua primeira tarefa.
            </p>
          </div>
        )}

        <Button
          onClick={() => setAddDialogOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Adicionar nova tarefa"
        >
          <Plus className="h-7 w-7" />
        </Button>

        <AddTaskDialog
          isOpen={isAddDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAddTask={handleAddTask}
        />

        <DeleteConfirmationDialog
          isOpen={!!taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  )
}

export default Index
