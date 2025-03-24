import React from 'react'
import TaskTable from './TaskTable'

const TaskList = () => {
    return (
        <div className='w-full min-h-screen flex justify-center p-10'>
            <div className='w-[80%] mx-auto'>
                <TaskTable />
            </div>
        </div>
    )
}

export default TaskList