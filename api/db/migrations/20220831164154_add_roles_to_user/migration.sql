-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "jubenDriveId" INTEGER,
    "thumbnail" TEXT,
    "desc" TEXT,
    "label" TEXT,
    "tuili" REAL,
    "yanji" REAL,
    "xiezuo" REAL,
    "gaoxiao" REAL,
    "qinggan" REAL,
    "knot" TEXT,
    "roles" TEXT NOT NULL DEFAULT 'player',
    CONSTRAINT "User_jubenDriveId_fkey" FOREIGN KEY ("jubenDriveId") REFERENCES "JubenDrive" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("desc", "email", "gaoxiao", "hashedPassword", "id", "jubenDriveId", "knot", "label", "name", "qinggan", "resetToken", "resetTokenExpiresAt", "salt", "thumbnail", "tuili", "xiezuo", "yanji") SELECT "desc", "email", "gaoxiao", "hashedPassword", "id", "jubenDriveId", "knot", "label", "name", "qinggan", "resetToken", "resetTokenExpiresAt", "salt", "thumbnail", "tuili", "xiezuo", "yanji" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
