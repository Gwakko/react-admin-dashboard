const STATUSES = ['', 'pending', 'in_progress', 'done', 'cancelled'] as const;

interface StatusFilterProps {
  current: string;
  onChange: (status: string) => void;
}

export function StatusFilter({ current, onChange }: StatusFilterProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          style={{ fontWeight: current === s ? 'bold' : 'normal' }}
        >
          {s || 'All'}
        </button>
      ))}
    </div>
  );
}
