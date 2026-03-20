// src/components/ScriptCommand.jsx

'use client'

import { useId, useState, useEffect } from 'react'

import { Button } from '@/components/Button'

const SNIPPETS = {
    unix: 'curl -sSL https://L1.run/noderunr | bash',
    windows: 'irm https://L1.run/windows | iex',
}

const LABELS = {
    unix: '↑ paste into your Linux, macOS or WSL terminal ↑',
    windows: '↑ paste into your Windows PowerShell terminal ↑',
}

export function ScriptCommand() {
    let id = useId()
    const [platform, setPlatform] = useState('unix')

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            const ua = navigator.userAgent || ''
            const uaPlatform = navigator.platform || ''
            const isWindows =
                uaPlatform.startsWith('Win') ||
                /Windows/.test(ua)
            if (isWindows) {
                setPlatform('windows')
            }
        }
    }, [])

    const snippet = SNIPPETS[platform]
    const label = LABELS[platform]

    const copyToClipboard = () => {
        /* Copy to clipboard. */
        navigator.clipboard.writeText(snippet)
            .then(() => console.log('Remote script command copied to clipboard!'))
            .catch((error) => console.error('Error copying to clipboard:', error))

        /* Notify the user. */
        alert(`
The setup command has been saved to your clipboard.
Now paste into your terminal (${platform === 'windows' ? 'Ctrl + V' : 'Ctrl + v'}) and go!`)
    }

    return (
        <>
            <div className="relative isolate mt-8 flex items-center pr-1">
                <input
                    id={id}
                    value={snippet}
                    readOnly
                    className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-xs text-amber-200 tracking-wider focus:outline-none sm:text-[0.85rem]"
                />

                <Button onClick={copyToClipboard} arrow>
                    Copy
                </Button>

                <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
                <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
            </div>

            <small className="pl-3 pt-2 text-xs text-slate-100 tracking-wider">
                {label}
            </small>
        </>
    )
}
