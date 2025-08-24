import { useState } from "react";
import { CgColorBucket } from "react-icons/cg";
import type { ColorResult } from "react-color";

import ColorPicker from "../components/ColorPicker";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";

const DEFAULT_COLOR = "#000";

const BackgroundColor = () => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const { updateStyle } = useFormattedTextHelper({
    getTrackingMetric: (style) => (style.backgroundColor ? style.backgroundColor : DEFAULT_COLOR),
    retrieveTrackedDataCallBack: (list = []) => {
      const choosenColor = list.length === 1 ? list[0] : DEFAULT_COLOR;
      setColor((prev) => (choosenColor === prev ? prev : choosenColor));
    },
  });

  const onChange = (color: ColorResult) => {
    const { hex } = color;
    updateStyle({ backgroundColor: hex });
  };

  return (
    <ColorPicker
      id="background-color-plugin"
      label="Background color"
      baseIcon={<CgColorBucket color={color} data-testid="bg-color-icon" />}
      color={color}
      onChange={onChange}
    />
  );
};

export default BackgroundColor;
