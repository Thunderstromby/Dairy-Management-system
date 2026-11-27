---
name: AgroTerra Dairy Admin
colors:
  surface: '#fbf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fbf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#eae8e2'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c18'
  on-surface-variant: '#444840'
  inverse-surface: '#30312d'
  inverse-on-surface: '#f3f1eb'
  outline: '#75786f'
  outline-variant: '#c4c8bd'
  surface-tint: '#516446'
  primary: '#2f4126'
  on-primary: '#ffffff'
  primary-container: '#46583b'
  on-primary-container: '#b8cda9'
  inverse-primary: '#b8cda8'
  secondary: '#556249'
  on-secondary: '#ffffff'
  secondary-container: '#d9e8c7'
  on-secondary-container: '#5b694e'
  tertiary: '#5e3007'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a461c'
  on-tertiary-container: '#ffb785'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e9c3'
  primary-fixed-dim: '#b8cda8'
  on-primary-fixed: '#101f08'
  on-primary-fixed-variant: '#3a4c30'
  secondary-fixed: '#d9e8c7'
  secondary-fixed-dim: '#bdcbac'
  on-secondary-fixed: '#141f0a'
  on-secondary-fixed-variant: '#3e4b32'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#6c3a11'
  background: '#fbf9f3'
  on-background: '#1b1c18'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.75rem
  headline-sm:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
  data-metric-lg:
    fontFamily: Manrope
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  data-metric-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.5rem
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves modern dairy enterprise management, engineered specifically for agricultural technicians, herd operations managers, veterinary staff, and farm directors. The interface bridges the gap between field pragmatism and advanced agricultural data science.

### Aesthetic Foundation
The visual language merges **Modern Enterprise Practicality** with an **Agrarian Grounded Naturalism**. It rejects ephemeral tech trends: no high-tech cyberpunk telemetry, no purple synthetic gradients, no heavy translucent glassmorphism, and no ornamental 3D graphics. Instead, it prioritizes:
- **Quiet Clarity:** Tactile, paper-like surfaces that withstand high-glare environments (direct sunlight in milking parlors or field tablets) and low-light barn monitoring stations.
- **Dignified Utility:** High visual ergonomics, rapid scannability of vital herd parameters, and dense, structured data presentation without visual clutter.
- **Organic Precision:** Earth-derived tones paired with modern structural typography, communicating reliability, bio-security, and high-efficiency automation.

### Iconography
All iconography exclusively leverages minimalist 1.5px to 2px stroke outline geometry (Lucide aesthetic). Icons must never use solid fill badges, decorative dual-tone fills, or floating colored halos.

## Colors

The palette is rooted in agricultural landscapes—weathered timber, stone yards, pasture cover, and raw copper tags—engineered to ensure high contrast, accessible field reading, and intuitive livestock triage.

### Core Swatches
- **Primary (Deep Olive - `#46583B`):** Brand anchor, top navigation trims, primary call-to-actions, active telemetry filters, and verified batch badges.
- **Secondary (Muted Sage - `#89977A`):** Low-strain structural icons, metadata categorization, group headers, and secondary badge fills.
- **Accent (Warm Copper - `#B8794B`):** Interactive highlights, batch edit warnings, pending manual actions, and focus rings.
- **Neutral Surface (Warm Stone - `#F4F2EC`):** The primary paper-like canvas for light mode, mitigating eye strain under fluorescent parlor lights or harsh outdoor daylight.
- **Base Canvas Layer (White - `#FFFFFF`):** High-clarity foreground cards, data tables, and input wells.
- **Text & Deep Structure (Charcoal - `#292D28`):** Ultra-high contrast for text labels, numerical values, and structural line emphasis.
- **Structural Dividing Line (Border Neutral - `#DFDED5`):** Subdued boundaries for data grids and component separation.

### Status Tokens
- **Success (`#527A59`):** Confirmed automated milking synchronization, optimal rumination levels, active healthy lactation cycles.
- **Warning (`#C18A42`):** Quarantine holding requirements, low feed silo thresholds, somatic cell count variance warnings.
- **Critical/Error (`#B9534D`):** Mastitis detection, automated gate failure, temperature anomaly alerts, authorization timeouts.

### Dark Mode Adaptation
In dark mode, the canvas transforms to a deep matte Charcoal (`#1B1E1A`), with card surfaces elevated to `#232722`. Primary Deep Olive softens to `#607553` to preserve contrast, while borders adjust to `#323830`.

## Typography

The typography pairings serve dual needs: **Manrope** lends architectural balance and modern warmth to administrative metrics and executive views, while **Inter** delivers pristine typographic legibility across dense cow-card tables, yield logs, and sensory event feeds.

### Typographic Directives
- **Tabular Numerals (`font-variant-numeric: tabular-nums`):** Mandatory across all instances of milk volume (L/day), conductivity metrics, ear-tag RFID codes, somatic cell counts, and cattle weight logs to maintain vertical baseline alignment.
- **Hierarchy Enforcement:** Section titling relies on medium and semibold weights of Manrope to maintain grounded authority without screaming.
- **Monochrome Dominance:** Headings use `Charcoal` (`#292D28`). Supporting text uses Charcoal at 70% opacity (`#5C625B`) to keep visual scanning calm and natural.

## Layout & Spacing

The layout philosophy follows a **structured fluid grid** anchored by crisp 8pt spatial increments, engineered for high-density administrative workflows that scale cleanly to tablet devices used in barns.

### Grid & Breakpoints
- **Desktop (≥1280px):** 12-column layout with 24px (`1.5rem`) gutters and 32px (`2rem`) margins. Side navigation remains persistent, offering continuous awareness of batch operations and alerts.
- **Tablet / Rugged Field Slate (768px - 1279px):** 8-column layout with 16px (`1rem`) gutters and 24px (`1.5rem`) margins. Navigation collapses to an iconography-only dock or quick-access drawer.
- **Handheld / Mobile (<768px):** 4-column layout with 12px (`0.75rem`) gutters and 16px (`1rem`) margins. Multi-metric tables transform into high-contrast single-stack inspection cards.

### Layout Rhythm
Spacious outer margins prevent accidental edge touches during field work. Interior card margins (`space-md` to `space-lg`) provide sufficient whitespace around dense statistical columns, preventing misinterpretation of critical livestock data.

## Elevation & Depth

Visual depth is achieved through **low-contrast architectural outlines and quiet, tactile tonal layering** rather than dramatic cast shadows or glossy reflections.

### Surface Tiers
- **Tier 0 (App Canvas):** Warm Stone (`#F4F2EC`). Grounded background layer.
- **Tier 1 (Surface Containers):** Pure White (`#FFFFFF`) with a 1px solid border of Border Neutral (`#DFDED5`). Used for herd data tables, inventory grids, and parameter widgets.
- **Tier 2 (Elevated Overlays):** Used for modal dialogues, slide-out treatment plans, and filter drawers. Styled with surface color `#FFFFFF`, border `#DFDED5`, and an ambient, low-opacity warm tint shadow: `0 8px 24px -4px rgba(41, 45, 40, 0.06), 0 2px 6px -1px rgba(41, 45, 40, 0.04)`.
- **Tier 3 (Urgent Alert Floating Banners):** Used for emergency pen quarantine or robotic breakdown notifications. Features a solid 1px border matching the respective status color (`#B9534D` or `#C18A42`) with subtle downward diffusion: `0 12px 32px -4px rgba(185, 83, 77, 0.12)`.

## Shapes

The design system employs a **Rounded** shape language (`roundedness: 2`), balancing industrial structure with organic softness.

### Corner Curvature Rules
- **Base Components (Inputs, Buttons, Dropdowns, Segmented Tabs):** `0.5rem` (`8px`) for balanced comfort and click/tap target legibility.
- **Surface Cards & Data Modules:** `1rem` (`16px`) creates clearly defined modules that sit neatly on the `#F4F2EC` canvas.
- **Modal Containers & High-Level Shells:** `1.5rem` (`24px`) provides a friendly, framed presentation for deep administrative actions.
- **Status Badges & Chips:** Fully pill-shaped (`9999px`) to immediately differentiate categorical tags and status indicators from interactive rectangular buttons and inputs.

## Components

### Buttons
- **Primary:** Deep Olive (`#46583B`) background, `#FFFFFF` text, `0.5rem` border radius, subtle interactive hover shift to `#3B4A32`. Focused with a 2px offset ring in Warm Copper (`#B8794B`).
- **Secondary:** Transparent background with 1px border of Border Neutral (`#DFDED5`), Charcoal (`#292D28`) text. Hover elevates to `#F4F2EC`.
- **Destructive:** Soft tinted background of Error at 10% opacity, solid Error text (`#B9534D`), transitioning to solid `#B9534D` on direct confirmation click.

### Chips & Status Tags
- **Lactation / Health Chips:** Pill-shaped with a soft 12% tint background and darker solid text (e.g., Active Lactation: `#EBF1EC` background, `#527A59` text).
- **Animal Identification Tag:** Monospaced Inter numeral string encased in a subtle Warm Stone pill with a fine 1px charcoal outline and Lucide cow/tag icon prefix.

### Lists & Data Grids
- **Header Cells:** Crisp uppercase micro-typography (`label-sm`), Border Neutral bottom stroke, subtle Warm Stone tint background.
- **Data Rows:** Standard row height of 48px to 56px to ensure high hit accuracy on touchscreen hardware. Alternate row striping is omitted in favor of delicate `1px` borders (`#DFDED5`).
- **Numerical Alignment:** Right-aligned numerical measurements paired with localized units (`kg`, `L`, `h/day`) styled in `50%` opacity Charcoal.

### Inputs & Selectors
- **Text & Numeric Fields:** Clean White background, `0.5rem` radius, 1px solid Border Neutral (`#DFDED5`). Height fixed at 40px (desktop) or 48px (field/touch mode).
- **Focus State:** 1px solid Deep Olive with an outer 3px ring in Warm Copper (`#B8794B`) at 25% opacity. Never relies on browser default outlines.

### Checkboxes & Radios
- **Checkbox:** `0.25rem` radius square with 1.5px border. Checked state renders Deep Olive fill with a pure White check icon.
- **Radio:** Circular outline with an inner concentrated Deep Olive dot when selected.

### Cards
- Constructed with `#FFFFFF` background, 1px solid `#DFDED5` border, and `1rem` corner rounding. Card headers feature clear separation using an optional bottom stroke or a balanced 24px internal padding gap without excessive dividers.

### Domain-Specific Components
- **Lactation Curve Chart Container:** High-contrast line graph wrapper featuring inline toggleable thresholds (Dry Period, Peak Yield, Insemination Window).
- **RFID Animal Quick-View Drawer:** Slide-out inspection drawer displaying complete veterinary history, somatic cell count trends, sire pedigree, and daily nutritional balance.
- **Bulk Pen Re-Assignment Bar:** Pinned bottom interaction drawer enabled upon multi-row selection, styled in Charcoal (`#292D28`) with Warm Copper accent triggers.