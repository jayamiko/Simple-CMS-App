import MenuLayout from "@/components/layout/MenuLayout";
import { notFound } from "next/navigation";

export default function DynamicPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  if (!params.slug) return notFound();

  const slugPath = "/" + params.slug.join("/");

  return <MenuLayout slug={slugPath} />;
}
