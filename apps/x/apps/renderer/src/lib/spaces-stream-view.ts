import { useSyncExternalStore } from 'react'

// How the stream shows threads (2026-10-25, the threads discussion in Main):
// 'threads' is the stream of roots with reply chips, as it always was;
// 'inline' shows every reply in time order, each naming its thread, the way
// Discord shows replies. A view, not a structure: threads are unchanged. The
// reader's choice, kept on this device for every space.

export type StreamView = 'threads' | 'inline'

const STORAGE_KEY = 'spaces:streamView'
const listeners = new Set<() => void>()

function read(): StreamView {
    try {
        return window.localStorage.getItem(STORAGE_KEY) === 'inline' ? 'inline' : 'threads'
    } catch {
        return 'threads'
    }
}

let view: StreamView | null = null

export function getStreamView(): StreamView {
    if (view === null) view = read()
    return view
}

export function setStreamView(next: StreamView): void {
    if (next === getStreamView()) return
    view = next
    try {
        if (next === 'threads') window.localStorage.removeItem(STORAGE_KEY)
        else window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
        // Quota/private mode: the choice just does not persist.
    }
    for (const listener of listeners) listener()
}

export function subscribeStreamView(listener: () => void): () => void {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}

export function useStreamView(): StreamView {
    return useSyncExternalStore(subscribeStreamView, getStreamView)
}
