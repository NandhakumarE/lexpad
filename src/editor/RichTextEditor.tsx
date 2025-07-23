import {} from "lexical";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import Toolbar from "../toolbar/Toolbar";
import type { RichTextEditorProp } from "../types";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { TableRowNode } from "@lexical/table";
import EditorChangePlugin from "../plugins/EditorChangePlugin";
import { FormattedTextNode } from "../nodes/FormattedTextNode";
import "./editor.css";
import { CustomTableNode, CustomTableCellNode } from "../nodes/Table";
import TableFloatingMenu from "../plugins/TableFloatingMenu";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LinkPopperPlugin from "../plugins/LinkPopperPlugin/LinkPopperPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { PageBreakNode } from "../nodes/PageBreak/PageBreakNode";
import FlexContainer from "../components/FlexContainer";

const RichTextEditor = (props: RichTextEditorProp) => {
  const {
    name,
    placeholder,
    value,
    autoFocus,
    readOnly,
    debounce,
    className,
    toolbarClassName,
    editorContainerClassName,
    editorClassName,
    onChange,
  } = props;

  const initialConfig: InitialConfigType = {
    namespace: name,
    editable: !readOnly,
    onError: () => {},
    nodes: [
      FormattedTextNode,
      CustomTableNode,
      TableRowNode,
      CustomTableCellNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HorizontalRuleNode,
      PageBreakNode,
    ],
  };

  const getPlaceholder = () => {
    if (placeholder && placeholder.trim()) {
      return (
        <div className="text-gray-400 absolute top-4 left-4">{placeholder}</div>
      );
    }

    return null;
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`flex flex-col ${className}`}>
        {!readOnly && (
          <FlexContainer className={`p-2 ${toolbarClassName}`}>
            <Toolbar />
          </FlexContainer>
        )}
        <div
          className={`relative overflow-y-auto editor ${editorContainerClassName}`}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`outline-none h-fit px-4 py-2 ${editorClassName}`}
                spellCheck={false}
              />
            }
            placeholder={getPlaceholder()}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      {autoFocus && <AutoFocusPlugin />}
      <LinkPlugin />
      <ListPlugin />
      <HorizontalRulePlugin />
      {!readOnly && <TableFloatingMenu />}
      {!readOnly && <LinkPopperPlugin />}
      <EditorChangePlugin
        debounce={debounce}
        value={value}
        onChange={onChange}
      />
    </LexicalComposer>
  );
};
export default RichTextEditor;
