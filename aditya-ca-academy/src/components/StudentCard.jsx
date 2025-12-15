import React from 'react';
import { Medal } from 'lucide-react';

const StudentCard = ({ student, rank, type }) => {

    // Helper to determine medal color and style
    const getMedal = (r) => {
        if (r === 1) return { color: "text-yellow-500", fill: "fill-yellow-500/20", label: "Gold" };
        if (r === 2) return { color: "text-slate-400", fill: "fill-slate-400/20", label: "Silver" };
        if (r === 3) return { color: "text-amber-700", fill: "fill-amber-700/20", label: "Bronze" };
        return null;
    };

    const medal = getMedal(rank);

    return (
        <div className="student-card group">

            {/* Minimal Medal Badge for Top 3 */}
            {medal && (
                <div className="absolute top-3 right-3 z-10 flex flex-col items-center">
                    <div className="bg-brand-dark/80 backdrop-blur-sm p-1.5 rounded-full border border-white/10 shadow-lg">
                        <Medal size={20} className={`${medal.color} ${medal.fill}`} />
                    </div>
                    {/* Optional: Tiny rank number below medal for clarity */}
                    <span className={`text-[10px] font-bold mt-1 ${medal.color}`}>#{rank}</span>
                </div>
            )}

            {/* Profile Photo */}
            <div className="w-28 h-28 mb-4">
                <img
                    src={student.photo || "/assets/assets/student-sample.png"}
                    alt={student.name}
                    className="w-full h-full object-cover rounded-full border-4 border-brand-dark shadow-lg"
                    onError={(e) => { e.target.src = "/assets/assets/student-sample.png" }}
                />
            </div>

            {/* Student Details */}
            <div className="w-full">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-orange transition-colors" title={student.name}>
                    {student.name}
                </h3>

                {/* Marks */}
                <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-extrabold text-brand-orange">
                        {type === 'CA' ? student.marks : student.gainedMarks}
                    </span>
                    <span className="text-sm text-brand-text font-medium">
                        / {type === 'CA' ? student.max : student.maxMarks}
                    </span>
                </div>

                {/* HT NO Label */}
                {student.htno && (
                    <div className="mt-2 pt-3 border-t border-brand-border w-full">
                        <p
                            className="text-xs font-mono text-brand-text bg-black/20 py-1 px-3 rounded inline-block"
                            title="Hall Ticket Number"
                        >
                            <span className="font-bold text-slate-500">HT NO:</span> {student.htno}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCard;