import { HiMiniScissors } from "react-icons/hi2";

const PageBreakComponent = () => {
  return (
    <div className="relative w-full my-2 h-6">
      <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-blue-700"></div>
      <div className="absolute left-2 top-[5px] bg-transparent px-1 z-0">
        <HiMiniScissors />
      </div>
      <div className="absolute top-[4px] border-1 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-700 z-0 border-gray-500 capitalize font-semibold">
        Page Break
      </div>
    </div>
  );
};

export default PageBreakComponent;
