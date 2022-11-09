-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JubenDrive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Carpooling',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    CONSTRAINT "JubenDrive_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JubenDrive_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JubenDrive" ("date", "id", "jubenId", "timeSlotId") SELECT "date", "id", "jubenId", "timeSlotId" FROM "JubenDrive";
DROP TABLE "JubenDrive";
ALTER TABLE "new_JubenDrive" RENAME TO "JubenDrive";
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
    "jubenDriveId" INTEGER,
    CONSTRAINT "Booking_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_jubenDriveId_fkey" FOREIGN KEY ("jubenDriveId") REFERENCES "JubenDrive" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("date", "female", "id", "jubenId", "male", "note", "status", "timeSlotId", "total") SELECT "date", "female", "id", "jubenId", "male", "note", "status", "timeSlotId", "total" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
