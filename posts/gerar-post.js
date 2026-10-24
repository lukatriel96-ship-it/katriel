import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function criarNoticiaBPC() {
  const dataHoje = new Date().toISOString().split('T')[0];
  
  const prompt = `
    Você é um redator especializado em Direito Previdenciário (com foco em BPC/LOAS) para o blog do escritório Katriel & Freitas Advogados.
    Escreva um artigo informativo, claro e humanizado sobre um tema relevante do BPC/LOAS (ex: regras de renda, atualizações do CadÚnico, BPC para autistas, idosos ou o que fazer em caso de negativa).
    
    Diretrizes obrigatórias:
    1. Tom profissional, empático, acessível e sem excesso de "juridiquês".
    2. Respeite estritamente o Código de Ética da OAB (conteúdo puramente informativo e educacional, sem captação de clientela agressiva ou promessa de resultado).
    3. Use marcações Markdown estruturadas (títulos H2 e H3, listas).
    4. No final do texto, coloque um breve aviso neutro orientando o leitor a procurar orientação jurídica especializada caso tenha dúvidas sobre o caso concreto.
    5. No início do arquivo, inclua obrigatoriamente um cabeçalho YAML Frontmatter exatamente neste formato:
    ---
    title: "Título atraente otimizado para SEO sobre BPC"
    date: "${dataHoje}"
    description: "Resumo curto do artigo para aparecer no Google."
    ---

    Gere apenas o conteúdo em Markdown limpo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const conteudo = response.text;
    const slug = `bpc-atualizacao-${dataHoje}-${Math.floor(Math.random() * 1000)}`;
    const caminhoArquivo = path.join(process.cwd(), 'posts', `${slug}.md`);

    fs.writeFileSync(caminhoArquivo, conteudo);
    console.log(`Artigo gerado com sucesso: ${slug}.md`);
  } catch (error) {
    console.error("Erro ao gerar post com IA:", error);
    process.exit(1);
  }
}

criarNoticiaBPC();