import type { ReactNode } from 'react'
import { MessagesSquare, Rows3 } from 'lucide-react'
import { setStreamView, useStreamView } from '@/lib/spaces-stream-view'
import { cn } from '@/lib/utils'

/**
 * Threads ⇄ Inline (2026-10-25, the threads discussion in Main): how the
 * stream shows replies. Threads keeps them behind reply chips; Inline shows
 * every reply in time order under its thread's name. Per device, all spaces.
 */
export function StreamViewToggle({ className }: { className?: string }) {
    const view = useStreamView()
    const option = (value: 'threads' | 'inline', label: string, hint: string, icon: ReactNode) => (
        <button type="button" aria-pressed={view === value} title={hint} onClick={() => setStreamView(value)}
            className={cn(
                'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] transition-colors',
                view === value ? 'bg-background font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-muted-foreground hover:text-foreground',
            )}>
            {icon}{label}
        </button>
    )
    return (
        <div role="group" aria-label="Show replies" className={cn('inline-flex shrink-0 rounded-lg bg-black/[0.05] p-0.5 [.dark_&]:bg-white/[0.06]', className)}>
            {option('threads', 'Threads', 'Replies stay in their threads', <MessagesSquare className="size-3.5" aria-hidden />)}
            {option('inline', 'Inline', 'Every reply shows in the stream, in time order', <Rows3 className="size-3.5" aria-hidden />)}
        </div>
    )
}
