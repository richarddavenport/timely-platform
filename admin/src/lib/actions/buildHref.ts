import type { CostActiveTab } from "$lib/stores/costAdjustmentStore";

interface Params {
  id: string;
  activeTab: CostActiveTab;
  idType: "productId" | "costAdjustmentId";
}
export const buildHref = (
  node: HTMLAnchorElement,
  { id, activeTab, idType }: Params
): unknown => {
  const url = new URL(location.toString());
  url.searchParams.set("action", "edit");
  url.searchParams.set("modalOpen", "true");
  url.searchParams.set("activeTab", activeTab);
  url.searchParams.set(idType, id.toString());
  node.href = url.toString();
  return {};
};
