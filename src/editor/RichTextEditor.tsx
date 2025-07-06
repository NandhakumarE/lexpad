import { } from 'lexical';
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import Toolbar from '../toolbar/Toolbar';
import type { RichTextEditorProp } from "../types";
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import EditorChangePlugin from '../plugins/EditorChangePlugin';
import { FormattedTextNode } from '../nodes/FormattedTextNode';
import './editor.css';

const RichTextEditor = (props: RichTextEditorProp) => {
   const { name, placeholder,  value, onChange } = props;
   
   const initialConfig: InitialConfigType = {
      namespace: name,
      onError: () => {},
      nodes: [FormattedTextNode]
   }

   const getPlaceholder = () => {
      if(placeholder && placeholder.trim()){
        return <div className='text-gray-400 absolute top-4 left-4'>{placeholder}</div>
      }

      return null;
   }

   return (
    <LexicalComposer initialConfig={initialConfig}>
        <div className='m-4 flex flex-col gap-2'>
            <Toolbar/>
            <div className='relative max-h-[250px] overflow-y-auto border-1 rounded-2xl border-gray-400 editor'>
               <RichTextPlugin
                 contentEditable={<ContentEditable className='outline-none min-h-[150px] h-fit p-4' spellCheck={false}/>}
                 placeholder={getPlaceholder()}
                 ErrorBoundary={LexicalErrorBoundary}
               />
            </div>
        </div>
        <AutoFocusPlugin/>
        <EditorChangePlugin value={value} onChange={onChange}/>
    </LexicalComposer>
   )
}
export default RichTextEditor;