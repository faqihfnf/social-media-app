"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();
  if (!user) return null;

  try {
    const email = user.emailAddresses[0]?.emailAddress || "";
    const username = user.username || email || `user_${user.id.slice(-8)}`;

    // Cek apakah user sudah ada berdasarkan clerkId
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (existingUser) {
      // Update user yang sudah ada
      const dbUser = await prisma.user.update({
        where: { clerkId: user.id },
        data: {
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          username: username,
          image: user.imageUrl,
          // Jangan update email jika sudah ada untuk menghindari konflik
        },
      });
      return dbUser;
    } else {
      // Cek apakah email sudah digunakan user lain
      const emailConflict = await prisma.user.findUnique({
        where: { email: email },
      });

      if (emailConflict) {
        // Jika email sudah digunakan, gunakan email yang dimodifikasi
        const modifiedEmail = `${user.id}+${email}`;

        const dbUser = await prisma.user.create({
          data: {
            clerkId: user.id,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            username: username,
            email: modifiedEmail,
            image: user.imageUrl,
          },
        });
        return dbUser;
      } else {
        // Email belum digunakan, buat user baru
        const dbUser = await prisma.user.create({
          data: {
            clerkId: user.id,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            username: username,
            email: email,
            image: user.imageUrl,
          },
        });
        return dbUser;
      }
    }
  } catch (error) {
    console.error("Error syncing user:", error);

    // Fallback: coba ambil user yang sudah ada
    try {
      return await prisma.user.findUnique({
        where: { clerkId: user.id },
      });
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      return null;
    }
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
}
