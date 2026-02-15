import * as React from 'react';
import DonutChart from "react-donut-chart";
const NucleotideDistributionChart = ({ dnaBases }) => {
    const sortedBases = [...dnaBases].sort((a, b) => b.count - a.count);

    return (
        <div><DonutChart
            className="donutchart"
            innerRadius={0.6}
            outerRadius={0.9}
            legend={false}
            width={260}
            height={260}
            colors={["#4CAF50", "#2196F3", "#FF5722", "#FFC107"]}
            data={sortedBases.map(b => ({
                label: b.base,
                value: b.count
            }))}
            style={{ color: "white" }}
        /></div>
    );
};

export default NucleotideDistributionChart;
