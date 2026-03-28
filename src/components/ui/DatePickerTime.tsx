"use client"
import { useEffect } from "react"

interface DateTimeRangeProps {
  checkIn?: string
  checkOut?: string
  onChange?: (data: {
    checkIn: string
    checkOut: string
  }) => void
}

export default function DateTimeRange({
  checkIn,
  checkOut,
  onChange,
}: DateTimeRangeProps) {

  const handleChange = () => {
    const checkInValue =
      checkIn
        ? checkIn
        : ""

    const checkOutValue =
      checkOut
        ? checkOut
        : ""

    onChange?.({
      checkIn: checkInValue,
      checkOut: checkOutValue,
    })
  }

  useEffect(() => {
    handleChange()
  }, [checkIn, checkOut])

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">

      {/* CHECK-IN */}
      <div className="p-4 border rounded-xl shadow-sm bg-white space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Check-in
        </h3>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 mb-1">
              Date
            </label>
            <input
              type="date"
              value={checkIn?.split(' ')[0] || ''}
              onChange={(e) => {
                const date = e.target.value
                const time = checkIn?.split(' ')[1] || ''
                onChange?.({ checkIn: `${date} ${time}`, checkOut: checkOut || '' })
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 mb-1">
              Time
            </label>
            <input
              type="time"
              value={checkIn?.split(' ')[1] || ''}
              onChange={(e) => {
                const time = e.target.value
                const date = checkIn?.split(' ')[0] || ''
                onChange?.({ checkIn: `${date} ${time}`, checkOut: checkOut || '' })
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>
      </div>

      {/* CHECK-OUT */}
      <div className="p-4 border rounded-xl shadow-sm bg-white space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Check-out
        </h3>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 mb-1">
              Date
            </label>
            <input
              type="date"
              value={checkOut?.split(' ')[0] || ''}
              onChange={(e) => {
                const date = e.target.value
                const time = checkOut?.split(' ')[1] || ''
                onChange?.({ checkIn: checkIn || '', checkOut: `${date} ${time}` })
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 mb-1">
              Time
            </label>
            <input
              type="time"
              value={checkOut?.split(' ')[1] || ''}
              onChange={(e) => {
                const time = e.target.value
                const date = checkOut?.split(' ')[0] || ''
                onChange?.({ checkIn: checkIn || '', checkOut: `${date} ${time}` })
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}