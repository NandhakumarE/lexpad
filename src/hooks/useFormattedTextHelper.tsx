import { useEffect } from "react";
import type { StringObject } from "../types";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import {
  $createFormattedText,
  $isFormattedText,
  $parseStyleString,
  $stringifyStyleObject,
} from "../nodes/FormattedTextNode";

interface FormattedTextHelperProps {
  getTrackingMetric: (style: StringObject) => string;
  retrieveTrackedDataCallBack: (styles: string[]) => void;
}

const useFormattedTextHelper = (props: FormattedTextHelperProps) => {
  const { getTrackingMetric, retrieveTrackedDataCallBack } = props;

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const trackerSet = new Set<string>();

      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const selectedNodes = selection.getNodes();
          for (const node of selectedNodes) {
            if ($isFormattedText(node)) {
              const parsedStyle = $parseStyleString(node.getStyle());
              trackerSet.add(getTrackingMetric(parsedStyle));
            } else {
              trackerSet.add("default");
            }
            if (trackerSet.size > 1) break;
          }
        }
        if (typeof retrieveTrackedDataCallBack === "function") {
          retrieveTrackedDataCallBack(Array.from(trackerSet));
        }
      });
    });
  });

  const updateStyle = (style: StringObject) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const extractedNodes = selection.extract();
        for (const node of extractedNodes) {
          if ($isFormattedText(node)) {
            const parsedStyle = $parseStyleString(node.getStyle());
            const newStyle = { ...parsedStyle, ...style };
            const stringifiedStyle = $stringifyStyleObject(newStyle);
            node.setStyle(stringifiedStyle);
          } else {
            const stringifiedStyle = $stringifyStyleObject(style);
            const newNode = $createFormattedText(
              node.getTextContent(),
              stringifiedStyle
            );
            node.replace(newNode);
          }
        }
      }
    });
  };

  return { updateStyle }
};

export default useFormattedTextHelper;
