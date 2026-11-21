import { useEffect } from "react";

const BASE = "Sachin Chaudhary | MERN Stack Developer";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Sachin Chaudhary` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
}
