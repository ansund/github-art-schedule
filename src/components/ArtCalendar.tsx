"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ArtCalendarProps {
  schedule: ArtSchedule;
  year: number;
  onDateClick: (date: string) => void;
}

const ArtCalendar: React.FC<ArtCalendarProps> = ({
  schedule,
  year,
  onDateClick,
}) => {
  // Remove this line:
  // const [schedule, setSchedule] = useState<ScheduleData>(initialSchedule);

  const getColor = (value: number, isCurrentYear: boolean) => {
    if (!isCurrentYear) return "bg-black";
    const colors = [
      "bg-gray-100",
      "bg-green-50",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-green-700",
      "bg-green-800",
      "bg-green-900",
      "bg-green-900",
    ];
    return colors[Math.min(value, 10)];
  };

  const handleCellClick = (date: string) => {
    onDateClick(date);
  };

  const renderCell = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    const value = schedule[dateString] || 0;
    const isCurrentYear = date.getFullYear() === year;

    return (
      <TooltipProvider key={dateString}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`w-4 h-4 ${getColor(
                value,
                isCurrentYear
              )} cursor-pointer`}
              onClick={() => handleCellClick(dateString)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {dateString}: {value} contributions
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderCalendar = () => {
    const rows = 7; // days of the week
    const calendar = [];

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    for (let i = 0; i < rows; i++) {
      const week = [];
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      while (currentDate <= endDate) {
        week.push(renderCell(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
      }

      calendar.push(
        <div key={i} className="flex gap-1">
          {week}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="max-w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <div className="inline-block">
        <h2 className="text-1xl font-bold mb-4">{year}</h2>
        <div className="flex flex-col gap-1">{renderCalendar()}</div>
        <div className="flex justify-end items-center mt-2 text-xs text-gray-400">
          <span>Less</span>
          <div className="flex gap-1 ml-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <div key={value} className={`w-4 h-4 ${getColor(value, true)}`} />
            ))}
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
};

export default ArtCalendar;
