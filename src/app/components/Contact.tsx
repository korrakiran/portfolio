import { Mail, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-yellow-100 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12 inline-block bg-lime-300 px-6 py-3 border-4 border-black rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase mb-6 bg-pink-400 inline-block px-4 py-2 border-4 border-black">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-400 border-4 border-black p-3"><Mail size={24} /></div>
                  <div>
                    <p className="font-black uppercase text-sm mb-1">Email</p>
                    <a href="mailto:kirankorra831@gmail.com" className="font-medium hover:underline">kirankorra831@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-pink-400 border-4 border-black p-3"><MapPin size={24} /></div>
                  <div>
                    <p className="font-black uppercase text-sm mb-1">Location</p>
                    <p className="font-medium">Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-400 border-4 border-black p-6 rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl font-black uppercase mb-2">Let's Build Something!</p>
              <p className="font-medium">
                Open to internships, collaborations, and interesting AI/ML projects.
                Whether it's federated learning, NLP, or a wild product idea — let's talk!
              </p>
            </div>
          </div>

          {/* Formspree Form */}
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <form
              action="https://formspree.io/f/mvzwrrad"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block font-black uppercase text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-medium"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-black uppercase text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-medium"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-black uppercase text-sm mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-medium resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-lime-300 border-4 border-black font-black uppercase hover:bg-lime-400 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
