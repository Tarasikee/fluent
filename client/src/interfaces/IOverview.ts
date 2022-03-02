interface IOverviewItem {
    percent: number;
    compare: number;
    yesterday: number;
    isHigher: boolean;
}

type IOverviewKeys = 'gain' | 'orders';

export type IOverview = Record<IOverviewKeys, IOverviewItem>;
