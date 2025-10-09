import prisma from "../src/config/db";

async function clearDatabase() {
  try {
    await prisma.note.deleteMany({});
    await prisma.user.deleteMany({});
    // Add more models if you have them
    console.log("✅ All data deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
