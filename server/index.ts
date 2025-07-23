import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";

// Simple logger function for production
const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Environment-specific setup
  if (process.env.NODE_ENV === "development") {
    // Development: setup Vite
    try {
      const { setupVite } = await import("./vite");
      await setupVite(app, server);
    } catch (error) {
      log("Vite setup failed, falling back to static files");
    }
  } else {
    // Production: serve static files
    const staticPath = path.join(process.cwd(), "client/dist");
    app.use(express.static(staticPath));
    
    // Serve index.html for all non-API routes (SPA routing)
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        res.status(404).json({ message: "API endpoint not found" });
      } else {
        res.sendFile(path.join(staticPath, "index.html"));
      }
    });
  }

  const port = parseInt(process.env.PORT || "5000");
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
