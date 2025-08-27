import CreatePost from "@/components/section/CreatePost";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : <p>Sign in to create a post</p>}
        Create Post
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        Who To Follow
      </div>
    </div>
  );
}
