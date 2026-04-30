import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  cloneSiteContent,
  normalizeSiteContent,
  siteContentStorageKey,
  type SiteContent,
} from "@/lib/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  setContent: Dispatch<SetStateAction<SiteContent>>;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const loadInitialContent = () => {
  if (typeof window === "undefined") {
    return cloneSiteContent();
  }

  const saved = window.localStorage.getItem(siteContentStorageKey);
  if (!saved) {
    return cloneSiteContent();
  }

  try {
    return normalizeSiteContent(JSON.parse(saved));
  } catch {
    return cloneSiteContent();
  }
};

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(loadInitialContent);

  useEffect(() => {
    window.localStorage.setItem(siteContentStorageKey, JSON.stringify(content));
  }, [content]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      setContent,
      resetContent: () => setContent(cloneSiteContent()),
    }),
    [content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }

  return context;
};
