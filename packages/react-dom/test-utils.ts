import { ElementType } from "shared/ReactElementTypes";

import { createRoot } from "./src/root";

export default function renderIntoDocument(element: ElementType) {
  const div = document.createElement("div");
  return createRoot(div).render(element);
}
