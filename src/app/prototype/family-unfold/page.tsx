import type { Metadata } from "next";
import { FamilyUnfoldPrototype } from "./FamilyUnfoldPrototype";

export const metadata: Metadata = {
  title: "PROTOTYP – Modellfamilie entfaltet sich",
  robots: { index: false, follow: false },
};

export default function FamilyUnfoldPrototypePage() {
  return <FamilyUnfoldPrototype />;
}
