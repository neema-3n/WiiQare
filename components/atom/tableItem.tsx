import React, { FC } from 'react';
import { useTable, useSortBy, usePagination, Column, TableInstance, TableState } from 'react-table';
import { CSSTransition } from 'react-transition-group';

interface TableItemsProps<T extends object> {
    data: T[];
    columns: Column<T>[];
}

interface MyTableState<T extends object> extends TableState<T> {
    pageIndex: number;
    pageSize: number;
}

interface MyTableInstance<T extends object> extends TableInstance<T> {
    state: MyTableState<T>;
    page: T[];
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
    previousPage: () => void;
    nextPage: () => void;
    gotoPage: (pageIndex: number) => void;
    setPageSize: (pageSize: number) => void;
}

const initialTableState: MyTableState<any> = {
    pageIndex: 0,
    pageSize: 10,
};

const TableItems: FC<TableItemsProps<any>> = ({ data, columns }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        state: { pageIndex },
        gotoPage,
        canPreviousPage,
        canNextPage,
    } = useTable(
        {
            columns,
            data,
            initialState: initialTableState,
        },
        useSortBy,
        usePagination
    ) as MyTableInstance<any>;


    return (
        <div className="container mx-auto  text-black dark:text-white  transition-c-0.5">
            <div className="shadow rounded-2xl border-none  bg-white  transition-c-0.5 dark:bg-[#192231] no-scrollbar overflow-x-auto ">
                <div className=" table min-w-full overflow-hidden">

                    <table className=" table-auto  dark:bg-[#1e293b] w-full transition-c-0.5  text-center text-sm font-light" {...getTableProps()}>
                        <thead className="font-normal">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className=' transition-c-0.5 border-gray-200 bg-[#c3ddff82] dark:bg-[#192231]'>
                                    {headerGroup.headers.map((column: any) => (
                                        <th
                                            className={`text-left border-b  dark:border-gray-700  title-box py-5 pl-5 ${parseInt(column.id) >= columns.length - 5 ? '!p-0' : ''}`}
                                            {...column.getHeaderProps(column.getSortByToggleProps())} // Add the getSortByToggleProps() function to enable sorting
                                        > <div className='header flex'>
                                                {column.render('Header')}
                                                {/* Display the sorting icon */}
                                                {/* <span>
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512">
                                                                  
                                                                    <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512">
                                                                  
                                                                    <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" /></svg>
                                                            )
                                                        ) : (
                                                            // Default sorting icon
                                                            <div className='arrows ml-1 w-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512">
                                                                  
                                                                    <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512">
                                                                  
                                                                    <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" /></svg>
                                                            </div>


                                                        )}

                                                    </span> */}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>

                            {page.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <CSSTransition key={row.id} classNames="fade" timeout={200}>
                                        <tr {...row.getRowProps()} className='border-b dark:border-gray-700'>
                                            {row.cells.map((cell: any) => {
                                                const { getCellProps, column, render } = cell;
                                                return (
                                                    <td
                                                        {...getCellProps()}
                                                        className={`text-left whitespace-nowrap px-6 py-4 ${column.id >= columns.length - 5 ? 'x' : ''}`}
                                                    >
                                                        {render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </CSSTransition>
                                );
                            })}

                        </tbody>
                    </table>

                </div>
            </div>

            {/* Pagination Controls */}
            <ul className="inline-flex -space-x-px mt-3">
                <li>
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </li>
                {pageOptions.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => gotoPage(pageNumber)}
                            className={`px-3 py-2 leading-tight ${pageNumber === pageIndex
                                ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                        >
                            {pageNumber + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => gotoPage(pageOptions.length - 1)}
                        disabled={!canNextPage}
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </li>
            </ul>
        </div >
    );
};

export default TableItems;