import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Documentation</h1>
          <p className="lead text-xl text-zinc-600 dark:text-zinc-400">
            Welcome to the PulseSeo knowledge base. Learn how to optimize your site for the Agentic Web.
          </p>
          
          <hr className="my-8 border-zinc-200 dark:border-zinc-800"/>

          <h2>What is Agentic SEO?</h2>
          <p>
            Agentic SEO focuses on making your content readable by AI Agents (like ChatGPT, Claude, and Gemini). 
            Unlike traditional SEO, which targets keywords, Agentic SEO targets <strong>entities</strong> and <strong>facts</strong>.
          </p>

          <h3>Key Ranking Factors:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>JSON-LD Schema:</strong> Provides explicit facts to the AI.</li>
            <li><strong>Vector Context:</strong> Alt text helps AI vision models understand images.</li>
            <li><strong>Token Density:</strong> Sufficient text depth prevents "hallucination."</li>
          </ul>

          <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl">
            <strong>Pro Tip:</strong> Run a scan on your homepage first. If you score below 70, prioritize fixing your <code>robots.txt</code> and H1 tags.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}