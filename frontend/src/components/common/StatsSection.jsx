import KpiCard from '../KpiCard';
import KpiGrid from '../KpiGrid';

export default function StatsSection({ stats }) {
  const colorSchemes = ['blue', 'green', 'emerald', 'red', 'purple', 'orange', 'cyan', 'amber'];
  const gridCols = stats.length === 5 ? 'lg:grid-cols-5' : stats.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  
  return (
    <KpiGrid className={gridCols}>
      {stats.map((stat, index) => (
        <KpiCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          colorScheme={colorSchemes[index % colorSchemes.length]}
        />
      ))}
    </KpiGrid>
  );
}
