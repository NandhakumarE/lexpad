import { useState } from "react";
import { CgFormatColor } from "react-icons/cg";
import type { ColorResult } from "react-color";

import ColorPicker from "../components/ColorPicker";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";

const DEFAULT_COLOR = "#000";

const FontColor = () => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const { updateStyle } = useFormattedTextHelper({
    getTrackingMetric: (style) => (style.color ? style.color : DEFAULT_COLOR),
    retrieveTrackedDataCallBack: (list = []) => {
      const choosenColor = list.length === 1 ? list[0] : DEFAULT_COLOR;
      setColor((prev) => (choosenColor === prev ? prev : choosenColor));
    },
  });

  const onChange = (color: ColorResult) => {
    const { hex } = color;
    updateStyle({ color: hex });
  };

  return (
    <ColorPicker
      label="Font color"
      baseIcon={<CgFormatColor color={color} data-testid="format-color-icon" />}
      color={color}
      onChange={onChange}
    />
  );
};

export default FontColor;
