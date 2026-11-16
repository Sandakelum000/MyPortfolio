import prisma from "../lib/prisma";

async function main() {
  const email = process.argv[2];
  if (!email) throw new Error("Usage: tsx scripts/enable-2fa.ts <email>");

  await prisma.user.update({
    where: { email },
    data: { twoFactorEnabled: true },
  });
  console.log("Email code enabled for", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());