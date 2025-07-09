import {  useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

import IconButton from "../components/IconButton";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";

type ActionType = 'increment' | 'decrement' | 'exact';
type Size = number | undefined;

const DEFAULT_MAX_VALUE = 72;
const DEFAULT_INITIAL_VALUE = 12;


const FontSize = () => {
  const [inputSize, setInputSize] = useState<Size>(DEFAULT_INITIAL_VALUE);
  const [appliedSize, setAppliedSize] = useState<Size>(DEFAULT_INITIAL_VALUE);

  const { updateStyle } = useFormattedTextHelper({
    retrieveTrackedDataCallBack: (fontSizes: string[] = []) => {
      let size: Size = DEFAULT_INITIAL_VALUE;
      if(fontSizes.length > 1) size = undefined;
      else if(fontSizes[0] !== 'default') size = parseInt(fontSizes[0]);
     
      setInputSize(size);
      setAppliedSize(size);
    },
    getTrackingMetric: (style) => style.fontSize || DEFAULT_INITIAL_VALUE.toString(),
  });

  const handleInputChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setInputSize(+value);
    }
  };

  const applyFontSizeChange = (type: ActionType, value?: Size) => {
    let finalSize: Size = appliedSize ?? 0;

    switch (type) {
      case "increment":
        finalSize = finalSize + 1;
        break;
      case "decrement":
        finalSize = finalSize - 1;
        break;
      case "exact":
        finalSize = value || DEFAULT_INITIAL_VALUE;
        break;
    }

    if (finalSize < 1 || finalSize > DEFAULT_MAX_VALUE) {
      finalSize = DEFAULT_INITIAL_VALUE;
    }

    setAppliedSize(finalSize);
    setInputSize(finalSize);
    updateStyle({ fontSize: `${finalSize}px` });
  };

  return (
    <div className="flex items-center gap-1">
      <IconButton
        label="Decrease font size"
        disabled={appliedSize === undefined || appliedSize <= 1}
        onClick={() => applyFontSizeChange("decrement")}
      >
        <HiOutlineMinus size={12} />
      </IconButton>

      <span className="border-[1px] border-black py-[3px] px-3 rounded-sm text-sm flex items-center min-w-8">
        <input
          type="number"
          min={1}
          max={DEFAULT_MAX_VALUE}
          value={inputSize || ""}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={() => applyFontSizeChange("exact", inputSize)}
          className="w-full border-none text-center text-[12px] outline-none text-black font-semibold  "
        />
      </span>

      <IconButton
        label="Increase font size"
        disabled={appliedSize === undefined || appliedSize >= DEFAULT_MAX_VALUE}
        onClick={() => applyFontSizeChange("increment")}
      >
        <HiOutlinePlus size={12} />
      </IconButton>
    </div>
  );
};

export default FontSize;
