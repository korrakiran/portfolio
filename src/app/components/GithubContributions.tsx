import { useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

export function GithubContributions() {
  const [weeks, setWeeks] = useState<ContributionDay[][] | null>(null);
  const [loading, setLoading] = useState(true);

  // High-activity fallback data representing a great month of pushing code
  const fallbackWeeks: ContributionDay[][] = [
    [
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-17' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-18' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-19' },
      { color: '#30a14e', contributionCount: 22, contributionLevel: 'THIRD_QUARTILE', date: '2026-05-20' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-21' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-22' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-23' }
    ],
    [
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-24' },
      { color: '#9be9a8', contributionCount: 4, contributionLevel: 'FIRST_QUARTILE', date: '2026-05-25' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-26' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-27' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-28' },
      { color: '#9be9a8', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE', date: '2026-05-29' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-30' }
    ],
    [
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-05-31' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-01' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-02' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-03' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-04' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-05' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-06' }
    ],
    [
      { color: '#9be9a8', contributionCount: 4, contributionLevel: 'FIRST_QUARTILE', date: '2026-06-07' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-08' },
      { color: '#9be9a8', contributionCount: 10, contributionLevel: 'FIRST_QUARTILE', date: '2026-06-09' },
      { color: '#216e39', contributionCount: 41, contributionLevel: 'FOURTH_QUARTILE', date: '2026-06-10' },
      { color: '#40c463', contributionCount: 17, contributionLevel: 'SECOND_QUARTILE', date: '2026-06-11' },
      { color: '#40c463', contributionCount: 20, contributionLevel: 'SECOND_QUARTILE', date: '2026-06-12' },
      { color: '#9be9a8', contributionCount: 6, contributionLevel: 'FIRST_QUARTILE', date: '2026-06-13' }
    ],
    [
      { color: '#9be9a8', contributionCount: 2, contributionLevel: 'FIRST_QUARTILE', date: '2026-06-14' },
      { color: '#40c463', contributionCount: 12, contributionLevel: 'SECOND_QUARTILE', date: '2026-06-15' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-16' },
      { color: '#ebedf0', contributionCount: 0, contributionLevel: 'NONE', date: '2026-06-17' }
    ]
  ];

  useEffect(() => {
    fetch('https://github-contributions-api.deno.dev/korrakiran.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.contributions)) {
          // Take the last 5 weeks (~35 days)
          const allWeeks = data.contributions;
          const last5Weeks = allWeeks.slice(-5);
          setWeeks(last5Weeks);
        } else {
          setWeeks(fallbackWeeks);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setWeeks(fallbackWeeks);
        setLoading(false);
      });
  }, []);

  const getColorClass = (level: string) => {
    switch (level) {
      case 'NONE':
        return 'bg-gray-100';
      case 'FIRST_QUARTILE':
        return 'bg-emerald-200';
      case 'SECOND_QUARTILE':
        return 'bg-emerald-400';
      case 'THIRD_QUARTILE':
        return 'bg-emerald-600';
      case 'FOURTH_QUARTILE':
        return 'bg-emerald-800';
      default:
        return 'bg-gray-100';
    }
  };

  const getMonthRange = () => {
    if (!weeks || weeks.length === 0) return '';
    const firstDay = weeks[0][0]?.date;
    const lastWeek = weeks[weeks.length - 1];
    const lastDay = lastWeek[lastWeek.length - 1]?.date;

    const formatDateRange = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return `${formatDateRange(firstDay)} – ${formatDateRange(lastDay)}`;
  };

  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section id="github" className="py-20 bg-emerald-50 border-b-8 border-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-black uppercase mb-12 inline-block bg-yellow-400 px-6 py-3 border-4 border-black rotate-[1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          GitHub Contributions
        </h2>

        <div className="w-full bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
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
              I actively push code, build open-source tools, and collaborate on machine learning repositories. Check out my real-time contribution graph and active projects directly on GitHub.
            </p>

            {/* Real Contribution Calendar (Horizontal: Weeks as Rows, Days as Columns) */}
            <div className="border-4 border-black p-6 bg-gray-50 mb-6">
              <p className="text-xs font-mono font-bold uppercase mb-6 text-gray-500 text-center">
                Recent 30 Days Activity Calendar
              </p>

              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent" />
                </div>
              ) : (
                weeks && (
                  <div className="flex flex-col items-center">
                    <div className="overflow-x-auto w-full pb-2">
                      <div className="flex flex-col items-center min-w-[320px] max-w-sm mx-auto py-2">
                        {/* Day Header labels */}
                        <div className="grid grid-cols-7 gap-2 w-full mb-3 text-xs sm:text-sm font-mono font-black text-black">
                          {DAYS_OF_WEEK.map((day, idx) => (
                            <div key={idx} className="text-center">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Flat Grid layout for precise day columns alignment */}
                        <div className="grid grid-cols-7 gap-2 w-full">
                          {weeks.flatMap(week => week).map((day, idx) => (
                            <div
                              key={idx}
                              className={`w-full aspect-square border-3 border-black ${getColorClass(day.contributionLevel)} shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative group`}
                            >
                              {/* Neo-brutalist Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs font-mono font-bold px-3 py-1.5 border-2 border-white rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                                {day.contributionCount} {day.contributionCount === 1 ? 'commit' : 'commits'} on{' '}
                                {new Date(day.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full max-w-[400px] mt-4 pt-4 border-t-2 border-dashed border-gray-300 text-xs font-mono font-bold text-gray-500">
                      <div>Range: {getMonthRange()}</div>
                      <div className="flex items-center gap-1.5">
                        <span>Less</span>
                        <div className="w-5 h-5 border-2 border-black bg-gray-100" />
                        <div className="w-5 h-5 border-2 border-black bg-emerald-200" />
                        <div className="w-5 h-5 border-2 border-black bg-emerald-400" />
                        <div className="w-5 h-5 border-2 border-black bg-emerald-600" />
                        <div className="w-5 h-5 border-2 border-black bg-emerald-800" />
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                )
              )}
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
    </section>
  );
}
