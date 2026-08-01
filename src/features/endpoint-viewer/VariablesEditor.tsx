import type { KeyValuePair } from '../../shared/types/endpoint'
import { useI18n } from '../../shared/i18n/i18nContext'

interface VariablesEditorProps {
  variables: KeyValuePair[]
  onChange: (variables: KeyValuePair[]) => void
}

export function VariablesEditor({ variables, onChange }: VariablesEditorProps) {
  const { tr } = useI18n()
  const update = (id: string, field: 'key' | 'value', value: string) =>
    onChange(variables.map((item) => item.id === id ? { ...item, [field]: value } : item))

  return (
    <div className="editor">
      {variables.map((variable) => (
        <div className="field-row" key={variable.id}>
          <input value={variable.key} onChange={(event) => update(variable.id, 'key', event.target.value)} placeholder={tr('Parâmetro')} />
          <input value={variable.value} onChange={(event) => update(variable.id, 'value', event.target.value)} placeholder={tr('Valor')} />
          <button className="remove-field" type="button" onClick={() => onChange(variables.filter((item) => item.id !== variable.id))}>×</button>
        </div>
      ))}
      <button className="add-field" type="button" onClick={() => onChange([...variables, { id: crypto.randomUUID(), key: '', value: '' }])}>+ {tr('Adicionar parâmetro')}</button>
    </div>
  )
}
