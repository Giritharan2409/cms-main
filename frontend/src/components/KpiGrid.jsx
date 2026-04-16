/**
 * KpiGrid Component
 * Wrapper for standardized KPI card grid layout
 * 
 * Ensures consistent:
 * - Grid columns (4 on desktop, 2 on tablet, 1 on mobile)
 * - Gap spacing
 * - Responsive behavior
 */

export default function KpiGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ${className}`}>
      {children}
    </div>
  );
}
