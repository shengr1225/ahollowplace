-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
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
    "ability" INTEGER DEFAULT 10,
    "tuili" REAL,
    "yanji" REAL,
    "xiezuo" REAL,
    "gaoxiao" REAL,
    "qinggan" REAL,
    "knot" TEXT,
    "roles" TEXT NOT NULL DEFAULT 'player',
    "currentExp" INTEGER DEFAULT 0,
    CONSTRAINT "User_jubenDriveId_fkey" FOREIGN KEY ("jubenDriveId") REFERENCES "JubenDrive" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Juben" (
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
    "price" INTEGER NOT NULL DEFAULT 49,
    "photos" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Booking" (
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

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "last" INTEGER NOT NULL,
    "onlyInWeekend" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "JubenDrive" (
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

-- CreateTable
CREATE TABLE "_JubenToTimeSlot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JubenToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JubenToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_JubenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JubenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JubenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookingToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_JubenToTimeSlot_AB_unique" ON "_JubenToTimeSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_JubenToTimeSlot_B_index" ON "_JubenToTimeSlot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JubenToUser_AB_unique" ON "_JubenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_JubenToUser_B_index" ON "_JubenToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToUser_AB_unique" ON "_BookingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToUser_B_index" ON "_BookingToUser"("B");
