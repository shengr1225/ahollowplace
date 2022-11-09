-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Juben" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "score" REAL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sections" TEXT NOT NULL,
    "players" TEXT NOT NULL,
    "canSwitchSex" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 6,
    "price" INTEGER NOT NULL DEFAULT 49
);
INSERT INTO "new_Juben" ("desc", "duration", "id", "image", "name", "players", "price", "score", "section", "sections") SELECT "desc", "duration", "id", "image", "name", "players", "price", "score", "section", "sections" FROM "Juben";
DROP TABLE "Juben";
ALTER TABLE "new_Juben" RENAME TO "Juben";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
