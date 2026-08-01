import { useState } from 'react'
import { useI18n } from '../../shared/i18n/i18nContext'

interface ImageUploadEditorProps {
  onConfirm: (image: Blob, contentType: string) => void
}

export function ImageUploadEditor({ onConfirm }: ImageUploadEditorProps) {
  const { tr } = useI18n()
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  const [preparing, setPreparing] = useState(false)
  const [prepared, setPrepared] = useState(false)
  const [error, setError] = useState('')

  function selectFile(selectedFile: File | null) {
    setFile(selectedFile)
    setImageUrl('')
    setPrepared(false)
    setError('')
    if (!selectedFile) {
      setPreview('')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setPreview(String(reader.result))
    reader.readAsDataURL(selectedFile)
  }

  function updateImageUrl(value: string) {
    setImageUrl(value)
    setFile(null)
    setPreview(value)
    setPrepared(false)
    setError('')
  }

  async function prepareImage() {
    setPreparing(true)
    setError('')
    try {
      let image: Blob
      if (file) {
        image = file
      } else {
        const response = await fetch(imageUrl)
        if (!response.ok) throw new Error(`${tr('Não foi possível obter a imagem:')} HTTP ${response.status}`)
        image = await response.blob()
      }
      if (!image.type.startsWith('image/')) throw new Error(tr('O conteúdo selecionado não é uma imagem válida.'))
      onConfirm(image, image.type)
      setPrepared(true)
    } catch (caughtError) {
      setPrepared(false)
      setError(caughtError instanceof Error ? caughtError.message : tr('Não foi possível preparar a imagem.'))
    } finally {
      setPreparing(false)
    }
  }

  return (
    <div className="editor image-upload-editor">
      <div className="image-source-grid">
        <label className="image-file-picker">
          <input type="file" accept="image/*" onChange={(event) => selectFile(event.target.files?.[0] ?? null)} />
          <span className="image-picker-icon">＋</span>
          <strong>{tr('Selecionar imagem')}</strong>
          <small>{tr('PNG, JPEG, WEBP ou outro formato de imagem')}</small>
        </label>
        <div className="image-url-field">
          <label htmlFor="image-url">{tr('Ou utilize a URL de uma imagem')}</label>
          <input
            id="image-url"
            type="url"
            value={imageUrl}
            placeholder="https://exemplo.com/imagem.png"
            onChange={(event) => updateImageUrl(event.target.value)}
          />
        </div>
      </div>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt={tr('Preview da imagem selecionada')} onError={() => setError(tr('Não foi possível carregar o preview da imagem.'))} />
          <div>
            <strong>{file?.name ?? tr('Imagem externa')}</strong>
            <small>{file ? `${Math.round(file.size / 1024)} KB · ${file.type}` : imageUrl}</small>
          </div>
        </div>
      )}

      {error && <p className="image-upload-error">{error}</p>}

      <button
        className={`prepare-image-button ${prepared ? 'prepared' : ''}`}
        type="button"
        disabled={preparing || (!file && !imageUrl)}
        onClick={prepareImage}
      >
        {preparing ? tr('A preparar...') : prepared ? tr('✓ Imagem preparada') : tr('Confirmar imagem')}
      </button>
    </div>
  )
}
