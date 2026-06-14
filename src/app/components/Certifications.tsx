import { Award, Github, ExternalLink } from 'lucide-react';

export function Certifications() {
  const certifications = [
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI (Coursera)',
      date: '2025',
      color: 'bg-yellow-300',
      link: 'https://coursera.org',
    },
    {
      title: 'Fundamentals of Deep Learning',
      issuer: 'NVIDIA Deep Learning Institute',
      date: '2025',
      color: 'bg-cyan-300',
      link: 'https://www.nvidia.com/en-us/training/',
    },
    {
      title: 'Professional Machine Learning Engineer',
      issuer: 'Google Cloud (Candidate)',
      date: 'In Progress',
      color: 'bg-pink-300',
      link: 'https://cloud.google.com/certification',
    },
  ];

  // A mock list of green shades for the GitHub contribution grid
  const activityColors = [
    'bg-gray-100', 'bg-emerald-100', 'bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700',
    'bg-gray-100', 'bg-emerald-300', 'bg-emerald-100', 'bg-emerald-500', 'bg-emerald-100',
    'bg-emerald-500', 'bg-emerald-700', 'bg-gray-100', 'bg-emerald-300', 'bg-emerald-300',
    'bg-gray-100', 'bg-emerald-100', 'bg-emerald-500', 'bg-emerald-700', 'bg-emerald-300',
  ];

  return (
    <section id="certifications" className="py-20 bg-emerald-50 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Certifications Side */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase mb-8 inline-block bg-pink-400 px-6 py-3 border-4 border-black rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Certifications
            </h2>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex justify-between items-start"
                >
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs font-bold font-mono border-2 border-black ${cert.color} mb-3`}>
                      {cert.date}
                    </span>
                    <h3 className="text-xl font-black uppercase mb-1">{cert.title}</h3>
                    <p className="text-gray-700 font-bold font-mono text-sm">{cert.issuer}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-black hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Contributions Side */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase mb-8 inline-block bg-yellow-400 px-6 py-3 border-4 border-black rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              GitHub Contributions
            </h2>
            <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-300 border-4 border-black p-3">
                    <Github size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase">@korrakiran</h3>
                    <p className="text-gray-600 font-bold font-mono text-sm">Active Open Source Contributor</p>
                  </div>
                </div>
                
                <p className="text-lg font-medium mb-6">
                  I actively push code, build open-source tools, and collaborate on machine learning repositories. Check out my contribution graph and active projects directly on GitHub.
                </p>

                {/* Simulated Contribution Calendar */}
                <div className="border-4 border-black p-4 bg-gray-50 mb-6">
                  <p className="text-xs font-mono font-bold uppercase mb-2 text-gray-500">Recent Activity Matrix</p>
                  <div className="grid grid-cols-10 gap-2">
                    {activityColors.map((color, idx) => (
                      <div
                        key={idx}
                        className={`w-full aspect-square border-2 border-black ${color}`}
                        title="Contributions"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/korrakiran"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-lime-300 border-4 border-black font-black uppercase hover:bg-lime-400 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-center"
              >
                View GitHub Profile
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
