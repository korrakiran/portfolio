import { Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Vypar — WhatsApp ERP',
      label: '🚀 WhatsApp ERP',
      description: 'Full-stack ERP for Indian retailers via WhatsApp. 20+ regional language support using Sarvam AI. Voice/text-based inventory and sales reporting.',
      color: 'bg-yellow-400',
      tags: ['Python', 'LangGraph', 'Sarvam AI', 'FastAPI', 'MongoDB'],
      github: null,
    },
    {
      title: 'Supply Chain Saathi — B2B Reverse Auction',
      label: '💬 WhatsApp B2B',
      description: 'WhatsApp-native procurement agent for wholesale retail. Real-time wholesaler discovery and quote comparison using geospatial MongoDB queries.',
      color: 'bg-emerald-400',
      tags: ['FastAPI', 'LangGraph', 'Gemini 2.5 Flash', 'MongoDB'],
      github: null,
    },
    {
      title: 'ClarityAI Engine — Conversational BI',
      label: '📊 Conversational BI',
      description: 'Natural language to SQL. Imports spreadsheets → translates queries → streams visualizations with read-only guardrails.',
      color: 'bg-orange-400',
      tags: ['LangGraph', 'Sarvam AI', 'PostgreSQL', 'Flask', 'Apache ECharts'],
      github: null,
    },
    {
      title: 'Smart Classroom — Federated Learning',
      label: '🔒 Federated Learning',
      description: 'Multi-school collaborative ML without data sharing. FedAvg aggregation across 16 subjects, 6 grades.',
      color: 'bg-cyan-400',
      tags: ['Python', 'Flask', 'Federated Learning', 'Privacy-Preserving ML'],
      github: 'https://github.com/korrakiran/smart_classroom',
    },
    {
      title: 'Private Cloud Server',
      label: '☁️ Private Cloud',
      description: 'Headless Mac M1 setup: Docker, Nextcloud, Tailscale VPN. Zero-trust remote access, zero cloud cost.',
      color: 'bg-pink-400',
      tags: ['Docker', 'Nextcloud', 'Tailscale', 'DevOps'],
      github: null,
    },
    {
      title: 'Celebrity Face Recognition',
      label: '🧠 Deep Learning',
      description: 'CNN-based face recognition on diverse public figure datasets.',
      color: 'bg-lime-300',
      tags: ['Deep Learning', 'CNN', 'OpenCV', 'Python'],
      github: 'https://github.com/korrakiran/celebrity_face_recognition',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-lime-100 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12 inline-block bg-pink-400 px-6 py-3 border-4 border-black rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col"
            >
              <div className={`${project.color} border-b-4 border-black h-14 flex items-center px-6`}>
                <span className="font-black uppercase text-sm tracking-wide">{project.label}</span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className={`text-xl font-black uppercase mb-3 inline-block ${project.color} px-3 py-1 border-4 border-black`}>
                  {project.title}
                </h3>
                <p className="mb-4 font-medium text-base flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 border-2 border-black font-mono font-bold text-sm bg-white">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-black uppercase text-sm hover:bg-gray-100 transition-colors w-fit">
                    <Github size={16} />
                    Code
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border-4 border-black font-black uppercase text-sm text-gray-400 w-fit cursor-not-allowed">
                    <Github size={16} />
                    Private
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
