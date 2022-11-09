/*
  Warnings:

  - Added the required column `female` to the `JubenDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `male` to the `JubenDrive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `JubenDrive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JubenDrive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "male" INTEGER NOT NULL,
    "female" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Carpooling',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    CONSTRAINT "JubenDrive_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JubenDrive_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JubenDrive" ("date", "id", "jubenId", "status", "timeSlotId") SELECT "date", "id", "jubenId", "status", "timeSlotId" FROM "JubenDrive";
DROP TABLE "JubenDrive";
ALTER TABLE "new_JubenDrive" RENAME TO "JubenDrive";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
