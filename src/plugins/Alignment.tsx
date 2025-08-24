import {
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineAlignCenter,
} from "react-icons/ai";
import type { DropdownOption } from "../components/Dropdown";
import { LuAlignJustify } from "react-icons/lu";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";

type AlignmentType = "left" | "center" | "right" | "justify";

const options: DropdownOption[] = [
  { label: "Left", value: "left", icon: <AiOutlineAlignLeft size={14} /> },
  { label: "Center", value: "center", icon: <AiOutlineAlignCenter size={14} /> },
  { label: "Right", value: "right", icon: <AiOutlineAlignRight size={14} /> },
  { label: "Justify", value: "justify", icon: <LuAlignJustify size={14} /> },
];

const isValidAlignmentType = (val: string): val is AlignmentType => {
  return options.some((option) => option.value === val);
};

const getValidAlignmentType = (format: string): AlignmentType => {
  return isValidAlignmentType(format) ? format : "left";
};

const Alignment = () => {
  const [alignment, setAlignment] = useState<AlignmentType>("left");

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (selection && $isRangeSelection(selection)) {
          const selectionNode = selection.getNodes()[0];
          const parent = selectionNode.getParent();
          const format = parent?.getFormatType() || "left";
          setAlignment(getValidAlignmentType(format));
        }
      });
    });
  }, [editor]);

  const onSelect = (value: string) => {
    const type = getValidAlignmentType(value);
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  };

  return (
    <Dropdown
      id="alignment-plugin"
      type="icon-only"
      orientation="horizontal"
      options={options}
      selectedValue={alignment}
      onSelect={onSelect}
    />
  );
};

export default Alignment;
