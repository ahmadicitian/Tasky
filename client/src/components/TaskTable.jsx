import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, getTasks } from '../services/taskApi';
import Swal from 'sweetalert2';

const TaskTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tasks', currentPage, recordsPerPage, searchTerm],
        queryFn: () => getTasks({
            page: currentPage,
            itemsPerPage: recordsPerPage,
            searchBy: searchTerm
        }),
        keepPreviousData: true,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            Swal.fire('Deleted!', 'Task deleted successfully', 'success');
        },
        onError: (error) => {
            Swal.fire('Error!', 'Failed to delete task', 'error');
        }
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= data?.totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-4">
            {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-left">Created At</th>
                            <th className="p-2 text-left">Priority</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">Loading...</td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">Error loading tasks</td>
                            </tr>
                        ) : data?.tasks?.length > 0 ? (
                            data.tasks.map((task) => (
                                <tr key={task._id} className="border-t hover:bg-gray-50">
                                    <td className="p-2">{task.title}</td>
                                    <td className="p-2">{new Date(task.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${task.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {task.completed ? "Completed" : "Incomplete"}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">No tasks found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div>
                    <span className="text-sm">
                        Page {currentPage} of {data?.totalPages || 0}
                    </span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        First
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === data?.totalPages || !data?.totalPages}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => handlePageChange(data?.totalPages || 1)}
                        disabled={currentPage === data?.totalPages || !data?.totalPages}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        Last
                    </button>
                </div>
                <div className="flex items-center">
                    <span className="mr-2 text-sm">Per page:</span>
                    <select
                        value={recordsPerPage}
                        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        className="border rounded p-1"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;