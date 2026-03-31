import { Button } from '#/components/ui/button';

const STATUSES = ['', 'pending', 'in_progress', 'done', 'cancelled'] as const;

interface StatusFilterProps {
  current: string;
  onChange: (status: string) => void;
}

export function StatusFilter({ current, onChange }: StatusFilterProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {STATUSES.map((s) => (
        <Button
          key={s}
          variant={current === s ? 'default' : 'outline'}
          onClick={() => onChange(s)}
        >
          {s || 'All'}
        </Button>
      ))}
    </div>
  );
}
