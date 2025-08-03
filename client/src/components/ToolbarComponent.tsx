import { FaLock, FaTrash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

interface ToolbarProps {
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
}

const ToolbarComponent = ({ onBlock, onUnblock, onDelete }: ToolbarProps) => {
  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={onBlock}
        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Block
      </button>
      <button
        onClick={onUnblock}
        className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        data-tooltip-id="unblock-tooltip"
        data-tooltip-content="Unblock selected users"
      >
        <FaLock className="h-5 w-5" />
      </button>
      <button
        onClick={onDelete}
        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        data-tooltip-id="delete-tooltip"
        data-tooltip-content="Delete selected users"
      >
        <FaTrash className="h-5 w-5" />
      </button>
      <Tooltip id="unblock-tooltip" />
      <Tooltip id="delete-tooltip" />
    </div>
  );
};

export default ToolbarComponent;
