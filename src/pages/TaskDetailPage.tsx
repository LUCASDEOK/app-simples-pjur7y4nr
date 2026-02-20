import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTasksSimpleId as useTasks } from '@/hooks/use-tasks'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog'
import { Header } from '@/components/Header'

const taskDetailSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título da tarefa não pode ser vazio.' }),
  description: z.string().optional(),
  completed: z.boolean(),
})

type TaskDetailFormValues = z.infer<typeof taskDetailSchema>

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getTaskById, updateTask, deleteTask } = useTasks()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const task = getTaskById(id || '')

  const form = useForm<TaskDetailFormValues>({
    resolver: zodResolver(taskDetailSchema),
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
  })

  useEffect(() => {
    if (task) {
      form.reset(task)
    } else {
      // If task not found, redirect to home.
      navigate('/')
    }
  }, [task, form, navigate])

  const onSubmit = (data: TaskDetailFormValues) => {
    if (!task) return
    updateTask({ ...task, ...data })
    toast({ title: 'Sucesso!', description: 'Tarefa atualizada.' })
    navigate('/')
  }

  const handleDelete = () => {
    if (!task) return
    deleteTask(task.id)
    toast({ title: 'Sucesso!', description: 'Tarefa excluída.' })
    navigate('/')
  }

  if (!task) {
    return null // Or a loading/not found component
  }

  const handleSave = () => {
    form.handleSubmit(onSubmit)()
  }

  return (
    <>
      <Header
        title={task.title}
        showBackButton
        onBackClick={() => navigate('/')}
        showSaveButton
        onSaveClick={handleSave}
        isSaveDisabled={!form.formState.isDirty || !form.formState.isValid}
      />
      <div className="container mx-auto max-w-screen-md flex-grow p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Tarefa</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da Tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Tarefa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Adicione detalhes da tarefa (opcional)"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label>Tarefa Concluída</Label>
                  </div>
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
                className="w-full"
              >
                Excluir Tarefa
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
