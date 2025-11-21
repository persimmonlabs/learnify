import React from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';
import Text from '../atoms/Text';

/**
 * ContentPanel Component - Organism
 * Reading/textbook content display
 */

const ContentPanel = ({
  title,
  content,
  metadata,
  className,
  ...props
}) => {
  return (
    <div className={cn('max-w-4xl mx-auto', className)} {...props}>
      <Card variant="elevated" padding="xl">
        {/* Header */}
        {title && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-prism-blue-600">
              <BookOpen size={24} />
              <Text variant="label" className="text-prism-blue-600">
                Reading Material
              </Text>
            </div>
            <Text variant="display-md" as="h1" className="mb-4">
              {title}
            </Text>

            {metadata && (
              <div className="flex items-center gap-4 text-sm text-slate-500">
                {metadata.readTime && <span>{metadata.readTime} min read</span>}
                {metadata.author && (
                  <>
                    <span>•</span>
                    <span>By {metadata.author}</span>
                  </>
                )}
                {metadata.date && (
                  <>
                    <span>•</span>
                    <span>{metadata.date}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>
      </Card>
    </div>
  );
};

export default ContentPanel;
