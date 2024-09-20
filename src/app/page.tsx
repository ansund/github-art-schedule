"use client";

import React, { useState } from "react";
import ArtCalendar from "@/components/ArtCalendar";
import { Button } from "@/components/ui/button";
import ScheduleTable from "@/components/ArtScheduleTable";
import { ArtSchedule, generateArtSchedule } from "../utils/artGenerator";

const sampleSchedule: ArtSchedule = {
  "2024-01-01": 3,
  "2024-02-14": 7,
  "2024-03-08": 4,
  "2024-04-22": 6,
  "2024-05-30": 9,
  "2024-06-15": 1,
  "2024-07-04": 5,
  "2024-08-01": 8,
  "2024-09-10": 3,
  "2024-12-25": 10,
};

export default function Home() {
  const [year, setYear] = useState(2024);
  const [schedule, setSchedule] = useState<ArtSchedule>(sampleSchedule);

  const handleGenerateSchedule = () => {
    console.log("Generating schedule for year:", year);
    const newSchedule = generateArtSchedule(year);
    setSchedule(newSchedule);
  };

  const handleDateClick = (date: string) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [date]: (prevSchedule[date] || 0) + 1,
    }));
  };

  const handleClearSchedule = () => {
    setSchedule({});
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Art Calendar</h1>
        <ArtCalendar
          schedule={schedule}
          year={year}
          onDateClick={handleDateClick}
        />
        <div className="mt-12 flex justify-center space-x-4">
          <Button onClick={handleGenerateSchedule}>
            Generate Art Schedule
          </Button>
          <Button onClick={handleClearSchedule} variant="outline">
            Clear Art Schedule
          </Button>
        </div>
        <ScheduleTable schedule={schedule} />
      </div>
    </main>
  );
}
