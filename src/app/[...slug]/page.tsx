import MenuLayout from "@/components/layout/MenuLayout";
import { notFound } from "next/navigation";

type Props = {
  params: { slug?: string[] };
};

export default function DynamicPage({ params }: Props) {
  if (!params.slug) return notFound();

  const slugPath: string = "/" + params.slug.join("/");

  return <MenuLayout slug={slugPath} />;
}
