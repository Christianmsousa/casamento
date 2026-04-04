import { useState, useRef, ChangeEvent, DragEvent, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '../icons'
import { tv } from 'tailwind-variants'

const uploaderStyles = tv({
  base: 'group relative flex w-full h-24 cursor-pointer items-center rounded-lg border-2 transition-all duration-300 hover:border-brand-blue-500 hover:bg-white',
  variants: {
    state: {
      default:
        'justify-center border-dashed border-neutral-light-300 bg-neutral-light-50 text-center',
      dragging: 'justify-center border-dashed border-brand-blue-500 bg-white',
      uploaded: 'border-solid border-neutral-light-300 bg-white p-4',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

type ImageUploaderProps = {
  onFileSelect: (file: File | null) => void
  label?: string
  resolutionText?: string
  sizeText?: string
  value?: File | null
  progress?: number
  maxSize?: number // in bytes
}

export function ImageUploader({
  onFileSelect,
  label,
  resolutionText = 'Resolução recomendada 120 x 120px',
  sizeText = 'Tamanho máximo 500 kb',
  value,
  progress: externalProgress,
  maxSize,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const stopProgressAnimation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  useEffect(() => {
    if (value && !isAnimating) {
      setFile(value)
      setProgress(100)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(value)
    } else if (!value) {
      setFile(null)
      setPreview(null)
      setProgress(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [value, isAnimating])

  useEffect(() => {
    if (externalProgress !== undefined) {
      stopProgressAnimation()
      setProgress(externalProgress)
    }
    return () => stopProgressAnimation()
  }, [externalProgress])

  const handleNewFile = (newFile: File) => {
    if (maxSize && newFile.size > maxSize) {
      setError(`Arquivo excede o tamanho de ${formatFileSize(maxSize)}`)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setFile(null)
      setPreview(null)
      onFileSelect(null)
      return
    }

    onFileSelect(newFile)

    setError(null)
    setFile(newFile)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(newFile)

    stopProgressAnimation()
    setProgress(0)
    setIsAnimating(true)
    progressIntervalRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === null || oldProgress >= 100) {
          stopProgressAnimation()
          setIsAnimating(false)
          return 100
        }
        return Math.min(oldProgress + 20, 100)
      })
    }, 300)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleNewFile(selectedFile)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    setFile(null)
    setError(null)
    onFileSelect(null)
    stopProgressAnimation()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragEvents = (
    e: DragEvent<HTMLDivElement>,
    dragging: boolean,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragging) {
      setError(null)
    }
    setIsDragging(dragging)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      handleNewFile(droppedFile)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const uploaderState = isDragging
    ? 'dragging'
    : value || (preview && file)
      ? 'uploaded'
      : 'default'

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-neutral-dark-950">
          {label}
        </label>
      )}
      <div
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        onClick={() => {
          setError(null)
          fileInputRef.current?.click()
        }}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={uploaderStyles({ state: uploaderState })}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/gif"
          className="hidden"
        />

        {value || (preview && file) ? (
          <div className="flex w-full items-center gap-3">
            {preview ? (
              <Image
                src={preview}
                alt="Pré-visualização"
                width={56}
                height={56}
                className="h-14 w-14 flex-shrink-0 rounded-md object-cover"
              />
            ) : (
              <div className="h-14 w-14 flex-shrink-0 rounded-md bg-neutral-light-200" />
            )}
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <p className="break-all text-left text-sm font-medium text-neutral-dark-950">
                  {file?.name || value?.name}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage()
                  }}
                  className="flex-shrink-0 p-0 text-neutral-light-600 hover:text-red-600"
                >
                  <Icon.Close width="1rem" height="1rem" />
                </button>
              </div>
              <p className="text-left text-xs text-neutral-light-500">
                {formatFileSize(file?.size || value?.size || 0)}
              </p>
              {(progress !== null && progress < 100) ||
              (progress === 0 && file) ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full flex-grow rounded-full bg-neutral-light-200">
                    <div
                      className="h-2 rounded-full bg-brand-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-brand-blue-500">
                    {progress}%
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-4 text-neutral-light-600">
            <div className="rounded-lg bg-brand-blue-100 p-3">
              <Icon.Upload
                width="1.5rem"
                height="1.5rem"
                className="text-brand-blue-600"
              />
            </div>
            <p className="text-sm">
              Envie a sua foto de perfil{' '}
              <span className="font-semibold text-brand-blue-600">
                clicando aqui.
              </span>
            </p>
          </div>
        )}
      </div>
      {error ? (
        <p className="text-center text-xs text-red-600">{error}</p>
      ) : (
        <div className="flex justify-between text-xs text-neutral-light-500">
          <span>{resolutionText}</span>
          <span>{sizeText}</span>
        </div>
      )}
    </div>
  )
}
