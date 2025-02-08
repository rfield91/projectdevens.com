import { cn } from "@/lib/utils";

interface TableProps<T extends object> {
  headers: {
    id: string;
    label: string;
    styles?: string;
    render: (entry: T) => React.ReactNode;
  }[];
  data: T[];
}

export function Table<T extends object>({ headers, data }: TableProps<T>) {
  return (
    <div className="w-full pt-2 border-2 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr className="">
            {headers.map((header) => (
              <th
                key={header.id}
                className={cn(
                  "px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase dark:text-neutral-500",
                  header.styles
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {data.length > 0 &&
            data.map((row, index) => (
              <tr key={index} className="">
                {headers.map((header) => (
                  <td
                    key={header.id}
                    className={cn(
                      "px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200",
                      header.styles
                    )}
                  >
                    {header.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className={
                  "px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 text-center"
                }
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
