import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Artigo não encontrado</h1>
        <Link href="/blog" className="text-blue-600 underline mt-4 inline-block">Voltar para o Blog</Link>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = marked(content);

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline mb-6 inline-block">
          &larr; Voltar para todas as notícias
        </Link>
        <span className="block text-xs text-gray-400 mb-2">{data.date}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
        
        <div 
          className="prose prose-blue max-w-none text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Precisa de ajuda com o seu BPC/LOAS?</h3>
          <p className="text-sm text-gray-600 mb-4">Nossa equipe está à disposição para analisar o seu caso de forma humanizada e especializada.</p>
          <a 
            href="https://katrielfreitasadvogados.com.br/#contato" 
            className="inline-block bg-green-600 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
          >
            Falar com um Advogado
          </a>
        </div>
      </article>
    </main>
  );
}
