import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Grid, List } from 'lucide-react';

interface PaginatedItem {
  id: string;
  content: React.ReactNode;
  title: string;
}

interface PaginatedContentProps {
  items: PaginatedItem[];
  itemsPerPage?: number;
  showViewToggle?: boolean;
  ariaLabel: string;
  loadingMessage?: string;
  emptyMessage?: string;
  className?: string;
}

const PaginatedContent: React.FC<PaginatedContentProps> = ({
  items,
  itemsPerPage = 6,
  showViewToggle = true,
  ariaLabel,
  loadingMessage = "Loading content...",
  emptyMessage = "No items to display",
  className = ""
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Announce page changes to screen readers
  useEffect(() => {
    if (announcementRef.current) {
      announcementRef.current.textContent = 
        `Page ${currentPage} of ${totalPages}. Showing ${currentItems.length} items.`;
    }
  }, [currentPage, totalPages, currentItems.length]);

  // Simulate loading for page changes (optional)
  const handlePageChange = async (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    
    setIsLoading(true);
    
    // Simulate network delay (remove in real implementation)
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setCurrentPage(page);
    setIsLoading(false);
    
    // Focus management - scroll to top of content
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      contentRef.current.focus();
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range if we're near the beginning or end
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if there's a gap
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis if there's a gap
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleKeyDown = (e: React.KeyboardEvent, page: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePageChange(page);
    }
  };

  if (items.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Screen reader announcements */}
      <div 
        ref={announcementRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* View mode toggle */}
      {showViewToggle && (
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} items
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content area */}
      <div
        ref={contentRef}
        role="region"
        aria-label={ariaLabel}
        aria-busy={isLoading}
        tabIndex={-1}
        className="focus:outline-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">{loadingMessage}</span>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-opacity duration-200 ${
                  viewMode === 'list' 
                    ? 'border border-gray-700 rounded-lg p-4 hover:border-gray-600' 
                    : ''
                }`}
                role="article"
                aria-label={item.title}
              >
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav 
          role="navigation" 
          aria-label="Pagination navigation"
          className="flex items-center justify-center space-x-2 mt-8"
        >
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {generatePageNumbers().map((page, index) => {
              if (typeof page === 'string') {
                return (
                  <span
                    key={page}
                    className="px-3 py-2 text-gray-400"
                    aria-hidden="true"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  onKeyDown={(e) => handleKeyDown(e, page)}
                  disabled={isLoading}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to next page"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </nav>
      )}

      {/* Page info for screen readers */}
      <div className="sr-only" aria-live="polite">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default PaginatedContent;