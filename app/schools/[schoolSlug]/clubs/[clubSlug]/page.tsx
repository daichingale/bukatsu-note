// app/schools/[schoolSlug]/clubs/[clubSlug]/page.tsx
import { notFound } from "next/navigation";
import type { Club, Post, User } from "@/types/models";
import Link from "next/link";

// 実際は外から import する想定。ここでは簡略化して再定義でもOK。
const mockUsers: User[] = [/* ...さっきと同じ... */] as any;
const mockClubs: Club[] = [/* ... */] as any;
const mockPosts: Post[] = [/* ... */] as any;

type Props = {
  params: { schoolSlug: string; clubSlug: string };
};

export default function ClubPage({ params }: Props) {
  const club = mockClubs.find((c) => c.slug === params.clubSlug);
  if (!club) return notFound();

  const posts = mockPosts.filter((p) => p.clubId === club.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <header className="mb-4 border-b pb-3">
        <h1 className="text-xl font-bold text-slate-900">{club.name}</h1>
        {club.description && (
          <p className="mt-1 text-sm text-slate-700">{club.description}</p>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">このクラブの投稿</h2>
        {posts.length === 0 && (
          <p className="text-sm text-slate-500">まだ投稿はありません。</p>
        )}
        {posts.map((post) => {
          const author = mockUsers.find((u) => u.id === post.authorId);
          return (
            <article
              key={post.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-base font-semibold text-slate-900">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-1 text-xs text-slate-500">
                {author ? `${author.name} さんの投稿` : "不明なユーザー"}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                {post.body}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
