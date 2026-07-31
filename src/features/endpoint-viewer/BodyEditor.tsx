interface BodyEditorProps {
  body: string
  onChange: (body: string) => void
}

export function BodyEditor({ body, onChange }: BodyEditorProps) {
  return (
    <div className="editor">
      <div className="input-label-row"><span>JSON</span><span>application/json</span></div>
      <textarea className="json-editor" value={body} onChange={(event) => onChange(event.target.value)} spellCheck={false} />
    </div>
  )
}
