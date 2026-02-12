import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

function extractText(node: Element | Text): string {
  if (node.type === "text") return node.value;
  if ("children" in node) {
    return (node.children as (Element | Text)[]).map(extractText).join("");
  }
  return "";
}

export function rehypeCodeWrapper() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "figure" &&
        node.properties &&
        "dataRehypePrettyCodeFigure" in node.properties
      ) {
        let rawText = "";
        visit(node, "element", (child) => {
          if (child.tagName === "code") {
            rawText = extractText(child);
          }
        });

        const wrapper: Element = {
          type: "element",
          tagName: "codeblock",
          properties: { raw: rawText },
          children: [node],
        };

        if (parent && typeof index === "number") {
          (parent.children as Element[])[index] = wrapper;
        }
      }
    });
  };
}
