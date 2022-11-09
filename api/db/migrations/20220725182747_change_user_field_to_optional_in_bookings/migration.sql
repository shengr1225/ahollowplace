/*
  Warnings:

  - You are about to drop the `_BookingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_BookingToUser_B_index";

-- DropIndex
DROP INDEX "_BookingToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookingToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "people" TEXT NOT NULL,
    "note" TEXT,
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "id", "jubenId", "note", "people", "timeSlotId") SELECT "date", "id", "jubenId", "note", "people", "timeSlotId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
