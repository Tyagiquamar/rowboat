import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { getStreamView, setStreamView } from '@/lib/spaces-stream-view'
import { StreamViewToggle } from './stream-view-toggle'

afterEach(() => {
    cleanup()
    setStreamView('threads')
    window.localStorage.clear()
})

describe('stream view toggle (2026-10-25)', () => {
    it('starts on Threads, switches to Inline, and keeps the choice on this device', () => {
        render(<StreamViewToggle />)
        expect(screen.getByRole('button', { name: /Threads/ })).toHaveAttribute('aria-pressed', 'true')
        fireEvent.click(screen.getByRole('button', { name: /Inline/ }))
        expect(getStreamView()).toBe('inline')
        expect(screen.getByRole('button', { name: /Inline/ })).toHaveAttribute('aria-pressed', 'true')
        expect(window.localStorage.getItem('spaces:streamView')).toBe('inline')
        fireEvent.click(screen.getByRole('button', { name: /Threads/ }))
        expect(window.localStorage.getItem('spaces:streamView')).toBeNull()
    })
})
