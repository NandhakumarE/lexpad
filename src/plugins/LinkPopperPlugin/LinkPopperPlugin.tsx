import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  type LexicalNode,
  type NodeKey,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { createPortal } from "react-dom";
import { $isLinkNode } from "@lexical/link";
import FloatingLinkEditor from "./LinkPopperContent";

const FloatingLinkEditorPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [linkKey, setLinkKey] = useState<NodeKey | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");

  const { x, y, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const handleClose = () => {
    setAnchorEl(null);
    setLinkKey(null);
    setLinkUrl("");
  };

  // Register update listener to detect link node
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
          editor.read(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            const anchorNode = selection.anchor.getNode();

            let currentNode: LexicalNode | null = anchorNode;
            while (currentNode !== null && !$isLinkNode(currentNode)) {
              currentNode = currentNode.getParent();
            }
            if ($isLinkNode(currentNode)) {
              const element = editor.getElementByKey(currentNode.getKey());
              if (element) {
                setAnchorEl(element as HTMLElement);
                setLinkKey(currentNode.getKey());
                setLinkUrl(currentNode.getURL() || "");
                refs.setReference(element as HTMLElement);
              }
            } else {
              handleClose();
            }
          });
        }, 400);
      });
    });
  }, []);

  // Cleanup on outside click or node change

  if (!anchorEl || !linkKey || !linkUrl) return null;

  const portalTarget =
    document.getElementById("link-popper-root") ?? document.body;

  return createPortal(
    <div
      ref={refs.setFloating}
      className="z-[999] bg-white px-2 border-1 gap-1 rounded-sm py-1 flex items-center shadow-2xl max-w-[300px]"
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      }}
    >
      <FloatingLinkEditor
        nodeKey={linkKey}
        url={linkUrl}
        onClose={handleClose}
      />
    </div>,
    portalTarget
  );
};

export default FloatingLinkEditorPlugin;
