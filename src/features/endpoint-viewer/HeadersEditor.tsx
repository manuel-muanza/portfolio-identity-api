import type { KeyValuePair } from '../../shared/types/endpoint'

interface HeadersEditorProps {
  headers: KeyValuePair[]
  onChange: (headers: KeyValuePair[]) => void
}

export function HeadersEditor({ headers, onChange }: HeadersEditorProps) {
  const update = (id: string, field: 'key' | 'value', value: string) =>
    onChange(headers.map((item) => item.id === id ? { ...item, [field]: value } : item))

  return (
    <div className="editor">
      {headers.map((header) => (
        <div className="field-row" key={header.id}>
          <input value={header.key} onChange={(event) => update(header.id, 'key', event.target.value)} placeholder="Header" />
          <input value={header.value} onChange={(event) => update(header.id, 'value', event.target.value)} placeholder="Valor" />
          <button className="remove-field" type="button" onClick={() => onChange(headers.filter((item) => item.id !== header.id))}>×</button>
        </div>
      ))}
      <button className="add-field" type="button" onClick={() => onChange([...headers, { id: crypto.randomUUID(), key: '', value: '' }])}>+ Adicionar header</button>
    </div>
  )
}
