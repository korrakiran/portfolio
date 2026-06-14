import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-20 bg-cyan-100 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12 inline-block bg-yellow-400 px-6 py-3 border-4 border-black rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-400 border-4 border-black translate-x-4 translate-y-4" />
            <div className="relative border-4 border-black overflow-hidden bg-white aspect-square">
              <ImageWithFallback
                src="/20260112_172738_Original.jpg"
                alt="Korra Kiran"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 bg-lime-300 inline-block px-4 py-2 border-4 border-black">
                Who I Am
              </h3>
              <div className="space-y-4 text-lg font-medium leading-relaxed">
                <p>
                  Hello! I am <strong>Korra Kiran</strong>, a passionate <strong>AI Engineer</strong> and <strong>Machine Learning Engineer</strong> based in Hyderabad, India. Currently a 3rd-year B-Tech student specializing in Artificial Intelligence and Machine Learning at Vidya Jyothi Institute of Technology (VJIT), I focus on building production-ready AI systems, natural language processing pipelines, and deep learning solutions that solve real-world challenges.
                </p>
                <p>
                  My portfolio features a diverse range of projects demonstrating my expertise in AI, ML, and Deep Learning. From building <strong>Vypar</strong>, a multilingual WhatsApp ERP system using LangGraph and Sarvam AI that simplifies business operations for small retailers, to developing <strong>Supply Chain Saathi</strong>, a B2B reverse auction procurement agent, I focus on turning complex machine learning research into practical applications.
                </p>
                <p>
                  I am deeply interested in federated learning (collaborative training without sharing raw data), computer vision, and cloud native architectures (Docker, Tailscale, and private cloud deployments). I continuously explore new frontiers in artificial intelligence to create secure, efficient, and scalable products.
                </p>
              </div>
            </div>
            <div className="bg-pink-400 border-4 border-black p-6 sm:p-8 rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">
                What I Do
              </h3>
              <ul className="space-y-2 text-lg font-mono font-bold">
                <li>→ Conversational AI & Agents (LangGraph)</li>
                <li>→ Full-Stack AI Products & WhatsApp Bots</li>
                <li>→ Machine Learning & Deep Learning</li>
                <li>→ Federated Learning Systems</li>
                <li>→ Cloud & DevOps (Docker, AWS, MongoDB)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
