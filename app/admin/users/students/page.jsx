'use client'
import {useState, useEffect} from 'react'
import { DataTable } from './data-table'
import { columns } from './column'
import { Loader2 } from 'lucide-react'

const StudentsData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await response.json();
                setData(users.results || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className='container max-w-4xl mx-auto p-4 py-8'>
                <div className='flex item-center justify-center'>
                    <Loader2 className="mr-2 h-12 w-12 mt-2 animate-spin" />
                </div>
            </div>
        )
      }
    if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
    return (
        <div className="container mx-auto py-10 px-4">
             <div className='flex flex-col'>
                <h1 className="text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground mt-1">View, manage, and update student accounts</p>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
export default StudentsData