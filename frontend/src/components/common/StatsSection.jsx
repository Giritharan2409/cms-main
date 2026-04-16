import KpiCard from '../KpiCard';
import KpiGrid from '../KpiGrid';

export default function StatsSection({ stats }) {
  const colorSchemes = ['blue', 'green', 'emerald', 'red'];
  
  return (
    <KpiGrid>
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
