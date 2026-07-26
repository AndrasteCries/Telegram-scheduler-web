import { Dashboard } from "@/components/dashboard";

export default async function Workspace() {
  //todo cache using with tags 
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
  //   cache: "no-store",
  // });

  // const posts: Post[] = await res.json();
  return (
    
    <div>
      <Dashboard key={"dashboard"} />
    </div>  
  );
}