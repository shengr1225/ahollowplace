-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "people" TEXT NOT NULL,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT '',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "id", "jubenId", "note", "people", "status", "timeSlotId", "userId") SELECT "date", "id", "jubenId", "note", "people", "status", "timeSlotId", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Juben" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "score" REAL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sections" TEXT NOT NULL,
    "players" INTEGER,
    "price" INTEGER NOT NULL DEFAULT 49
);
INSERT INTO "new_Juben" ("desc", "id", "image", "name", "players", "score", "section", "sections") SELECT "desc", "id", "image", "name", "players", "score", "section", "sections" FROM "Juben";
DROP TABLE "Juben";
ALTER TABLE "new_Juben" RENAME TO "Juben";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
