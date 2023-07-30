export interface Chart {
    label: string;
    order: number;
    gain: number;
}

export interface IAnalytics {
    averageBill: number;
    chart: Chart[];
}
