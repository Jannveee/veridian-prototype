'use client';

import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function CodeEditor({
  value = '',
  onChange,
  placeholder = 'Paste your JavaScript or Python code here...',
  isLoading = false,
}: CodeEditorProps) {
  const [language, setLanguage] = useState('javascript');

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange?.(newValue);
    }
  };

  // Detect language from code pattern
  const detectLanguage = (code: string) => {
    if (code.includes('import ') || code.includes('from ')) {
      setLanguage('python');
    } else if (code.includes('function ') || code.includes('=>')) {
      setLanguage('javascript');
    }
  };

  const handleChange = (newValue: string | undefined) => {
    if (newValue) {
      detectLanguage(newValue);
      handleEditorChange(newValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-xl overflow-hidden flex flex-col h-full border border-primary/20"
    >
      {/* Header */}
      <div className="border-b border-primary/20 px-4 py-3 bg-background/40 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Code Input
        </h3>
        <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">
          {language.toUpperCase()}
        </span>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-background/20">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-foreground/60">Loading editor...</p>
            </div>
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            language={language}
            value={value}
            onChange={handleChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              fontFamily: "'Fira Code', 'Courier New', monospace",
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              folding: true,
              renderLineHighlight: 'none',
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                useShadows: false,
              },
              bracketPairColorization: { enabled: true },
            }}
            beforeMount={(monaco) => {
              // Define custom theme
              monaco.editor.defineTheme('cyber-eco', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                  { token: 'comment', foreground: '666666', fontStyle: 'italic' },
                  { token: 'keyword', foreground: '39FF14' },
                  { token: 'string', foreground: '7EC850' },
                  { token: 'number', foreground: '39FF14' },
                  { token: 'variable', foreground: 'E8E8E8' },
                ],
                colors: {
                  'editor.background': '#0f0f0f',
                  'editor.foreground': '#e8e8e8',
                  'editor.lineNumbersBackground': '#0f0f0f',
                  'editor.lineNumberForeground': '#444444',
                  'editor.selectionBackground': '#39FF1433',
                  'editor.lineHighlightBackground': '#1a1a1a',
                  'editorCursor.foreground': '#39FF14',
                  'editorWhitespace.foreground': '#2a2a2a',
                },
              });
            }}
            onMount={(editor, monaco) => {
              monaco.editor.setTheme('cyber-eco');
              // Focus editor on mount
              editor.focus();
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
