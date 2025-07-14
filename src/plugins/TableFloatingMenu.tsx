import { SketchPicker, type ColorResult } from "react-color";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import { TABLE_COMMANDS_OPTIONS } from "../constants";
import useTableCellFloatController, {
  getColorKeyById,
  getColorLabelById,
} from "../hooks/useTableCellFloatController";

const TableFloatingMenu = () => {
  const {
    activeCell,
    colorState,
    setColorState,
    onColorSelect,
    onOptionClick,
  } = useTableCellFloatController();

  if (!activeCell) return null;

  const activeCellRect = activeCell.getBoundingClientRect();

  const style = {
    left: `${activeCellRect.right - 20}px`,
    top: `${activeCellRect.top + 16}px`,
  };

  const getColorPicker = () => {
    if (!colorState.isPickerOpen) return;

      const key = getColorKeyById(colorState.selectedKey);
      if (!key) return;

    const onPickColor = (color: ColorResult) => {
      setColorState((prev) => ({
        ...prev,
        [key]: color.hex,
      }));
    };
    const onClose = () => {
      setColorState((prev) => ({ ...prev, isPickerOpen: false }));
    };

    return (
      <Modal
        onClose={onClose}
        header={getColorLabelById(colorState.selectedKey)+" Configuration"}
        modalSize="small"
        footer={
          <div className="flex items-center justify-between py-3 text-[12px]">
            <button
              className="px-4 py-2 rounded-md bg-gray-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer"
              onClick={onColorSelect}
            >
              Save
            </button>
          </div>
        }
      >
        <div className="w-full flex items-center justify-center">
          <SketchPicker
            className="!w-[80%]"
            color={colorState?.[key]}
            onChange={onPickColor}
          />
        </div>
      </Modal>
    );
  };

  return (
    <>
      {getColorPicker()}
      <div style={style} className="absolute">
        <Dropdown
          className="w-[16px] h-[16px] flex justify-center items-center text-[12px] !p-0 m-0 cursor-pointer"
          options={TABLE_COMMANDS_OPTIONS}
          onSelect={onOptionClick}
          position="right"
          selectedValue=""
          orientation="vertical"
          type="value-only"
        />
      </div>
    </>
  );
};

export default TableFloatingMenu;
