"use client";

import SwaggerUI from "swagger-ui-react";
import { useLanguage } from "@/context/language-context";

export function ApiExplorer() {
  const { language } = useLanguage();
  const url = `/${language}/openapi.json`;

  return (
    <div className="swagger-container">
       <SwaggerUI 
        key={url}
        url={url} 
        docExpansion="list"
        filter={true}
        tagsSorter="alpha"
        operationsSorter="alpha"
        />
    </div>
  );
}
