export type Seat = { id: string; row: number; col: number };

function leftRow(rowLabel: string, rowIndex: number, count: number): Seat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${rowLabel}${i + 1}`,
    row: rowIndex,
    col: 2 + i // kiri: 2..9
  }));
}

function rightRow(rowLabel: string, rowIndex: number, startNumber: number, count: number): Seat[] {
  // align ke kanan (outer edge lurus di kolom 19)
  const startCol = 19 - (count - 1);
  return Array.from({ length: count }, (_, i) => ({
    id: `${rowLabel}${startNumber + i}`,
    row: rowIndex,
    col: startCol + i
  }));
}

export const SEATS: Seat[] = [
  ...leftRow("M", 1, 8),  ...rightRow("M", 1, 9, 8),
  ...leftRow("L", 2, 8),  ...rightRow("L", 2, 9, 8),
  ...leftRow("K", 3, 8),  ...rightRow("K", 3, 9, 8),
  ...leftRow("J", 4, 8),  ...rightRow("J", 4, 9, 8),

  ...leftRow("I", 5, 6),  ...rightRow("I", 5, 7, 6),
  ...leftRow("H", 6, 6),  ...rightRow("H", 6, 7, 6),
  ...leftRow("G", 7, 6),  ...rightRow("G", 7, 7, 6),

  ...leftRow("F", 8, 6),  ...rightRow("F", 8, 7, 6),
  ...leftRow("E", 9, 5),  ...rightRow("E", 9, 6, 5),
  ...leftRow("D", 10, 4), ...rightRow("D", 10, 5, 4),
  ...leftRow("C", 11, 4), ...rightRow("C", 11, 5, 4),

  { id: "B1", row: 12, col: 10 },
  { id: "B2", row: 12, col: 11 },
  { id: "A1", row: 13, col: 10 },
  { id: "A2", row: 13, col: 11 }
];
