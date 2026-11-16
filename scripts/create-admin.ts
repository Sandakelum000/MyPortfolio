import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { auth } = await import("../lib/auth/auth"); // loaded after the env is ready
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) throw new Error("Usage: tsx scripts/create-admin.ts <email> <password>");

  await auth.api.createUser({
    body: { email, password, name: "Admin", role: "admin" },
  });
  console.log("Admin created:", email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});