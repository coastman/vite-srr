import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { createServer, ModuleNode } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

const ROOT_PATH = process.cwd();
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const PRDO_CLIENT_PATH = path.join(DIST_PATH, 'client');
const isDev = process.env.NODE_ENV === 'development';
const PUBLIC_PATH = isDev ? path.join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH;
const PRDO_SERVER_PATH = path.join(DIST_PATH, 'server');

const collectCssUrls = (mods: Set<ModuleNode>, styles: Map<string, string>) => {
  for (const mod of mods) {
    if (mod.ssrModule && mod.file && mod.id) {
      const hasMod = mod.file.endsWith('.css') 
        || mod.file.endsWith('.less') 
        || /\?vue&type=style/.test(mod.id);

      if (hasMod) styles.set(mod.url, mod.ssrModule.default);
    }

    if (mod.importedModules.size > 0) collectCssUrls(mod.importedModules, styles);
  }
}

const createExpressApp = async () => {
  const manifest = !isDev
    ? JSON.parse(
        fs.readFileSync(path.resolve(PRDO_CLIENT_PATH, 'ssr-manifest.json'), 'utf-8'),
      )
    : {};
  const proxy = createProxyMiddleware({
    target: 'http://localhost:3008',
    changeOrigin: true,
  });
  const app = express();
  app.use(express.static(PUBLIC_PATH));
  app.use(cookieParser());
  app.use(compression());

  if (isDev) {
    const viteServer = await createServer({
      root: process.cwd(),
      logLevel: 'info',
      appType: 'custom',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    });

    app.use(viteServer.middlewares);

    app.use('/api', proxy);
    app.use('/static', proxy);

    app.use('*', async (request, response) => {
      const { renderApp } = await viteServer.ssrLoadModule('/src/ssr.ts');
      const matchedMods = viteServer.moduleGraph.getModulesByFile(path.resolve('src/ssr.ts'));
      const styles: Map<string, string> = new Map();
    
      if (matchedMods) collectCssUrls(matchedMods, styles);
      const cssLinkTags = [...styles.values()].map((style) => `<style class="vite-dev-ssr">${style}</style>`).join('\n');
      let template = fs.readFileSync(path.resolve(ROOT_PATH, 'template.html'), 'utf-8');
  
      try {
        const url = request.originalUrl;
        template = await viteServer.transformIndexHtml(url, template);
        const redered = await renderApp(request, manifest);
        const html = template
          .replace(/<title>[\s\S]*<\/title>/, '')
          .replace(`<html`, () => `<html ${redered.payload.htmlAttrs} `)
          .replace(`<!--app-html-->`, () => redered.html)
          .replace(`</body>`, () => `\n${redered.script}\n</body>`)
          .replace(`<!--styles-->`, () => cssLinkTags);

        response
          .status(redered.code)
          .set({ 'Content-Type': 'text/html' })
          .end(html);
      } catch (error) {
        console.log(error);
      }
    })
  } else {
    const template = fs.readFileSync(path.resolve(PRDO_CLIENT_PATH, 'template.html'), 'utf-8');
    const { renderApp } = await import(path.resolve(PRDO_SERVER_PATH, 'ssr.js'));

    app.use('/api', proxy);
    app.use('/static', proxy);

    app.use('*', async (request, response) => {
      try {
        const redered = await renderApp(request, manifest);
      
        const html = template
          .replace(/<title>[\s\S]*<\/title>/, '')
          .replace(`<html`, () => `<html ${redered.payload.htmlAttrs} `)
          .replace(`<!--preload-links-->`, redered.preloadLinks)
          .replace(`<!--app-html-->`, () => redered.html)
          .replace(`</body>`, () => `\n${redered.script}\n</body>`);

        response
          .status(redered.code)
          .set({ 'Content-Type': 'text/html' })
          .end(html);
      } catch (error) {
        console.log(error);
      }
    })
  }

  return app;
}

createExpressApp().then(app => {
  app.listen(6173, () => {
    console.log('http://localhost:6173');
  });
});
