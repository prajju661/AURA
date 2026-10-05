import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'AURA — Autonomous Operations & Response Agent',
  description: 'Intelligent operations workflow platform orchestrating requests with policy RAG, n8n, and Gemini.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F0E8] text-[#292722] min-h-screen flex antialiased selection:bg-[#B85C38] selection:text-white">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen flex flex-col bg-[#F5F0E8]">
          {children}
        </main>
      </body>
    </html>
  );
}
