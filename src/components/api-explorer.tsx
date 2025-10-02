"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
}

export function ApiExplorer() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const { toast } = useToast();

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/main/ping");
      
      const body = await res.json();
      const headers: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        headers[key] = value;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers,
        body,
      });

    } catch (error) {
      console.error("API execution error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch API response. Check the console for details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBg = (status: number) => {
    if (status >= 200 && status < 300) return "bg-[hsl(var(--status-success))]";
    if (status >= 400 && status < 500) return "bg-[hsl(var(--status-warning))]";
    if (status >= 500) return "bg-[hsl(var(--status-error))]";
    return "bg-muted";
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Badge className="text-base font-bold py-1 bg-[hsl(var(--status-success))] text-primary-foreground hover:bg-[hsl(var(--status-success))]">
            GET
          </Badge>
          <p className="font-code text-lg text-foreground font-medium">/api/main/ping</p>
        </div>
        <Button onClick={handleExecute} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Server className="mr-2 h-4 w-4" />
          )}
          Execute
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          A simple endpoint to check if the API is up and running. This endpoint is configured to allow all CORS origins.
        </p>
        
        {response && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 font-headline">Response</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-medium">Status:</span>
              <Badge className={`${getStatusBg(response.status)} text-primary-foreground hover:${getStatusBg(response.status)}`}>
                {response.status} {response.statusText}
              </Badge>
            </div>

            <Tabs defaultValue="body" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:w-[240px]">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent value="body">
                <CodeBlock code={JSON.stringify(response.body, null, 2)} lang="json" />
              </TabsContent>
              <TabsContent value="headers">
                 <CodeBlock code={JSON.stringify(response.headers, null, 2)} lang="json" />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
