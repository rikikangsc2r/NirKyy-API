"use client";

import SwaggerUI from "swagger-ui-react";

export function ApiExplorer() {
  return (
    <div className="swagger-container">
       <SwaggerUI 
        url="/openapi.json" 
        docExpansion="list"
        filter={true}
        tagsSorter="alpha"
        operationsSorter="alpha"
        />
    </div>
  );
}
