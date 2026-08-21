import React from "react";
import {
  HeroBlock,
  TrustBarBlock,
  FeaturesGridBlock,
  SocialProofBlock,
  HowItWorksBlock,
  PricingBlock,
  FaqBlock,
} from "@kannan19302/ui";
import type { BlockType, BlockPropsFor } from "@kannan19302/shared/blocks";
import { CollectionBlock } from "./CollectionBlock";
import {
  RichTextBlock,
  ImageBlock,
  GalleryBlock,
  ColumnsBlock,
  LogoCloudBlock,
  CtaBannerBlock,
  NavbarBlock,
  FooterBlock,
  ContactFormBlock,
  CartBlock,
} from "./RichBlocks";

/**
 * Single source of truth for section type → component, used by the builder
 * canvas preview and the public page renderer.
 *
 * The `satisfies` clause is what makes this the SAME contract as
 * `@kannan19302/shared/blocks` rather than a parallel copy of it: dropping a
 * block type from `BLOCK_TYPES`, adding one without a renderer here, or
 * giving a renderer a prop shape that doesn't match `BLOCK_PROP_SCHEMAS` is
 * now a compile error, not a runtime blank block. `tenant-sites`' copy of
 * this file is not wired to the same check yet — see plan phase P5's note
 * on why that repo needs `@kannan19302/shared` added as a new dependency
 * first, and is deliberately separate follow-up work.
 */
export const BLOCK_REGISTRY = {
  // Marketing
  hero: HeroBlock,
  trust: TrustBarBlock,
  features: FeaturesGridBlock,
  social: SocialProofBlock,
  steps: HowItWorksBlock,
  pricing: PricingBlock,
  faq: FaqBlock,
  testimonials: SocialProofBlock,
  cta: CtaBannerBlock,
  logos: LogoCloudBlock,
  // Content
  text: RichTextBlock,
  image: ImageBlock,
  gallery: GalleryBlock,
  columns: ColumnsBlock,
  // CMS + commerce
  collection: CollectionBlock,
  contact: ContactFormBlock,
  cart: CartBlock,
  // Chrome
  navbar: NavbarBlock,
  footer: FooterBlock,
} satisfies { [K in BlockType]: React.FC<BlockPropsFor<K>> };

/**
 * Looks up a block's renderer by a type string that came from stored/parsed
 * page data (`WebSitePage.blocks`, currently untyped `Json`) rather than
 * from the registry's own closed key set — the boundary where an unknown or
 * malformed block type needs a defined fallback rather than a runtime crash.
 * Both consumers (`PublicPageRenderer`, the canvas preview) had this same
 * `BLOCK_REGISTRY[x] || BLOCK_REGISTRY["text"]` inline before `BLOCK_REGISTRY`
 * gained its closed `BlockType`-keyed type; centralising it here means the
 * fallback behaviour can't drift between the two call sites again.
 */
export function resolveBlockComponent(type: string): React.FC<any> {
  return (
    (BLOCK_REGISTRY as Record<string, React.FC<any>>)[type] ??
    BLOCK_REGISTRY.text
  );
}
