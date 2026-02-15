import React from "react";
import { AgCharts } from "ag-charts-react";
import {
    AnimationModule,
    ContextMenuModule,
    LegendModule,
    ModuleRegistry,
    CategoryAxisModule,
    NumberAxisModule,
    BarSeriesModule,
} from "ag-charts-enterprise";

ModuleRegistry.registerModules([
    AnimationModule,
    LegendModule,
    NumberAxisModule,
    CategoryAxisModule,
    BarSeriesModule,
    ContextMenuModule,
]);

const AminoAcidDistributionChart = ({ codonData }) => {
    const options = {
        title: {
            text: "Amino Acid Frequency",
            color: "white",
        },
        background: {
            fill: "#141623",
        },
        theme: {
            overrides: {
                bar: {
                    axes: {
                        category: {
                            label: { color: "white" },
                            title: { color: "white" },
                        },
                        number: {
                            label: { color: "white" },
                            title: { color: "white" },
                        },
                    },
                    legend: {
                        item: {
                            label: { color: "white" },
                        },
                    },
                },
            },
        },
        data: codonData,
        series: [
            {
                type: "bar",
                xKey: "codon",
                yKey: "count",
                yName: "Count",
            },
        ],
        axes: {
            x: {
                type: "category",
                position: "bottom",
                title: { text: "Amino Acids" },
            },
            y: {
                type: "number",
                position: "left",
                title: { text: "Count" },
            },
        },
    };

    return <div className='bar-chart'><AgCharts options={options} /></div>;
};

export default AminoAcidDistributionChart;