import { useRef, useEffect } from 'react';

export default function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props...
  // ... for comparison next time this hook runs
  const previousProps = useRef() as any;

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      allKeys.forEach(key => {
        // if previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          }
        }
      });
      // if changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }
    previousProps.current = props;
  })
}