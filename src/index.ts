import { Prisma, PrismaClient } from ".prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { expectTypeOf } from "expect-type";

async function main() {
  // Doesn't work
  const prisma = new PrismaClient().$extends(withAccelerate());
  // works perfectly
  // const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    select: {
      id: true,
    },
  });

  expectTypeOf(user).toEqualTypeOf<{ id: number } | null>();

  await prisma.user.findFirst({
    select: {
      // @ts-expect-error
      wrong: true,
      name: true,
    },
  });
}

void main();
