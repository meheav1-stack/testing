'use client';

import { FlaskConical } from 'lucide-react';

export function DemoDataBadge({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: 'text-xs px-2 py-0.5 gap-1',
    default: 'text-xs px-2.5 py-1 gap-1.5',
    large: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md border-2 border-dashed border-demo-border bg-demo-bg text-demo-text ${sizes[size]}`}
      title="This record uses seeded demonstration data — not sourced from live council systems"
    >
      <FlaskConical className={size === 'small' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      DEMO DATA
    </span>
  );
}

export function DemoDataBanner() {
  return (
    <div className="bg-demo-bg border-b-2 border-demo-border px-4 py-2 text-center">
      <p className="text-demo-text text-xs font-mono font-medium flex items-center justify-center gap-2">
        <FlaskConical className="w-3.5 h-3.5" />
        PILOT DEMONSTRATION — All data shown is seeded sample data, not sourced from live council systems
        <FlaskConical className="w-3.5 h-3.5" />
      </p>
    </div>
  );
}
