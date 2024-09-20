"use client";

import React from "react";
import { ArtSchedule as ArtScheduleType } from "../utils/artGenerator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ArtScheduleProps {
  schedule: ArtScheduleType;
}

const ScheduleTable: React.FC<ArtScheduleProps> = ({ schedule }) => {
  const sortedDates = Object.keys(schedule).sort();

  return (
    <div className="max-w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Commits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDates.map((date) => (
            <TableRow key={date}>
              <TableCell>{date}</TableCell>
              <TableCell>{schedule[date]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleTable;
