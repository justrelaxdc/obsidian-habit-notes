/**
 * Utility functions for DOM manipulation
 */

/**
 * Creates multiple elements in a batch using DocumentFragment
 * 
 * @param factory - Function that creates elements in the fragment
 * @returns DocumentFragment with created elements
 */
export function createElementsBatch(factory: (fragment: DocumentFragment) => void): DocumentFragment {
  const fragment = document.createDocumentFragment();
  factory(fragment);
  return fragment;
}

/**
 * Debounces a function call
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func.apply(context, args);
      timeout = null;
    }, wait);
  };
}

/**
 * Throttles a function call
 * 
 * @param func - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Saves scroll position of an element
 * 
 * @param element - Element to save scroll position from
 * @returns Scroll position object
 */
export function saveScrollPosition(element: HTMLElement): { top: number; left: number } {
  return {
    top: element.scrollTop,
    left: element.scrollLeft,
  };
}

/**
 * Restores scroll position of an element
 * 
 * @param element - Element to restore scroll position to
 * @param position - Scroll position object
 */
export function restoreScrollPosition(
  element: HTMLElement,
  position: { top: number; left: number }
): void {
  if (element && element.isConnected) {
    try {
      element.scrollTop = position.top;
      element.scrollLeft = position.left;
    } catch (e) {
      // Ignore errors if element is no longer accessible
    }
  }
}

/**
 * Finds all scrollable containers within an element
 * 
 * @param root - Root element to search from
 * @returns Map of elements to their scroll positions
 */
export function findScrollableContainers(root: HTMLElement): Map<HTMLElement, { top: number; left: number }> {
  const scrollPositions = new Map<HTMLElement, { top: number; left: number }>();
  
  const checkScrollable = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    if (
      style.overflow === 'auto' ||
      style.overflow === 'scroll' ||
      style.overflowY === 'auto' ||
      style.overflowY === 'scroll' ||
      style.overflowX === 'auto' ||
      style.overflowX === 'scroll'
    ) {
      scrollPositions.set(el, saveScrollPosition(el));
    }
  };
  
  // Check root element
  checkScrollable(root);
  
  // Check all descendants
  const allElements = root.querySelectorAll('*');
  for (const el of Array.from(allElements) as HTMLElement[]) {
    checkScrollable(el);
  }
  
  return scrollPositions;
}

