'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { schedules } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function submitSchedule(prevState: any, formData: FormData) {
  try {
    // const userId = 'user123' // Replace with actual user ID from authentication
    // const entries = Array.from(formData.entries())

    // // Delete existing schedule for the user
    // await db.delete(schedules).where(schedules.userId.eq(userId))

    // // Insert new schedule
    // for (const [key, value] of entries) {
    //   const [day, timeSlot] = key.split('-')
    //   await db.insert(schedules).values({
    //     userId,
    //     day,
    //     timeSlot,
    //     isBusy: value === 'on' ? 1 : 0,
    //   })
    // }
    console.log(formData)

    revalidatePath('/schedule')
    return { success: true, message: 'Schedule submitted successfully!' }
  } catch (error) {
    console.error('Error submitting schedule:', error)
    return { success: false, message: 'Failed to submit schedule. Please try again.' }
  }
}