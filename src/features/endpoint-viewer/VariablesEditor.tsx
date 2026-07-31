import type { KeyValuePair } from '../../shared/types/endpoint'

interface VariablesEditorProps {
  variables: KeyValuePair[]
  onChange: (variables: KeyValuePair[]) => void
}

export function VariablesEditor({ variables, onChange }: VariablesEditorProps) {
  const update = (id: string, field: 'key' | 'value', value: string) =>
    onChange(variables.map((item) => item.id === id ? { ...item, [field]: value } : item))

  return (
    <div className="editor">
      {variables.map((variable) => (
        <div className="field-row" key={variable.id}>
          <input value={variable.key} onChange={(event) => update(variable.id, 'key', event.target.value)} placeholder="Parâmetro" />
          <input value={variable.value} onChange={(event) => update(variable.id, 'value', event.target.value)} placeholder="Valor" />
          <button className="remove-field" type="button" onClick={() => onChange(variables.filter((item) => item.id !== variable.id))}>×</button>
        </div>
      ))}
      <button className="add-field" type="button" onClick={() => onChange([...variables, { id: crypto.randomUUID(), key: '', value: '' }])}>+ Adicionar parâmetro</button>
    </div>
  )
}
