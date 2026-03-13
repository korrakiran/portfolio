import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 border-b-8 border-black relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 border-4 border-black rotate-12 hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 border-4 border-black rotate-[-15deg] hidden lg:block" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-cyan-400 border-4 border-black rounded-full hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <div className="inline-block mb-6 px-6 py-2 bg-lime-300 border-4 border-black rotate-[-2deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-base sm:text-lg font-black uppercase">Hello, I'm</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase mb-6 tracking-tight">
          <span className="inline-block bg-white px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Korra Kiran
          </span>
        </h1>

        <p className="text-2xl sm:text-4xl font-black uppercase mb-12 max-w-3xl mx-auto">
          <span className="bg-yellow-400 px-4 py-2 border-4 border-black inline-block rotate-[1deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            AI/ML Engineer
          </span>
          <br className="my-2" />
          <span className="bg-pink-400 px-4 py-2 border-4 border-black inline-block rotate-[-1deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-4">
            & Deep Learning Builder
          </span>
        </p>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-bold">
          Building production-ready AI systems — from federated learning to multilingual ERP platforms 🚀
        </p>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <a href="https://github.com/korrakiran" target="_blank" rel="noopener noreferrer"
            className="p-4 bg-cyan-400 border-4 border-black hover:bg-cyan-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/korra-kiran-482998286/" target="_blank" rel="noopener noreferrer"
            className="p-4 bg-pink-400 border-4 border-black hover:bg-pink-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Linkedin size={28} />
          </a>
          <a href="mailto:kirankorra831@gmail.com"
            className="p-4 bg-yellow-400 border-4 border-black hover:bg-yellow-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <Mail size={28} />
          </a>
        </div>

        <a href="#projects"
          className="inline-flex items-center gap-3 px-8 py-4 bg-lime-300 border-4 border-black font-black uppercase text-lg hover:bg-lime-400 hover:translate-x-[-6px] hover:translate-y-[-6px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          View My Work
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
