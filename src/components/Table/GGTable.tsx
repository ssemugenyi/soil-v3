/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  // AiOutlineArrowDown,
  // AiOutlineArrowUp,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { type JSX } from "react/jsx-runtime";

import {
  useTable,
  usePagination,
  useGlobalFilter,
} from "react-table/dist/react-table.development";

// import { useTable, usePagination, useGlobalFilter } from "react-table";

import "./style.css";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

interface COLUMNTYPE {
  Header: string;
}
export interface SoilData {
  Nitrogen: number | string;
  Phosphorus: number | string;
  Potassium: number | string;

  ts: number;
  PhoneNumber: string;
}

interface TABLEPROPS {
  data: SoilData[];
  columns: COLUMNTYPE[];
  isLoading?: boolean;
  emptyText?: string;
  hideActions?: boolean;
  search?: string;
  tableHeader?: string;
  hideNavigation?: boolean;
  showExportButton?: boolean;
  searchInputPlaceholder?: string;
  onViewHandler?: (data: any) => void;
  onEditHandler?: (data: any) => void;
  onDeleteHandler?: (data: any) => void;
  onAddNewHandler?: () => void;
}

function GGTable({
  data,
  columns,
  isLoading,
  emptyText,
  hideActions,
  showExportButton,
  onViewHandler,
  onEditHandler,
  onDeleteHandler,
  onAddNewHandler,
  tableHeader,
  searchInputPlaceholder,
  hideNavigation,
}: TABLEPROPS) {
  const [tableColumns, setTableColumns] = useState<COLUMNTYPE[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current === null) return;

      if (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      title: "View",
      icon: <AiOutlineEye />,
      show: !!onViewHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onViewHandler) {
          onViewHandler(rowData);
        }
      },
    },
    {
      title: "Edit",
      icon: <AiOutlineEdit />,
      show: !!onEditHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onEditHandler) {
          onEditHandler(rowData);
        }
      },
    },
    {
      title: "Delete",
      icon: <BiTrash />,
      show: !!onDeleteHandler,
      onClick: (e: any, rowData: any) => {
        e.stopPropagation();
        if (onDeleteHandler) {
          onDeleteHandler(rowData);
        }
      },
    },
  ];

  const showMenus = menuItems.filter((item) => item.show).length > 0;

  useEffect(() => {
    const handleMenuToggle = (index: number) => {
      if (selectedRowIndex === index) {
        setMenuOpen(!menuOpen);
      } else {
        setSelectedRowIndex(index);
        setMenuOpen(true);
      }
    };
    if (!hideActions && showMenus) {
      const actionColumn = {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        style: { textAlign: "center" },
        Cell: ({ row }: { row: any }) => (
          <div className="relative flex justify-center">
            <button
              type="button"
              onClick={(e: any) => {
                e.stopPropagation();
                handleMenuToggle(row.index as number);
              }}
              title="Show Menu"
              className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center hover:bg-primary"
            >
              <HiDotsVertical />
            </button>

            {menuOpen && selectedRowIndex === row.index && (
              <div
                className="flex flex-col justify-start gap-1 absolute bg-white rounded-sm px-3 py-2 top-6 right-12 z-50 shadow-md"
                ref={menuRef}
              >
                {menuItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <div
                      key={Math.random()}
                      title={item.title}
                      onClick={(e) => {
                        item.onClick(e, row.original);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 cursor-pointer text-textColor2 hover:text-primary hover:bg-[aliceblue] w-full px-3 py-2 rounded-md`}
                    >
                      {item.icon} {item.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ),
      };
      setTableColumns([...columns, actionColumn]);
    } else {
      setTableColumns(columns);
    }
  }, [columns, menuOpen]);

  const modifiedColumns = useMemo(() => tableColumns, [tableColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns: modifiedColumns,
      data: data ?? [],
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const [searchTerm, setSearchTerm] = useState("");

  const getNoDataText = () => {
    if (isLoading) return null;
    if (searchTerm) {
      return (
        <span>
          No search result for{" "}
          <strong className="font-semibold">{searchTerm}</strong>
        </span>
      );
    }

    return emptyText ?? "No data";
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setGlobalFilter(value);
  };

  const { pageIndex } = state;

  return (
    <div className="w-full  mb-4">
      {!hideNavigation && (
        <>
          <div
            className={`mb-8 flex items-center gap-2 ${
              tableHeader ? "justify-between" : "justify-end"
            }`}
          >
            {tableHeader && (
              <div>
                <h4 className="text-lg font-semibold font-poppins text-primary">
                  {tableHeader}
                </h4>
              </div>
            )}
            {showExportButton && (
              <button
                className="text-sm font-medium bg-primaryLight text-primary hover:bg-primary/20 px-4 py-1 rounded-full disabled:bg-primary/30 disabled:cursor-not-allowed"
                onClick={() => {
                  // TODO: Export to pdf
                }}
              >
                Export Pdf
              </button>
            )}
            {onAddNewHandler && (
              <button
                className="flex items-center gap-1 text-sm font-medium bg-primary hover:bg-primary/80 text-white px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
                onClick={onAddNewHandler}
              >
                <FaPlus />
                Add New
              </button>
            )}
          </div>
          <div className="my-4 flex items-center justify-end gap-1">
            <div>
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={searchInputPlaceholder ?? "Search..."}
                className="w-full p-2 border border-[#E2E1E1] rounded-md focus:outline-none focus:border-primary focus:ring-primary gg__search_input"
              />
            </div>

            <div className="flex items-center !text-primary gap-1">
              <select
                disabled={isLoading}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setPageSize(Number(e.target.value));
                }}
                className="gg__search_input appearance-none !text-primary rounded-md py-1 md:py-1 px-2 focus:outline-none focus:border-primary hover:border-primary leading-tight"
              >
                {[5, 10, 20, 30, 40, 50].map((pSize) => (
                  <option key={pSize} value={pSize}>
                    {pSize}
                  </option>
                ))}
              </select>
              /Page
            </div>
          </div>
        </>
      )}
      <div className="w-full overflow-x-auto table-wrapper">
        <table
          {...getTableProps}
          className="table-auto text-sm border-collapse w-full data-table"
        >
          <thead className="bg-[#e0e0e0]">
            {headerGroups?.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: Array<{
                  getHeaderProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableHeaderCellElement> &
                    React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                  render: (
                    arg0: string
                  ) =>
                    | string
                    | number
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined;
                }>;
              }) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(
                    (column: {
                      getHeaderProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableHeaderCellElement> &
                        React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                      render: (
                        arg0: string
                      ) =>
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <th
                        {...column.getHeaderProps()}
                        // @ts-expect-error leave-this-to-dynamically-apply-styles-to-table-columns
                        style={column?.style}
                        className="font-semibold capitalize font-poppins text-left text-sm text-textColor p-2 pt-0 pb-3 whitespace-nowrap"
                      >
                        {column.render("Header")}
                      </th>
                    )
                  )}
                </tr>
              )
            )}
          </thead>

          {!isLoading ? (
            <tbody {...getTableBodyProps}>
              {page?.map(
                (row: {
                  getRowProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableRowElement> &
                    React.HTMLAttributes<HTMLTableRowElement>;
                  cells: any[];
                }) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="group even:bg-primary/50 hover:bg-tableHover transition-all duration-300 hover:text-white hover:odd:text-primary hover:cursor-pointer"
                    >
                      {row.cells.map(
                        (cell: {
                          column: any;
                          getCellProps: () => JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLTableDataCellElement> &
                            React.TdHTMLAttributes<HTMLTableDataCellElement>;
                          render: (
                            arg0: string
                          ) =>
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined;
                        }) => (
                          <td
                            {...cell.getCellProps()}
                            className="text-left p-2  font-poppins font-regular text-sm"
                            style={cell.column?.style}
                          >
                            {cell.render("Cell")}
                          </td>
                        )
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={modifiedColumns.length}
                  className="text-center p-4"
                >
                  <p>Loading...</p>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {page?.length < 1 && getNoDataText()}
      </p>

      {pageOptions.length > 1 && !hideNavigation && (
        <div className="flex gap-4 my-6 justify-end">
          <button
            type="button"
            disabled={!canPreviousPage}
            onClick={() => {
              previousPage();
            }}
            className="text-sm font-medium bg-primary text-white px-4 py-1 rounded-full disabled:bg-primary/50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-poppins">{`${pageIndex + 1} of ${
            pageOptions.length
          }`}</span>
          <button
            type="button"
            disabled={!canNextPage}
            onClick={() => {
              nextPage();
            }}
            className="text-sm font-medium bg-primary text-white px-4 py-1 rounded-full disabled:bg-primary/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default GGTable;
