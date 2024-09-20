export type ArtSchedule = Record<string, number>;

export function generateArtSchedule(year: number): ArtSchedule {
  const schedule: ArtSchedule = {};
  const numEntries = Math.floor(Math.random() * 20) + 10; // Generate 10-30 entries

  for (let i = 0; i < numEntries; i++) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Simplification: all months have 28 days
    const intensity = Math.floor(Math.random() * 10) + 1;

    const date = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    schedule[date] = intensity;
  }
  console.log("Generated schedule:", schedule);
  return schedule;
}
