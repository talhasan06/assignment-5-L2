import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Override h1 rendering
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 mt-10 text-gray-900 dark:text-gray-50" {...props} />
          ),
          // Override h2 rendering
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-gray-50" {...props} />
          ),
          // Override h3 rendering
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-50" {...props} />
          ),
          // Override paragraph rendering
          p: ({ node, ...props }) => (
            <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          // Override link rendering
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium" {...props} target="_blank" rel="noopener noreferrer" />
          ),
          // Override code block rendering
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="rounded-md overflow-hidden mb-6">
                <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono border-b border-gray-700">
                  {match[1]}
                </div>
                <div className="overflow-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          // Override list rendering
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-4 text-gray-700 dark:text-gray-300" {...props} />
          ),
          // Override blockquote rendering
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400" {...props} />
          ),
          // Override table rendering
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300 dark:border-gray-700" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300" {...props} />
          ),
          // Override image rendering
          img: ({ node, ...props }) => (
            <img className="rounded-md max-w-full my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;