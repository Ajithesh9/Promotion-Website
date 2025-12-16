import React from 'react';
import { Crown } from 'lucide-react';

const StudentCard = ({ student, rank, type }) => {
    const isTopRanker = rank <= 3;

    // Calculate Percentage for the Progress Bar
    const marks = type === 'CA' ? student.marks : student.gainedMarks;
    const max = type === 'CA' ? student.max : student.maxMarks;
    const percentage = Math.round((marks / max) * 100);

    const getRankStyle = (r) => {
        if (r === 1) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
        if (r === 2) return "bg-slate-400/20 text-slate-300 border-slate-400/50";
        if (r === 3) return "bg-orange-700/20 text-orange-600 border-orange-700/50";
        return "";
    };

    return (
        <div className="group relative bg-surface border-2 border-border hover:border-primary/50 transition duration-300 rounded-2xl overflow-hidden snap-start flex flex-col
        /* CHANGED: Used calculated widths to fit exactly 4 cards on desktop */
        min-w-[85%] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1.25rem)] 
        shadow-xl hover:shadow-2xl hover:-translate-y-2 will-change-transform">

            {/* Top Section: Identity */}
            <div className="p-6 flex flex-col items-center bg-background/30 relative min-h-[260px]">

                {/* Rank Tag */}
                {isTopRanker && (
                    <div className={`absolute top-0 left-0 text-xs font-mono font-bold px-4 py-1.5 rounded-br-xl uppercase tracking-widest border-r border-b ${getRankStyle(rank)} flex items-center gap-2`}>
                        <Crown size={14} strokeWidth={2.5} />
                        Rank #{rank.toString().padStart(2, '0')}
                    </div>
                )}

                {/* Photo */}
                {/* Kept large photo as requested previously */}
                <div className="w-44 h-44 mb-4 relative mt-4 shadow-2xl rounded-full">
                    <img
                        src={student.photo || "/assets/assets/student-sample.png"}
                        alt={student.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top rounded-2xl border-2 border-border group-hover:border-primary transition-colors duration-300 shadow-lg"
                        onError={(e) => { e.target.src = "/assets/assets/student-sample.png" }}
                    />
                </div>

                {/* Name */}
                <h3 className="text-3xl font-extrabold text-white text-center leading-none mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 w-full tracking-tight" title={student.name}>
                    {student.name}
                </h3>
            </div>

            {/* Divider Line */}
            <div className="h-px w-full bg-border/50"></div>

            {/* Bottom Section: Performance Stats & ID/Progress */}
            <div className="bg-surface p-5 flex items-center justify-between mt-auto">
                {/* Left Side: Marks */}
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-muted font-bold mb-0.5">Score</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-primary font-mono tracking-tighter">
                            {marks}
                        </span>
                        <span className="text-xs text-muted/50 font-bold">
                            / {max}
                        </span>
                    </div>
                </div>

                {/* Right Side: HT NO (for CA) OR Vertical Progress Bar (for MEC/CEC) */}
                {student.htno ? (
                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-muted font-bold block mb-0.5">HT.NO</span>
                        <span className="text-base font-mono text-white/90 tracking-wider font-bold">
                            {student.htno}
                        </span>
                    </div>
                ) : (
                    // VERTICAL PROGRESS BAR for MEC/CEC
                    <div className="flex items-center gap-2">
                        {/* Percentage Label */}
                        <span className="text-base font-bold text-white/80 font-mono leading-none">
                            {percentage}%
                        </span>

                        {/* The Bar Container */}
                        <div className="h-8 w-2 bg-primary/20 rounded-full relative overflow-hidden flex items-end">
                            {/* The Filled Portion */}
                            <div
                                className="w-full bg-primary rounded-full transition-all duration-500"
                                style={{ height: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCard;