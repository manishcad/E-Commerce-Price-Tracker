-- CreateTable
CREATE TABLE "TrackRequest" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alertSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TrackRequest_pkey" PRIMARY KEY ("id")
);
