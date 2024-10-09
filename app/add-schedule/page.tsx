import WeeklySchedule from './components/weekly-schedule'
import { Toaster } from "@/components/ui/toaster"

export default function SchedulePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sync UP</h1>
      <WeeklySchedule />
      <Toaster />
    </div>
  )
}

