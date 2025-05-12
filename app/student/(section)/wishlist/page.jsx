export const dynamic = 'force-dynamic';
import React from 'react'
import { getWishlistItems } from '@/lib/server/wishlistItems';
import { WishListCard } from '@/components/student/WishlistCard';

export default async function MyLearning() {
  const wishlistCourses = await getWishlistItems();
  console.log(wishlistCourses);
  if (!wishlistCourses || wishlistCourses.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
        <h1 className='text-3xl lg:text-4xl font-bold max-sm:text-2xl'>
          No Courses added to wishlist
        </h1>
      </div>
    )
  }
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
      <h1 className='text-3xl lg:text-4xl font-bold max-sm:text-2xl'>
        Wishlist
      </h1>
        <p className='text-muted-foreground mt-2'>Enroll now</p>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        {wishlistCourses.map((course) => (
          <WishListCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
