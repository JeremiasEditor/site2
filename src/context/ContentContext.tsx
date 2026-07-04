"use client";

import { createContext, useContext } from "react";
import { SiteContent, defaultContent } from "@/lib/content";

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
