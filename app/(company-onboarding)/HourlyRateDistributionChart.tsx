// components/company-onboarding/HourlyRateDistributionChart.tsx
"use client";
import React from "react";

interface BarChartProps {
  data: { label: string; value: number; highlight?: boolean }[];
  width?: number;
  height?: number;
  barColor?: string;
  highlightBarColor?: string;
  labelColor?: string;
}

const HourlyRateDistributionChart: React.FC<BarChartProps> = ({
  data,
  width = 300,
  height = 120,
  barColor = "hsl(var(--muted))", // Using muted for default bars
  highlightBarColor = "hsl(var(--primary))", // Primary for highlighted bars
  labelColor = "hsl(var(--muted-foreground))",
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center text-sm text-muted-foreground bg-muted/30 rounded-md"
      >
        No data for chart.
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const barWidth = width / data.length;
  const barPadding = Math.max(1, barWidth * 0.25); // 25% padding
  const actualBarWidth = barWidth - barPadding;
  const labelYOffset = 20;
  const chartHeight = height - labelYOffset;

  return (
    <div className="w-full overflow-x-auto">
      {" "}
      {/* Added for responsiveness if many bars */}
      <svg
        width={width}
        height={height}
        aria-label="Hourly rate distribution chart"
        className="block mx-auto"
      >
        <g>
          {data.map((d, i) => {
            const barHeight =
              maxValue > 0 ? (d.value / maxValue) * chartHeight : 0;
            const x = i * barWidth + barPadding / 2;
            const y = chartHeight - barHeight;
            const color = d.highlight ? highlightBarColor : barColor;

            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={y}
                  width={actualBarWidth}
                  height={Math.max(0, barHeight)}
                  fill={color}
                  rx={actualBarWidth > 4 ? 2 : 0} // Slightly rounded bars if wide enough
                  ry={actualBarWidth > 4 ? 2 : 0}
                />
                {(data.length <= 12 ||
                  i % Math.max(1, Math.floor(data.length / 6)) === 0 ||
                  i === data.length - 1) && (
                  <text
                    x={x + actualBarWidth / 2}
                    y={chartHeight + 15}
                    textAnchor="middle"
                    fontSize="10px"
                    fill={labelColor}
                    className="select-none"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
        <line
          x1="0"
          y1={chartHeight + 0.5}
          x2={width}
          y2={chartHeight + 0.5}
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default HourlyRateDistributionChart;
