import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Inbox, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

/**
 * Data Table component strictly conforming to DESIGN_SYSTEM.md Section 5.7
 *
 * @param {Array<{ key: string, label: string, sortable?: boolean, render?: (val: any, row: any) => React.ReactNode }>} columns
 * @param {Array<Record<string, any>>} data
 * @param {number} pageSize
 * @param {string} emptyMessage
 */
export function DataTable({
  columns = [],
  data = [],
  pageSize = 10,
  emptyMessage = 'No records found',
  className = '',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey] ?? '';
      const valB = b[sortKey] ?? '';
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Desktop & Tablet Table View (hidden on mobile < 768px) */}
      <div className="hidden md:block overflow-x-auto rounded-md border border-border bg-bg-surface shadow-card">
        <table className="w-full text-left border-collapse" role="table">
          <thead>
            <tr className="border-b border-border bg-cream-050">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="px-6 py-4 type-label text-text-muted select-none"
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-2 group hover:text-text-default focus-visible:outline-none"
                    >
                      <span>{col.label}</span>
                      <span className="text-text-muted group-hover:text-text-default">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4 stroke-[2]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 stroke-[2]" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-4 h-4 opacity-50 stroke-[1.5]" />
                        )}
                      </span>
                    </button>
                  ) : (
                    <span>{col.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="min-h-[3.5rem] hover:bg-cream-100 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 type-body-md text-text-default"
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center min-h-[15rem] text-text-muted">
                    <Inbox className="w-12 h-12 stroke-[1.5] text-maroon-900/40 mb-3" />
                    <p className="type-body-md">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (below 768px as per Section 5.7 & 7.2) */}
      <div className="md:hidden space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((row, idx) => (
            <div
              key={row.id || idx}
              className="bg-bg-surface border border-border rounded-md p-4 shadow-card space-y-3"
            >
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between items-start gap-4 pb-2 border-b border-border/50 last:border-0 last:pb-0">
                  <span className="type-label text-text-muted">{col.label}</span>
                  <span className="type-body-md text-text-default text-right font-medium">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="bg-bg-surface border border-border rounded-md p-8 flex flex-col items-center justify-center min-h-[15rem] text-text-muted">
            <Inbox className="w-12 h-12 stroke-[1.5] text-maroon-900/40 mb-3" />
            <p className="type-body-md">{emptyMessage}</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <span className="type-body-sm text-text-muted">
            Page {currentPage} of {totalPages} ({sortedData.length} records)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="compact"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous Page"
              iconLeft={<ChevronLeft className="w-4 h-4" />}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              size="compact"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next Page"
              iconRight={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
