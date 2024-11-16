'use client'

import Editor from '@monaco-editor/react'

interface CodeViewerProps {
  content: string
  language?: string
}

export const CodeViewer = ({ content, language = 'plaintext' }: CodeViewerProps) => {
  return (
    <div className="h-full w-full bg-[#1E1E1E]">
      <Editor
        height="100%"
        language={language}
        value={content}
        theme="vs-dark"
        options={{
          fontSize: 13,
          lineHeight: 20,
          minimap: { enabled: false },
          lineNumbers: 'on',
          readOnly: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12 },
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          renderLineHighlight: 'line',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
        }}
      />
    </div>
  )
}
