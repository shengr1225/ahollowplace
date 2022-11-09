-- AlterTable
ALTER TABLE "User" ADD COLUMN "ability" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "total" INTEGER,
    "male" INTEGER,
    "female" INTEGER,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Carpooling',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    CONSTRAINT "Booking_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "female", "id", "jubenId", "male", "note", "status", "timeSlotId", "total") SELECT "date", "female", "id", "jubenId", "male", "note", "status", "timeSlotId", "total" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
