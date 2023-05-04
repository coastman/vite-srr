import type { Request } from 'express'
import { basename } from 'node:path'
import { createVueApp } from './main'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { renderSSRHead } from '@unhead/ssr'
import { Theme } from './composables/theme';

const createApp = (request: Request): any => {
  const app = createVueApp({
    appCreator: createSSRApp,
    theme: request.cookies.theme || Theme.Default
  })

  return app
}

function renderPreloadLinks(modules: any = [], manifest: any) {
  let links = ''
  const seen = new Set()
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else if (file.endsWith('.ttf')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/ttf">`
  } else if (file.endsWith('.svg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/svg+xml">`
  }

  return ''
}

const renderHTML = async (vueApp: any, url: string, manifest: any) => {
  const { app, router, pinia, theme, head } = vueApp
  const payload = await renderSSRHead(head);
  await router.push(url)
  await router.isReady()
  const ssrContext = {}
  // pinia.state.value.counter.count++;
  const html = await renderToString(app, ssrContext)
  const contextData = {
    store: pinia.state.value,
    theme: theme.theme.value
  }

  const script = `<script>window.__INITIAL_SSR_CONTEXT__ = ${JSON.stringify(contextData)}</script>`;
  const preloadLinks = renderPreloadLinks((ssrContext as any)?.modules, manifest);

  return {
    html,
    script,
    preloadLinks,
    payload
  }
}

export const renderApp = async (request: Request, manifest: any): Promise<any> => {
  const app = createApp(request);
  const { originalUrl: url } = request;
  const SUCCESS_STATUS = 200

  try {
    const rendered = await renderHTML(app, url, manifest)
    return {
      code: SUCCESS_STATUS,
      ...rendered
    }
  } catch (error: any) {
    console.log(error);
  }
}
