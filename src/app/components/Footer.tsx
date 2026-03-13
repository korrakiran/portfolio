import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span>Made with</span>
            <Heart size={20} fill="currentColor" className="text-pink-400" />
            <span>by Korra Kiran</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/korrakiran" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-400 text-black border-4 border-white font-black uppercase text-sm hover:bg-yellow-300 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/korra-kiran-482998286/" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-cyan-400 text-black border-4 border-white font-black uppercase text-sm hover:bg-cyan-300 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:kirankorra831@gmail.com"
              className="px-4 py-2 bg-pink-400 text-black border-4 border-white font-black uppercase text-sm hover:bg-pink-300 transition-colors">
              Email
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm font-medium border-t-2 border-white pt-6">
          <p>© 2026 Korra Kiran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
