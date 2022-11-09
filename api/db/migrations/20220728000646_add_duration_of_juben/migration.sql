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
    "players" INTEGER,
    "duration" INTEGER NOT NULL DEFAULT 6,
    "price" INTEGER NOT NULL DEFAULT 49
);
INSERT INTO "new_Juben" ("desc", "id", "image", "name", "players", "price", "score", "section", "sections") SELECT "desc", "id", "image", "name", "players", "price", "score", "section", "sections" FROM "Juben";
DROP TABLE "Juben";
ALTER TABLE "new_Juben" RENAME TO "Juben";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
