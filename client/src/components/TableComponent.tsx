import { User } from '../types';

interface TableProps {
  users: User[];
  selectedUserIds: number[];
  onSelect: (userId: number) => void;
  onSelectAll: (checked: boolean) => void;
}

const TableComponent = ({ users, selectedUserIds, onSelect, onSelectAll }: TableProps) => {
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll(e.target.checked);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 px-4 py-2 text-left">
              <input
                type="checkbox"
                checked={selectedUserIds.length === users.length && users.length > 0}
                onChange={handleSelectAllChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Login</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="w-12 px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => onSelect(user.id)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : 'Never'}
              </td>
              <td className="px-4 py-2 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;