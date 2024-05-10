import { useCallback, useRef } from "react";

export function useIntersectionObserver(callback, deps) {
  const observer = useRef(null);

  const ref = useCallback(
    function (el) {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback();
        });

        if (el) observer.current.observe(el);
      }
    },
    [deps, callback]
  );

  return ref;
}
