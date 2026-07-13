interface Fetcher {
  fetch(input: Request): Promise<Response>;
}

interface D1Database {
  readonly __d1Brand?: unique symbol;
}

interface HTMLRewriterElement {
  getAttribute(name: string): string | null;
}

interface HTMLRewriterTextChunk {
  readonly text: string;
  readonly lastInTextNode: boolean;
}

interface HTMLRewriterHandlers {
  element?(element: HTMLRewriterElement): void | Promise<void>;
  text?(text: HTMLRewriterTextChunk): void | Promise<void>;
}

declare class HTMLRewriter {
  on(selector: string, handlers: HTMLRewriterHandlers): HTMLRewriter;
  transform(response: Response): Response;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
    [name: string]: unknown;
  };
}
