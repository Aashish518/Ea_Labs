import { Edit, Trash2 } from "lucide-react";
import Badge from "./Badge";
import Button from "./ui/common/Button";

const Table = ({ headers, data, onEdit, onDelete, onRowClick, emptyMessage }) => {
  const isImageUrl = (value) => {
    if (typeof value !== "string") return false;
    return /\.(jpeg|jpg|png|gif|webp)$/i.test(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick && onRowClick(row._id)}
                className={`hover:bg-gray-50 transition-colors ${onRowClick ? "cursor-pointer" : ""
                  }`}
              >
                {Object.entries(row)
                  .filter(([key]) => key !== "_id")
                  .map(([key, cell], cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {key === "status" ? (
                        <Badge variant={cell.variant}>{cell.label}</Badge>
                      ) : isImageUrl(cell) ? (
                        <img
                          src={cell}
                          alt={row.categoryName || "image"}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}

                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    {onEdit && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row._id);
                        }}
                        className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row._id);
                        }}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-12 text-center text-gray-500"
              >
                {emptyMessage || "No data available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
