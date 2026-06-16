import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-20 bg-cyan-100 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12 inline-block bg-yellow-400 px-6 py-3 border-4 border-black rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative md:sticky md:top-28 self-start">
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
            <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 bg-lime-300 inline-block px-4 py-2 border-4 border-black">
                Who I Am
              </h3>
              <div className="space-y-3 text-base font-medium leading-relaxed">
                <p>
                  Hello! I am <strong>Korra Kiran</strong>, a passionate <strong>AI & Machine Learning Engineer</strong> based in Hyderabad, India. Currently a 3rd-year B.Tech student specializing in AI/ML at Vidya Jyothi Institute of Technology (VJIT), I build production-ready AI systems, NLP pipelines, and deep learning solutions that solve real-world challenges.
                </p>
                <p>
                  I specialize in bridging the gap between ML research and practice. Key projects include <strong>Vypar</strong> (a multilingual WhatsApp ERP using LangGraph and Sarvam AI to help small retailers) and <strong>Supply Chain Saathi</strong> (a B2B reverse auction procurement agent).
                </p>
                <p>
                  My interests cover federated learning, computer vision, and cloud-native architectures (Docker, Tailscale). I focus on building secure, scalable, and efficient AI products.
                </p>
              </div>
            </div>
            <div className="bg-pink-400 border-4 border-black p-5 sm:p-6 rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">
                What I Do
              </h3>
              <ul className="space-y-2 text-base font-mono font-bold">
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
