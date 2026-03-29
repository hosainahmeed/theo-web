import { cn } from '@/lib/utils';

function Card({ className, header, headerContent, children }: { className?: string; header?: string; headerContent?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className={cn('border border-border rounded-2xl', className)}>
      {header && <div className="font-semibold border-b border-border p-4">{header}</div>}
      {headerContent && <div className="p-4">{headerContent}</div>}
      {children && <div className="p-4">{children}</div>}
    </div>
  )
}

export default Card