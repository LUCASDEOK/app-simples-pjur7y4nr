import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onDelete(task.id)
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle(task.id)
  }

  return (
    <Link to={`/tarefas/${task.id}`} className="block animate-fade-in-up">
      <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
        <div
          onClick={handleCheckboxClick}
          className="flex h-6 w-6 items-center justify-center"
        >
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            aria-label={`Marcar tarefa ${task.title} como ${task.completed ? 'não concluída' : 'concluída'}`}
          />
        </div>
        <span
          className={cn('flex-grow font-semibold text-gray-800', {
            'text-gray-500 line-through': task.completed,
          })}
        >
          {task.title}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteClick}
          aria-label={`Excluir tarefa ${task.title}`}
          className="h-8 w-8 text-gray-500 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Link>
  )
}
