import { Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Vypar — WhatsApp ERP',
      label: '🚀 Production',
      description: 'A full-stack ERP system for small Indian retailers using WhatsApp as the interface. Supports 20+ regional languages via Sarvam AI NLP — enabling inventory management and auto-generated sales reports through voice or text, reducing manual effort by ~80%.',
      color: 'bg-yellow-400',
      tags: ['Python', 'Sarvam AI', 'NLP', 'LangGraph', 'WhatsApp'],
      github: 'https://github.com/korrakiran/Vyapaar_Backend',
    },
    {
      title: 'Smart Classroom',
      label: '🔒 Federated Learning',
      description: 'A privacy-preserving federated learning system enabling multiple schools to collaboratively train a topic-difficulty model across 16 subjects and 6 grade levels — without sharing raw student data. Features FedAvg aggregation via Flask REST API, reducing data privacy risk by 100%.',
      color: 'bg-cyan-400',
      tags: ['Federated Learning', 'Flask', 'FedAvg', 'Python', 'AI Dashboard'],
      github: 'https://github.com/korrakiran/smart_classroom',
    },
    {
      title: 'Private Cloud Server',
      label: '☁️ Self-Hosted',
      description: 'Configured a headless Mac M1 as a private cloud server using Docker, Nextcloud for file management, and Tailscale VPN for zero-trust remote access — achieving 100% uptime with zero monthly cloud cost vs Google Drive or Dropbox.',
      color: 'bg-pink-400',
      tags: ['Docker', 'Nextcloud', 'Tailscale', 'Self-hosted', 'DevOps'],
      github: null,
    },
    {
      title: 'Celebrity Face Recognition',
      label: '🧠 Deep Learning',
      description: 'A deep learning model for celebrity face recognition using CNNs, achieving high accuracy across a diverse dataset of public figures.',
      color: 'bg-lime-300',
      tags: ['Deep Learning', 'CNN', 'OpenCV', 'Python'],
      github: 'https://github.com/korrakiran/celebrity_face_recognition',
    },
    {
      title: 'Other ML Projects',
      label: '📊 ML & DL',
      description: 'A collection of ML/DL projects including real-time fingertip color detection with TTS feedback (OpenCV, MediaPipe, gTTS), heart attack risk prediction (Scikit-learn, XGBoost), and various classification and regression models with thorough EDA pipelines.',
      color: 'bg-purple-400',
      tags: ['Scikit-learn', 'XGBoost', 'OpenCV', 'MediaPipe', 'Pandas'],
      github: 'https://github.com/korrakiran',
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
                    <span key={tagIndex} className="px-3 py-1 border-2 border-black font-bold text-sm bg-white">
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
