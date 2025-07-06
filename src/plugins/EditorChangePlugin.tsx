import {$insertNodes, type EditorState} from 'lexical';
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from 'lexical';
import { useEffect } from "react";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import type { EditorChangePluginProp } from '../types';

const EditorChangePlugin = (props: EditorChangePluginProp) => {
   const { value, onChange } = props;

   const [editor] = useLexicalComposerContext();

   useEffect(() => {
      editor.update(() => {
          const existingHtml = $generateHtmlFromNodes(editor);

          if(existingHtml !== value){
            $getRoot().clear();
            const parser = new DOMParser();
            const dom = parser.parseFromString(value, 'text/html');
            const nodes = $generateNodesFromDOM(editor, dom);
            $insertNodes(nodes)
          }
      })
   }, [value, editor])

   const onChangeHandler = (editorState: EditorState) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        onChange(html);
      }) 
   }

   return <OnChangePlugin onChange={onChangeHandler}/>

}
export default EditorChangePlugin;