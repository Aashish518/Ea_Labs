import React from 'react';
import Icon from '../../Icon';

// --- Reusable Icon Components ---
// These are simple SVG components to represent the icons in the cards.
const QualityIcon = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";

const TimeIcon = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";

const ConvenienceIcon = "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";

const PhoneIcon = "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"


// --- Data for the feature cards ---
const features = [
    {
        icon: <Icon path={QualityIcon} className="w-16 h-16 text-white" />
,
        title: 'Quality',
        description: 'Follows stringent multi-level QC and EQA programs.',
        gradient: 'from-purple-500 to-indigo-600',
    },
    {
        icon: <Icon path={TimeIcon} className="w-16 h-16 text-white" />,
        title: 'On-Time Services',
        description: 'Reliable sample collection & report TAT—same-day on select tests.',
        gradient: 'from-blue-500 to-teal-600',
    },
    {
        icon: <Icon path={ConvenienceIcon} className="w-16 h-16 text-white" />,
        title: 'Convenience',
        description: 'Home collection or visit our centres—whichever suits you.',
        gradient: 'from-green-500 to-emerald-600',
    },
    {
        icon: <Icon path={PhoneIcon} className="w-16 h-16 text-white" />,
        title: 'Expert Assistance',
        description: 'On-demand result explanation and doctor-on-call (on request).',
        gradient: 'from-slate-500 to-gray-600',
    }
];

/**
 * A reusable card component for the "Why book with us" section.
 * @param {{icon: JSX.Element, title: string, description: string, gradient: string}} props
 */
const FeatureCard = ({ icon, title, description, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl flex flex-col items-start text-left text-white shadow-lg h-full`}>
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
    </div>
);


/**
 * The main component for the "Why book tests with us?" section.
 */
export default function WhyUs() {
    return (
        <div className="w-full bg-gradient-to-r from-[#2c2a4a] to-[#3a3768] text-white py-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <div className="text-left mb-12 max-w-2xl">
                    <h2 className="text-4xl font-bold mb-4">Why book tests with us?</h2>
                    <p className="text-lg text-gray-300">
                        EA Labs delivers clinician-ready reports with consistent turnaround times—without compromising on quality.
                    </p>
                </div>

                {/* Grid of feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
