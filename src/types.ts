import type { ReactNode } from "react";
import type { ColorResult } from "react-color";

type RichTextValue = string;

export type StringObject = Record<string, string>;

export interface EditorChangePluginProp {
  debounce?: number,
  value: RichTextValue, 
  onChange: (value: RichTextValue) => void,
}

export interface RichTextEditorProp{
  name: string,
  value: RichTextValue , 
  placeholder?: string,
  autoFocus?:boolean,
  readOnly?: boolean,
  debounce?: number,
  className?: string,
  toolbarClassName?: string,
  editorContainerClassName?: string,
  editorClassName?: string,
  plugins?: ReactNode[],
  error?: string,
  onChange: (value: RichTextValue) => void
}

export interface ColorPickerProps {
  id?: string,
  label: string,
  baseIcon: ReactNode,
  color: string,
  onChange: (color: ColorResult) => void
}