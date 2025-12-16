import React from 'react';
import { Crown } from 'lucide-react';

const StudentCard = ({ student, rank, type }) => {
    // Only show rank for Top 3
    const isTopRanker = rank <= 3;

    // Static colors for Top 3 (No hover changes)
    const getRankStyle = (r) => {
        if (r === 1) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
        if (r === 2) return "bg-slate-400/20 text-slate-300 border-slate-400/50";
        if (r === 3) return "bg-orange-700/20 text-orange-600 border-orange-700/50";
        return "";
    };

    return (
        <div className="group relative bg-brand-card border border-brand-border hover:border-brand-orange/50 transition-all duration-300 rounded-xl overflow-hidden snap-start flex flex-col
        min-w-[85%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] shadow-lg hover:shadow-xl hover:-translate-y-1">

            {/* Top Section: Identity */}
            <div className="p-6 flex flex-col items-center bg-brand-dark/30 relative min-h-[180px]">

                {/* Rank Tag: Only for Top 3 & Non-interactable colors */}
                {isTopRanker && (
                    <div className={`absolute top-0 left-0 text-[10px] font-mono font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest border-r border-b ${getRankStyle(rank)} flex items-center gap-2`}>
                        <Crown size={12} strokeWidth={2.5} />
                        Rank #{rank.toString().padStart(2, '0')}
                    </div>
                )}

                {/* Photo: Rounded Square */}
                <div className="w-28 h-28 mb-4 relative mt-2">
                    <img
                        src={student.photo || "/assets/assets/student-sample.png"}
                        alt={student.name}
                        // Added 'object-top' to fix the cutting issue
                        className="w-full h-full object-cover object-top rounded-2xl border-2 border-brand-border group-hover:border-brand-orange transition-colors shadow-md"
                        onError={(e) => { e.target.src = "/assets/assets/student-sample.png" }}
                    />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white text-center leading-tight mb-1 group-hover:text-brand-orange transition-colors line-clamp-1 w-full" title={student.name}>
                    {student.name}
                </h3>
            </div>

            {/* Divider Line */}
            <div className="h-px w-full bg-brand-border/50"></div>

            {/* Bottom Section: Performance Stats & ID */}
            <div className="bg-brand-card p-4 flex items-center justify-between">
                {/* Marks - Orange */}
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-brand-text font-bold">Score</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-brand-orange font-mono">
                            {type === 'CA' ? student.marks : student.gainedMarks}
                        </span>
                        <span className="text-xs text-brand-text/50 font-medium">
                            / {type === 'CA' ? student.max : student.maxMarks}
                        </span>
                    </div>
                </div>

                {/* HT NO */}
                {student.htno && (
                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-brand-text font-bold block">HT.NO</span>
                        <span className="text-sm font-mono text-white/80 tracking-wider">
                            {student.htno}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCard;