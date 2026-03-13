import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['About', 'Projects', 'Skills', 'Contact'];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            <span className="bg-yellow-400 px-3 py-1 border-4 border-black rotate-[-2deg] inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-6 py-3 border-4 border-black bg-white font-black uppercase text-sm hover:bg-cyan-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 border-4 border-black bg-pink-400 hover:bg-pink-500 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 border-4 border-black bg-white font-black uppercase text-sm hover:bg-cyan-300 transition-colors text-center"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
