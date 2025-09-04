import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.actions";
import ProfilePageClient from "@/components/section/ProfilePageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await getProfileByUsername((await params).username);
  if (!user) return;

  return {
    title: `Profile | ${user.name ?? user.username}`,
    description: user.bio || "User profile page",
  };
}

export default async function ProfilePageServer({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await getProfileByUsername((await params).username);
  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);
  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
