/*
  Warnings:

  - You are about to drop the column `jubenId` on the `TimeSlot` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_JubenToTimeSlot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JubenToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JubenToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "last" INTEGER NOT NULL,
    "onlyInWeekend" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_TimeSlot" ("end", "id", "last", "onlyInWeekend", "start") SELECT "end", "id", "last", "onlyInWeekend", "start" FROM "TimeSlot";
DROP TABLE "TimeSlot";
ALTER TABLE "new_TimeSlot" RENAME TO "TimeSlot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_JubenToTimeSlot_AB_unique" ON "_JubenToTimeSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_JubenToTimeSlot_B_index" ON "_JubenToTimeSlot"("B");
