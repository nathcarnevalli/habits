import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(e: FormEvent) {
    e.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysWithRemoveOne)
    } else {
      const weekDaysWithAddOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your goal?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: study, drink water, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={event => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        How often will you do it?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, i) => (
          <Checkbox.Root
            key={weekDay}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handleToggleWeekDay(i)}
            checked={weekDay.includes(i)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className=" text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold"></Check>
        Submit
      </button>
    </form>
  )
}
