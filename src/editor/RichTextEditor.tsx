import { } from 'lexical';
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import Toolbar from '../toolbar/Toolbar';
import type { RichTextEditorProp } from "../types";
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TableRowNode } from '@lexical/table'
import EditorChangePlugin from '../plugins/EditorChangePlugin';
import { FormattedTextNode } from '../nodes/FormattedTextNode';
import './editor.css';
import { CustomTableNode, CustomTableCellNode } from '../nodes/Table';
import TableFloatingMenu from '../plugins/TableFloatingMenu';
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import LinkPopperPlugin from '../plugins/LinkPopperPlugin/LinkPopperPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

const RichTextEditor = (props: RichTextEditorProp) => {
   const { name, placeholder,  value, onChange } = props;
   
   const initialConfig: InitialConfigType = {
      namespace: name,
      onError: () => {},
      nodes: [FormattedTextNode, CustomTableNode, TableRowNode, CustomTableCellNode, LinkNode, ListNode, ListItemNode ]
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
            <div className='relative max-h-[450px] overflow-y-auto border-1 rounded-2xl border-gray-400 editor'>
               <RichTextPlugin
                 contentEditable={<ContentEditable className='outline-none min-h-[450px] h-fit p-4' spellCheck={false}/>}
                 placeholder={getPlaceholder()}
                 ErrorBoundary={LexicalErrorBoundary}
               />
            </div>
        </div>
        <AutoFocusPlugin/>
        <LinkPlugin/>
        <ListPlugin/>
        <TableFloatingMenu />
        <EditorChangePlugin value={value} onChange={onChange}/>
        <LinkPopperPlugin/>
    </LexicalComposer>
   )
}
export default RichTextEditor;