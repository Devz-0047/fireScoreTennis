import { rankings } from '../data/rankings';
import RankingsTable from '../components/rankings/RankingsTable';

export default function RankingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ATP Rankings</h1>
                <span className="text-sm text-slate-500">Last updated: Dec 12, 2025</span>
            </div>
            <RankingsTable players={rankings} />
        </div>
    );
}
