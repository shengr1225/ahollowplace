/*
  Warnings:

  - Made the column `section` on table `Juben` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Juben" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "score" REAL,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sections" TEXT
);
INSERT INTO "new_Juben" ("desc", "id", "image", "name", "score", "section") SELECT "desc", "id", "image", "name", "score", "section" FROM "Juben";
DROP TABLE "Juben";
ALTER TABLE "new_Juben" RENAME TO "Juben";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
