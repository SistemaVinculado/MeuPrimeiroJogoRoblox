import React from 'react';

const RewardDay = ({ day }: { day: number }) => (
    <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-16 h-16 bg-[#1a4325] border-4 border-[#3a8e42]"></div>
        <span className="text-sm text-gray-300 mt-2">Dia {day}</span>
    </div>
);

const RewardConnector = () => (
    <div className="flex-1 h-4 bg-[#3a8e42] mt-6 mx-[-2px]"></div>
);

const DailyRewards = () => {
    const days = Array.from({ length: 8 }, (_, i) => i + 1);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1e1e1e] pixel-border">
            <div className="w-full max-w-5xl flex items-start justify-center px-8">
                 {days.map((day, index) => (
                    <React.Fragment key={day}>
                        <RewardDay day={day} />
                        {index < days.length - 1 && <RewardConnector />}
                    </React.Fragment>
                ))}
            </div>
            <p className="text-gray-500 text-lg mt-8">Daily Rewards are currently disabled.</p>
        </div>
    );
};

export default DailyRewards;
