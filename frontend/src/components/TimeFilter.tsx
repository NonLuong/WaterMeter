import React from 'react';

interface TimeFilterProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  selectedView: string;
  onViewChange: (view: string) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const periods = [
    { value: 'today', label: 'วันนี้' },
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'year', label: 'ปีนี้' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">ช่วงเวลา</h3>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => onPeriodChange(period.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};