import React from 'react';
import { Crown } from 'lucide-react';

const StudentCard = ({ student, rank, type }) => {
    const isTopRanker = rank <= 3;

    const getRankStyle = (r) => {
        if (r === 1) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
        if (r === 2) return "bg-slate-400/20 text-slate-300 border-slate-400/50";
        if (r === 3) return "bg-orange-700/20 text-orange-600 border-orange-700/50";
        return "";
    };

    return (
        // PERFORMANCE FIX: Changed transition-all to specific properties to reduce paint cost.
        // Removed transition-all, added hover transform logic.
        <div className="group relative bg-surface border border-border hover:border-primary/50 transition duration-300 rounded-xl overflow-hidden snap-start flex flex-col
        min-w-[85%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] shadow-lg hover:shadow-xl hover:-translate-y-1 will-change-transform">

            {/* Top Section: Identity */}
            <div className="p-6 flex flex-col items-center bg-background/30 relative min-h-[180px]">

                {/* Rank Tag */}
                {isTopRanker && (
                    <div className={`absolute top-0 left-0 text-[10px] font-mono font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest border-r border-b ${getRankStyle(rank)} flex items-center gap-2`}>
                        <Crown size={12} strokeWidth={2.5} />
                        Rank #{rank.toString().padStart(2, '0')}
                    </div>
                )}

                {/* Photo */}
                <div className="w-28 h-28 mb-4 relative mt-2">
                    {/* PERFORMANCE FIX: Added loading='lazy' and decoding='async' */}
                    <img
                        src={student.photo || "/assets/assets/student-sample.png"}
                        alt={student.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top rounded-2xl border-2 border-border group-hover:border-primary transition-colors duration-300 shadow-md"
                        onError={(e) => { e.target.src = "/assets/assets/student-sample.png" }}
                    />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white text-center leading-tight mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1 w-full" title={student.name}>
                    {student.name}
                </h3>
            </div>

            {/* Divider Line */}
            <div className="h-px w-full bg-border/50"></div>

            {/* Bottom Section: Performance Stats & ID */}
            <div className="bg-surface p-4 flex items-center justify-between">
                {/* Marks */}
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Score</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary font-mono">
                            {type === 'CA' ? student.marks : student.gainedMarks}
                        </span>
                        <span className="text-xs text-muted/50 font-medium">
                            / {type === 'CA' ? student.max : student.maxMarks}
                        </span>
                    </div>
                </div>

                {/* HT NO */}
                {student.htno && (
                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">HT.NO</span>
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