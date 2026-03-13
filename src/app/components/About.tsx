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
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 bg-lime-300 inline-block px-4 py-2 border-4 border-black">
                Who I Am
              </h3>
              <p className="text-lg font-medium">
                3rd-year B-Tech AI/ML student at VJIT, Hyderabad. I build production-ready AI systems that solve real problems — especially for Indian users.
              </p>
            </div>
            <div className="bg-pink-400 border-4 border-black p-6 sm:p-8 rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4">
                What I Do
              </h3>
              <ul className="space-y-2 text-lg font-bold">
                <li>→ Machine Learning & Deep Learning</li>
                <li>→ Federated Learning Systems</li>
                <li>→ NLP & Computer Vision</li>
                <li>→ Full-Stack AI Product Building</li>
                <li>→ Cloud & DevOps (AWS, Azure, Docker)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
