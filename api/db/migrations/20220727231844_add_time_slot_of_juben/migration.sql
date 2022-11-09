-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "last" INTEGER NOT NULL,
    "jubenId" INTEGER,
    CONSTRAINT "TimeSlot_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TimeSlot" ("end", "id", "last", "start") SELECT "end", "id", "last", "start" FROM "TimeSlot";
DROP TABLE "TimeSlot";
ALTER TABLE "new_TimeSlot" RENAME TO "TimeSlot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
