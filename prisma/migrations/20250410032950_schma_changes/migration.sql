-- AlterTable
ALTER TABLE "_ChatRoomToUser" ADD CONSTRAINT "_ChatRoomToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ChatRoomToUser_AB_unique";
