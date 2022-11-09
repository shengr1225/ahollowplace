-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "jubenDriveId" INTEGER,
    "thumbnail" TEXT,
    "desc" TEXT,
    "label" TEXT,
    "ability" INTEGER DEFAULT 10,
    "tuili" DOUBLE PRECISION,
    "yanji" DOUBLE PRECISION,
    "xiezuo" DOUBLE PRECISION,
    "gaoxiao" DOUBLE PRECISION,
    "qinggan" DOUBLE PRECISION,
    "knot" TEXT,
    "roles" TEXT NOT NULL DEFAULT 'player',
    "currentExp" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Juben" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "image" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sections" TEXT NOT NULL,
    "players" TEXT NOT NULL,
    "canSwitchSex" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 6,
    "price" INTEGER NOT NULL DEFAULT 49,
    "photos" TEXT,

    CONSTRAINT "Juben_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total" INTEGER,
    "male" INTEGER,
    "female" INTEGER,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Carpooling',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,
    "jubenDriveId" INTEGER,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "last" INTEGER NOT NULL,
    "onlyInWeekend" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JubenDrive" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "male" INTEGER NOT NULL,
    "female" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Carpooling',
    "jubenId" INTEGER NOT NULL,
    "timeSlotId" INTEGER NOT NULL,

    CONSTRAINT "JubenDrive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JubenToTimeSlot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JubenToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookingToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jubenDriveId_fkey" FOREIGN KEY ("jubenDriveId") REFERENCES "JubenDrive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_jubenDriveId_fkey" FOREIGN KEY ("jubenDriveId") REFERENCES "JubenDrive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JubenDrive" ADD CONSTRAINT "JubenDrive_jubenId_fkey" FOREIGN KEY ("jubenId") REFERENCES "Juben"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JubenDrive" ADD CONSTRAINT "JubenDrive_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JubenToTimeSlot" ADD CONSTRAINT "_JubenToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JubenToTimeSlot" ADD CONSTRAINT "_JubenToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JubenToUser" ADD CONSTRAINT "_JubenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Juben"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JubenToUser" ADD CONSTRAINT "_JubenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToUser" ADD CONSTRAINT "_BookingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToUser" ADD CONSTRAINT "_BookingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
