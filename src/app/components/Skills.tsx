import { Brain, Code2, Cloud, Zap } from 'lucide-react';

export function Skills() {
  const skills = [
    {
      category: 'ML & Deep Learning',
      icon: Brain,
      color: 'bg-yellow-400',
      items: ['Scikit-learn', 'XGBoost', 'CNNs', 'Federated Learning (FedAvg)', 'Transfer Learning', 'NLP'],
    },
    {
      category: 'Languages & Data',
      icon: Code2,
      color: 'bg-pink-400',
      items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'REST APIs'],
    },
    {
      category: 'AI & Vision',
      icon: Zap,
      color: 'bg-cyan-400',
      items: ['OpenCV', 'MediaPipe', 'Sarvam AI', 'Gemini Flash (LLM)', 'Computer Vision', 'gTTS'],
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      color: 'bg-lime-300',
      items: ['AWS S3', 'Azure (Model Training)', 'MongoDB', 'Docker', 'Tailscale', 'Nextcloud'],
    },
  ];

  const awards = [
    { label: '🏆 Best Student', sub: 'Cybersecurity Hackathon', color: 'bg-yellow-300' },
    { label: '🥈 2nd Place', sub: 'Reskill Hackathon', color: 'bg-cyan-300' },
    { label: '🎯 Finalist', sub: 'Bizzhack Ideathon', color: 'bg-pink-300' },
  ];

  return (
    <section id="skills" className="py-20 bg-purple-100 border-b-8 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase mb-12 inline-block bg-cyan-400 px-6 py-3 border-4 border-black rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Skills
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index}
                className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className={`${skill.color} border-4 border-black w-16 h-16 flex items-center justify-center mb-4`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">
                  {skill.category}
                </h3>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="font-bold text-base">→ {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Awards & Achievements */}
        <div className="mt-16">
          <h3 className="text-3xl sm:text-4xl font-black uppercase mb-8 inline-block bg-yellow-400 px-6 py-3 border-4 border-black rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Awards & Achievements
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <div key={i} className={`${award.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                <p className="font-black text-2xl mb-2">{award.label}</p>
                <p className="font-bold text-base">{award.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
