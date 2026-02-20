import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  title: string
  showBackButton?: boolean
  onBackClick?: () => void
  showSaveButton?: boolean
  onSaveClick?: () => void
  isSaveDisabled?: boolean
}

export const Header = ({
  title,
  showBackButton = false,
  onBackClick,
  showSaveButton = false,
  onSaveClick,
  isSaveDisabled = false,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 shadow-sm md:h-16">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-800 md:text-xl">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {showSaveButton && (
          <Button
            variant="link"
            onClick={onSaveClick}
            disabled={isSaveDisabled}
            className="font-semibold"
          >
            Salvar
          </Button>
        )}
      </div>
    </header>
  )
}
