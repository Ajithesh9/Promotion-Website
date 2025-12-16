import React from 'react';

const StudentCard = ({ student, rank, type }) => {

    return (
        <div className="group relative bg-brand-card border border-brand-border p-6 rounded-lg flex flex-col items-center text-center transition-all duration-200 hover:border-brand-orange snap-start
        min-w-[85%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)]">

            {/* Simple Rank Tag (Top Right) */}
            <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-brand-dark border border-brand-border text-brand-text uppercase tracking-wider
                    ${rank === 1 ? 'text-yellow-500 border-yellow-500/30' : ''}
                    ${rank === 2 ? 'text-slate-300 border-slate-300/30' : ''}
                    ${rank === 3 ? 'text-orange-700 border-orange-700/30' : ''}
                `}>
                    Rank #{rank}
                </span>
            </div>

            {/* Clean Photo Layout */}
            <div className="mb-4 relative">
                <img
                    src={student.photo || "/assets/assets/student-sample.png"}
                    alt={student.name}
                    className="w-24 h-24 object-cover rounded-full border border-brand-border group-hover:border-brand-orange transition-colors"
                    onError={(e) => { e.target.src = "/assets/assets/student-sample.png" }}
                />
            </div>

            {/* Typography: Clear & Readable */}
            <div className="w-full space-y-2">
                <h3 className="text-lg font-bold text-white truncate px-2" title={student.name}>
                    {student.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-brand-orange">
                        {type === 'CA' ? student.marks : student.gainedMarks}
                    </span>
                    <span className="text-sm text-brand-text/60 font-medium">
                        / {type === 'CA' ? student.max : student.maxMarks}
                    </span>
                </div>

                {/* Subtle Hall Ticket Info */}
                {student.htno && (
                    <div className="pt-2">
                        <p className="text-xs font-mono text-brand-text/50">
                            HT: {student.htno}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCard;