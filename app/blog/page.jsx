import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  let filenames = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (e) {
    filenames = [];
  }

  const posts = filenames
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || 'Sem título',
        date: data.date || '',
        description: data.description || '',
      };
    });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artigos e Notícias sobre BPC / LOAS</h1>
        <p className="text-gray-600 mb-8">Informações atualizadas para orientar você sobre seus direitos previdenciários.</p>

        {posts.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">Nenhum artigo publicado no momento.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                <h2 className="text-xl font-semibold text-blue-900 mt-1 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                  Ler artigo completo &rarr;
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
