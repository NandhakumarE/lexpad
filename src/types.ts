import type { ReactNode } from "react";
import type { ColorResult } from "react-color";

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

export interface ColorPickerProps {
  label: string,
  baseIcon: ReactNode,
  color: string,
  onChange: (color: ColorResult) => void
}