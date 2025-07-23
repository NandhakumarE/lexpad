import { useEffect, useState } from "react";
import FlexContainer from "../components/FlexContainer";
import IconButton from "../components/IconButton";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $getSelection, $isRangeSelection } from "lexical";
import { $getNearestNodeOfType } from "@lexical/utils";

const LIST_TYPE = {
  Ordered: "ordered",
  Unordered: "unordered",
};

type ActionType = (typeof LIST_TYPE)[keyof typeof LIST_TYPE];

const ListPlugin = () => {
  const [selectedListType, setListType] = useState<ActionType | null>(null);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
       editorState.read(() => {
        const selection = $getSelection();
        if($isRangeSelection(selection)){
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          const elementKey = element.getKey();
          const elementDOM = editor.getElementByKey(elementKey);

          if (!elementDOM) return;

          if ($isListNode(element)) {
            const parentList = $getNearestNodeOfType(anchorNode, ListNode);
            const tag = parentList ? parentList.getTag() : element.getTag();
            let listType = null;
            if (tag === "ol") {
              listType = LIST_TYPE.Ordered;
            } else if (tag === "ul") {
              listType = LIST_TYPE.Unordered;
            }
            setListType((prev) => (prev !== listType ? listType : prev));
          }
        }
       })
    })
  });

  const handleClick = (action: ActionType) => {
    if (selectedListType === action) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setListType(null);
      return;
    } else {
      if (action === LIST_TYPE.Ordered) {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      } else if (action === LIST_TYPE.Unordered) {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }
    }
  };

  return (
    <FlexContainer>
      <IconButton
        id="ordered-list"
        label="Ordered List"
        active={selectedListType === LIST_TYPE.Ordered}
        onClick={() => handleClick(LIST_TYPE.Ordered)}
      >
        <AiOutlineOrderedList />
      </IconButton>
      <IconButton
        id="unordered-list"
        label="Unordered List"
        active={selectedListType === LIST_TYPE.Unordered}
        onClick={() => handleClick(LIST_TYPE.Unordered)}
      >
        <AiOutlineUnorderedList />
      </IconButton>
    </FlexContainer>
  );
};

export default ListPlugin;
