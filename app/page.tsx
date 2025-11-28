// app/page.tsx
"use client";

import Link from "next/link";
import type { Club, Post, User, School } from "@/types/models";

const mockSchools: School[] = [
  {
    id: "1",
    name: "京都明徳高等学校",
    shortName: "京都明徳",
    slug: "kyotomeitoku",
  },
];

const mockUsers: User[] = [
  {
    id: "u1",
    name: "浜田 大地",
    username: "hamada",
    role: "teacher",
    schoolId: "1",
  },
  {
    id: "u2",
    name: "山田 花子",
    username: "hanako",
    role: "student",
    schoolId: "1",
  },
];

const mockClubs: Club[] = [
  {
    id: "c1",
    name: "吹奏楽部・マーチングバンド部",
    slug: "brass-marching",
    schoolId: "1",
    description: "京都明徳高校の吹奏楽・マーチングバンド部です。",
  },
];

const mockPosts: Post[] = [
  {
    id: "p1",
    title: "定期演奏会の準備が本格スタート！",
    body: "今日はステージ構成の打ち合わせと、1部の曲決めをしました。",
    authorId: "u1",
    clubId: "c1",
    schoolId: "1",
    visibility: "public",
    createdAt: "2025-11-28T09:00:00+09:00",
  },
  {
    id: "p2",
    title: "初めてのマーチング大会を終えて",
    body: "本番は緊張したけど、仲間と一緒にできて楽しかったです！",
    authorId: "u2",
    clubId: "c1",
    schoolId: "1",
    visibility: "public",
    createdAt: "2025-11-25T18:00:00+09:00",
  },
];

const getUserById = (id: string) => mockUsers.find((u) => u.id === id);
const getClubById = (id: string) => mockClubs.find((c) => c.id === id);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-bold">
            Bukatsu Note
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/explore">みつける</Link>
            <Link href="/login">ログイン</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-6 px-4 py-6">
        {/* メインのタイムライン */}
        <section className="flex-1 space-y-4">
          <h2 className="text-base font-semibold text-slate-800">
            最近の投稿
          </h2>
          <div className="space-y-3">
            {mockPosts.map((post) => {
              const author = getUserById(post.authorId);
              const club = post.clubId ? getClubById(post.clubId) : undefined;
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
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {author && (
                      <Link
                        href={`/users/${author.username}`}
                        className="hover:underline"
                      >
                        {author.name}（{author.role === "teacher" ? "教員" : "生徒"}
                        ）
                      </Link>
                    )}
                    {club && (
                      <>
                        <span>・</span>
                        <Link
                          href={`/schools/kyotomeitoku/clubs/${club.slug}`}
                          className="hover:underline"
                        >
                          {club.name}
                        </Link>
                      </>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                    {post.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* サイドバー */}
        <aside className="hidden w-64 shrink-0 space-y-4 md:block">
          <section className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              学校・クラブ
            </h2>
            <div className="mt-2 space-y-2 text-sm">
              {mockSchools.map((school) => (
                <div key={school.id}>
                  <Link
                    href={`/schools/${school.slug}`}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    {school.name}
                  </Link>
                  <ul className="mt-1 ml-3 list-disc text-xs text-slate-600">
                    {mockClubs
                      .filter((c) => c.schoolId === school.id)
                      .map((club) => (
                        <li key={club.id}>
                          <Link
                            href={`/schools/${school.slug}/clubs/${club.slug}`}
                            className="hover:underline"
                          >
                            {club.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">
              ユーザー
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {mockUsers.map((user) => (
                <li key={user.id}>
                  <Link
                    href={`/users/${user.username}`}
                    className="hover:underline"
                  >
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
