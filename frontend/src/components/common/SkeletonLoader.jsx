import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-slate-100 border border-slate-200/50 rounded-xl p-4 animate-pulse flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-200 rounded-lg flex-shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-16" />
        <div className="h-5 bg-slate-200 rounded w-24" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 animate-pulse space-y-4">
      {/* Header bar placeholder */}
      <div className="h-8 bg-slate-100 rounded w-full mb-6" />
      
      {/* Table Rows */}
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="flex gap-4 py-3 border-b border-slate-50 last:border-0">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div 
                key={cIdx} 
                className="h-4 bg-slate-100 rounded" 
                style={{ flex: cIdx === 0 ? 2 : 1 }} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 h-64 space-y-4">
          <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-5/6" />
          <div className="h-4 bg-slate-100 rounded w-4/5" />
        </div>
        <div className="bg-slate-50 rounded-xl p-6 h-64 space-y-4">
          <div className="h-5 bg-slate-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
