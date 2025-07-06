
type RichTextValue = string;

export type StringObject = Record<string, string>;

export interface EditorChangePluginProp {
  value: RichTextValue, 
  onChange: (value: RichTextValue) => void,
}

export interface RichTextEditorProp{
  name: string,
  value: RichTextValue , 
  placeholder?: string,
  onChange: (value: RichTextValue) => void
}