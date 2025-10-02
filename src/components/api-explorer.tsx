"use client";

import SwaggerUI from "swagger-ui-react";

export function ApiExplorer() {
  return (
    <div className="swagger-container">
       <SwaggerUI url="/openapi.json" />
    </div>
  );
}
