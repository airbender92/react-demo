/**
 * Escape special characters in path so that react-router Route does not do any special teratment
 * 
 * @example
 * escapePath('/foo(bar)') => 'foo\(bar\)'
 */
export default (url: string) => url.replace(/(\(|\))/g, '\\$1');