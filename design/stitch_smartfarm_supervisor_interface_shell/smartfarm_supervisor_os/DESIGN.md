---
name: SmartFarm Supervisor OS
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
  headline-xl:
    fontFamily: Manrope
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '800'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 1.375rem
    fontWeight: '700'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.625rem
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
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.25rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system is engineered specifically for dairy farm supervisors orchestrating herd movements, milk yield diagnostics, automated milking rotary stations, and livestock welfare protocols. Operating in environments that shift between ambient parlor tablets, outdoor field walk-throughs, and control office desktops, the interface must deliver high-contrast legibility, tactile precision, and zero visual ambiguity.

The aesthetic philosophy centers on **Warm Agricultural Modernism**:
- **Operational Clarity:** High-density telemetry balanced with spacious touch targets suitable for gloved or outdoor hand interactions.
- **Rooted Functionalism:** Utilitarian surfaces replacing neon SaaS tropes with natural, agrarian tones (deep olive, muted sage, raw copper, and limestone neutrals).
- **Disciplined Restraint:** Strictly scoped to supervisory tasks—milking sessions, parlor line status, somatic cell count (SCC) thresholds, isolation alerts, and pen allocations. Extraneous corporate, administrative, and financial clutter is eliminated.
- **Physical Linearity:** Structural, hairline borders inspired by dairy architectural plans, stainless machinery, and industrial pasture layouts.

## Colors

The palette balances agrarian earth tones with crisp operational indicators, tuned for outdoor sun glare and high-humidity milking parlor environments.

### Palette Architecture
- **Primary (`#46583B` - Deep Olive):** Anchors main navigation bars, primary interactive buttons, selected state indicators, and primary visual anchors.
- **Secondary (`#89977A` - Muted Sage):** Used for auxiliary badges, active tab markers, secondary metrics, and subtle visual groupings.
- **Tertiary (`#B8794B` - Warm Copper):** High-priority operational prompts, parlor intervention markers, pending vet flags, and active herd sorting triggers.
- **Neutral Surface (`#F4F2EC` - Warm Stone):** Primary application canvas background, reducing visual fatigue compared to stark laboratory white.
- **Elevated Canvas (`#FFFFFF` - White Surface):** Container cards, data grids, modal viewports, and sensor readouts.
- **Typography Base (`#292D28` - Charcoal):** Primary text and metric readouts, providing high contrast against both stone and white surfaces.
- **Structural Border (`#DFDED5` - Border Tone):** Hairline separation for cards, telemetry tiles, and data rows.

### Semantic Tones
- **Success (`#527A59`):** Normal milking flow rates, automated wash cycle completion, stable bulk tank temperature (≤3.5°C).
- **Warning (`#C18A42`):** Elevated somatic cell alerts, parlor stall latency, feed intake drop warnings.
- **Error / Critical Alert (`#B9534D`):** Antibiotic withholding breach, mastitis flag, automated gate blockage, rotary emergency halt.

## Typography

The typographic hierarchy combines **Manrope** for authoritative, geometric telemetry headings with **Inter** for dense, readable tabular data, animal status sheets, and micro-labels.

### Implementation Guidelines
- **Tabular Figures:** When presenting cow ear tag IDs, milking volume yields (kg/min), and SCC counts, apply `font-variant-numeric: tabular-nums` to guarantee vertical column alignment across real-time grids.
- **Case Conventions:** Operational labels (e.g., `PARLOR LINE A`, `PEN 04`, `WITHHOLDING MILK`) use `label-sm` with uppercase styling and slight tracking (`letterSpacing: 0.04em`) to maintain legibility on field tablets.
- **Hierarchy Enforcement:** Headline weights peak at 800 (`Manrope`) for high-level facility output summaries, dropping to 600 for card headers. Body text avoids thin weights (sub-400) to ensure high visibility under bright pasture sunlight or low-light barn corridors.

## Layout & Spacing

The supervisory layout system employs a **12-column responsive fluid grid** anchored by strict content containment to avoid wide eye-tracking distances during fast-paced shifts.

### Grid & Breakpoints
- **Mobile (< 768px):** 4 columns. Gutter: `1rem`, Margin: `1rem`. Stacked metric cards; single-column inspection workflows; fixed bottom quick-action bar for pen flagging and batch actions.
- **Tablet (768px - 1199px):** 8 columns. Gutter: `1.25rem`, Margin: `1.5rem`. Split-screen parlor monitoring: visual stall diagram on the left (5 columns), live telemetry stack on the right (3 columns).
- **Desktop (≥ 1200px):** 12 columns. Gutter: `1.5rem`, Margin: `2rem`. Max container constraint: `1600px`. Persistent supervisor side-rail for barn zones, central dynamic telemetry hub, and persistent right drawer for real-time alerts.

### Spacing Principles
- **Touch Target Integrity:** All interactive elements must maintain a minimum physical touch target of 44×44px on mobile and tablet displays.
- **Component Padding:** Information density remains compact internally (`space-sm` to `space-md` within tables and sensor meters), while component separation uses `space-lg` to `space-xl` to prevent accidental taps during transit.

## Elevation & Depth

To avoid the artificial sheen of consumer interfaces, this design system uses **structural hairline outlines, tactile paper-depth layering, and ambient soft-shadows**.

### Surface Hierarchy
- **Base Level (Canvas):** Tone `#F4F2EC` (Warm Stone). Flat foundation.
- **Level 1 (Data Cards & Grid Cells):** `#FFFFFF` surface enclosed by a 1px solid `#DFDED5` border. No drop shadow when static. Depth is communicated strictly through surface value contrast.
- **Level 2 (Active Modals, Parlor Stalls, Floating Action Bars):** `#FFFFFF` surface with a 1px solid `#DFDED5` border paired with an ambient grounding shadow: `0 4px 16px -2px rgba(41, 45, 40, 0.08)`.
- **Level 3 (Alert Popovers & Critical Flag Overlays):** `#FFFFFF` surface bordered with `#B9534D` or `#B8794B`, accompanied by `0 8px 24px -4px rgba(41, 45, 40, 0.12)`.

### Tactile Feedback
- Hover states do not lift cards into dramatic floating shadows. Instead, borders transition from `#DFDED5` to `#89977A`, and background surfaces subtly tint with a 2% wash of `#46583B`.

## Shapes

The interface embraces a **Soft Industrial Geometry (Level 1)**. Rounded corners are intentional and slight, reflecting machined industrial hardware and functional farm tools rather than soft consumer apps.

### Corner Radius Standards
- **Buttons, Text Inputs, Metric Badges:** `0.25rem` (4px). Clean, precise, and crisp.
- **Cards, Panels, Modal Containers:** `0.5rem` (8px, `rounded-lg`). Provides subtle perimeter containment without sacrificing structural density.
- **Pills / Status Chips:** `0.75rem` (12px, `rounded-xl`) or fully circular (`9999px`) reserved strictly for status counts, pen numbers, and cow health tags.

## Components

### Buttons & Interactive Controls
- **Primary Action (e.g., 'Confirm Pen Transfer', 'Start Wash Cycle'):** Background `#46583B`, text `#FFFFFF`, 4px radius, 0.5px border `#3A4A31`. Active state darkens to `#37462E`.
- **Accent Action (e.g., 'Hold Milk Line', 'Flag Animal'):** Background `#B8794B`, text `#FFFFFF`. High visual priority for operational triage.
- **Secondary Action:** Background `#FFFFFF`, text `#292D28`, 1px border `#DFDED5`. Hover triggers `#F4F2EC` surface with `#89977A` border.
- **Destructive Action:** Background `#B9534D`, text `#FFFFFF`.
- **Touch Minima:** Height `44px` on mobile/tablet viewports; `36px` on dense desktop data tables.

### Status Chips & Badges
- **Normal Flow / Active:** Background `#527A59` at 12% opacity, text `#527A59`, 1px border `#527A59` at 25% opacity.
- **Pending / Warning:** Background `#C18A42` at 12% opacity, text `#C18A42`, 1px border `#C18A42` at 30% opacity.
- **Critical / Isolation:** Background `#B9534D` at 12% opacity, text `#B9534D`, 1px border `#B9534D` at 30% opacity.
- **Location / Tag Badge (e.g., 'Pen 03', 'Rotary B'):** Background `#89977A` at 15% opacity, text `#292D28`, font `label-sm`.

### Input Fields & Selectors
- **Default State:** Background `#FFFFFF`, 1px border `#DFDED5`, text `#292D28`, placeholder `#89977A`. Height: `44px` field standard.
- **Focused State:** Border `#46583B` (1.5px), subtle outer ring: `0 0 0 3px rgba(70, 88, 59, 0.15)`.
- **Error State (e.g., out-of-range milk temperature entry):** Border `#B9534D`, outer ring: `0 0 0 3px rgba(185, 83, 77, 0.15)`.

### Checkboxes & Toggle Controls
- **Checkboxes:** 20×20px square, 3px border radius. Unchecked: `#FFFFFF` with 1.5px `#DFDED5` border. Checked: `#46583B` fill with `#FFFFFF` check icon.
- **Rotary / Switch Toggles:** Track 44×24px, 12px pill radius. Off: `#DFDED5`. On: `#46583B`. Thumb: `#FFFFFF` with slight mechanical drop shadow.

### Cards & Telemetry Tiles
- **Sensor Cards (e.g., Tank Temperature, Bulk SCC, Flow Rate):** Background `#FFFFFF`, border 1px solid `#DFDED5`, inner padding `space-md` to `space-lg`. Metric numbers rendered in `Manrope` 700 with tabular alignment. Subtext labels in uppercase `label-sm`.

### Tables & Live Data Feeds
- **Header Rows:** Background `#F4F2EC`, text `#292D28`, font `label-sm`, bottom border 1px solid `#DFDED5`.
- **Data Rows:** Background `#FFFFFF`, alternating hover highlight of `#F4F2EC` at 50% opacity. Height: 48px to allow easy finger selection on livestock tables.

### Domain-Specific Components
- **Animal Isolation Banner:** High-visibility banner featuring a `#B8794B` left indicator bar (4px width), warm stone body, and clear tag number readout.
- **Milking Rotary Stall Grid:** Circular or grouped stall cells with 4-state coloration (Empty, Milking, Completed, Alert).
- **Vessel Level Meter:** Vertical linear tank gauge with fill line in `#527A59` transitioning to `#C18A42` at 90% threshold.