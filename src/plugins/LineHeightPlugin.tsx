import { useState } from "react";
import Dropdown from "../components/Dropdown";
import { DEFAULT_LINE_HEIGHT, DEFAULT_TEXT, LINE_HEIGHT_OPTIONS } from "../constants";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";
import { TbLineHeight } from "react-icons/tb";

const LineHeightPlugin = () => {
  const [alignment, setAlignment] = useState(DEFAULT_LINE_HEIGHT);
  const { updateStyle } = useFormattedTextHelper({
    getTrackingMetric: (style) => (style.lineHeight ? style.lineHeight : ""),
    retrieveTrackedDataCallBack: (list = []) => {
      const currentLineHeight = list.length === 1 ? list[0] : "";
      setAlignment(currentLineHeight === DEFAULT_TEXT ? DEFAULT_LINE_HEIGHT : currentLineHeight);
    },
  });

  const onSelect = (value: string) => {
    setAlignment(value);
    updateStyle({ lineHeight: value });
  };

  return (
    <Dropdown
      type="value-only"
      orientation="vertical"
      position="right"
      options={LINE_HEIGHT_OPTIONS}
      selectedValue={alignment}
      onSelect={onSelect}
      baseIcon={<TbLineHeight />}
    />
  );
};

export default LineHeightPlugin;
