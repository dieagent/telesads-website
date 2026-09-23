/**
 * cobe v2 supports `onRender` at runtime but omits it from its published
 * types (Magic UI's snippet targets cobe 0.6.4, where it is declared).
 *
 * We stay on v2 because the Reach section needs `arcs` and `markerElevation`,
 * which 0.6.4 does not support. Augmenting the module here lets the Magic UI
 * component be used exactly as published, with no edits to its source.
 */
import "cobe";

declare module "cobe" {
  interface COBEOptions {
    onRender?: (state: Record<string, number>) => void;
  }
}
