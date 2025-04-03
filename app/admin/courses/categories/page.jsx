import React from 'react'
import CategoryList from './categoryList'

const Categories = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className='flex flex-col'>
                <h1 className="text-2xl font-bold">Category Management</h1>
                <p className="text-muted-foreground mt-1">View, Create and Update Categories</p>
            </div>
            <CategoryList />
        </div>
    )
}

export default Categories