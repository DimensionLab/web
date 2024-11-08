import { InlineMath, BlockMath } from 'react-katex';
import React from 'react';

type MathSegment = {
  type: 'text' | 'inline-math' | 'block-math';
  content: string;
};

export function renderMathInElement(text: string): React.ReactNode[] {
  const segments: MathSegment[] = [];
  let currentIndex = 0;

  // Regular expressions for matching inline and block math
  const mathRegex = /(\$\$[\s\S]+?\$\$)|(\$[\s\S]+?\$)/g;

  // Find all matches
  let match;
  while ((match = mathRegex.exec(text)) !== null) {
    // Add text before the math if there is any
    if (match.index > currentIndex) {
      segments.push({
        type: 'text',
        content: text.slice(currentIndex, match.index)
      });
    }

    // Determine if it's block math ($$..$$) or inline math ($...$)
    const isBlock = match[0].startsWith('$$');
    const mathContent = match[0].slice(isBlock ? 2 : 1, match[0].length - (isBlock ? 2 : 1));

    segments.push({
      type: isBlock ? 'block-math' : 'inline-math',
      content: mathContent
    });

    currentIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (currentIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(currentIndex)
    });
  }

  // Convert segments to React nodes
  return segments.map((segment, index) => {
    switch (segment.type) {
      case 'text':
        return <span key={index}>{segment.content}</span>;
      case 'inline-math':
        return <InlineMath key={index}>{segment.content}</InlineMath>;
      case 'block-math':
        return <BlockMath key={index}>{segment.content}</BlockMath>;
    }
  });
} 