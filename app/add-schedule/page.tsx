"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { submitSchedule } from "@/app/actions/submit-schedule"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const timeSlots = [
  "08:00", "09:40", "11:20", "13:00", "14:40", "16:20"
]

type Schedule = {
  [key: string]: {
    [key: string]: boolean
  }
}

export default function WeeklySchedule() {
  const [schedule, setSchedule] = useState<Schedule>({})
  const [showWeekend, setShowWeekend] = useState(false)
  const [state, formAction] = useFormState(submitSchedule, null)

  const toggleTimeSlot = (day: string, time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day]?.[time]
      }
    }))
  }

  const clearSchedule = () => {
    setSchedule({})
  }

  const displayDays = showWeekend ? days : days.slice(0, 5)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">Weekly Class Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <Button onClick={clearSchedule} variant="outline" size="sm">Clear Schedule</Button>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-weekend"
              checked={showWeekend}
              onCheckedChange={setShowWeekend}
            />
            <Label htmlFor="show-weekend">Show Weekend</Label>
          </div>
        </div>
        <form action={formAction}>
          <div className="grid grid-cols-[auto,repeat(6,1fr)] gap-1 overflow-x-auto">
            <div className="font-semibold text-center p-2 whitespace-nowrap">Day / Time</div>
            {timeSlots.map((time, index) => (
              <div key={time} className="font-semibold text-center p-2 text-xs whitespace-nowrap">
                {time} - {timeSlots[index + 1] || '18:00'}
              </div>
            ))}
            {displayDays.map(day => (
              <React.Fragment key={day}>
                <div className="font-semibold text-center p-2 whitespace-nowrap">{day}</div>
                {timeSlots.map(time => (
                  <button
                    key={`${day}-${time}`}
                    type="button"
                    className={`p-2 rounded transition-colors ${
                      schedule[day]?.[time]
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onClick={() => toggleTimeSlot(day, time)}
                    aria-label={`Toggle ${day} at ${time}`}
                  >
                    <input
                      type="checkbox"
                      name={`${day}-${time}`}
                      checked={schedule[day]?.[time] || false}
                      onChange={() => {}}
                      className="sr-only"
                    />
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span className="text-sm">Free</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span className="text-sm">Busy</span>
            </div>
          </div>
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit">Submit Schedule</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}