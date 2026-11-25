SmartFarm — Complete Implementable Design System
Design baseline established
Version 1.0
22 November 2026

Project: SmartFarm Dairy Management System
Design direction: Modern Agricultural Technology · Clean Corporate · Warm Minimalism
Core concept: Nature meets technology.
Implementation target: React.js + Tailwind CSS

The design system below translates the SRS, Product Discovery Analysis, and Creative Direction into reusable visual rules, component specifications, responsive behavior, and code-ready design tokens.

It covers all three product interfaces:
1. Public Landing Page.
2. Super Admin Panel.
3. Private Farm Management Application — Farm Admin and Farm Supervisor.
1. Design philosophy






















10














SmartFarm should look like a professional agricultural technology platform rather than a traditional farm recordkeeping application.

Its visual identity combines:
- Natural agricultural colors.
- Enterprise-grade information architecture.
- Clean, readable dashboards.
- Authentic dairy photography.
- Clear operational status indicators.
- Subtle and purposeful interactions.
- Friendly but professional interface language.
Design classification
Direction	Application
Minimal clean	Primary
Corporate	Primary
Technical	Supporting
Soft	Supporting
Light	Primary
Editorial	Public website
Bold	Selective highlights
Dark	Optional dashboard/chart theme
3D / Futuristic	Excluded

2. Brand system
2.1 Visual personality
Attribute	Design interpretation
Grounded	Real agricultural imagery and natural colors
Intelligent	Clear charts and useful data hierarchy
Dependable	Consistent layouts and predictable behavior
Fresh	Warm backgrounds and generous whitespace
Professional	Structured enterprise components
Approachable	Understandable labels and simple workflows

2.2 Brand keywords
Natural · Reliable · Intelligent · Fresh · Professional · Efficient · Agricultural · Modern
2.3 Design principles
1. Function before decoration.
2. Data readability before visual complexity.
3. Green is the brand foundation, not the color of every element.
4. Use consistent components across all workspaces.
5. Make frequent farm operations easy to reach.
6. Keep Admin and Supervisor permissions visually and functionally separate.
7. Use motion only when it communicates feedback or state changes.
8. Design mobile workflows as first-class experiences.
9. Never rely on color alone to communicate status.
10. Do not add functionality outside the approved requirements.
2.4 Logo and brand usage
- Use the approved SmartFarm logo when supplied.
- Use Forest Green on light backgrounds.
- Use a suitable white/light logo variant on dark backgrounds if one is approved.
- Maintain clear space around the logo.
- Do not distort, rotate, recolor arbitrarily, or add decorative effects.
- Until official logo files are supplied, use a temporary text-based brand lockup rather than inventing a final logo.
3. Color system
3.1 Brand palette
Forest Green
#244C3A
Primary brand

Farm Green
#3D7958
Primary actions

Sage Green
#A9C5A5
Supporting accent

Soft Green
#EAF1E8
Subtle surfaces


3.2 Neutral palette
Token	Hex	Usage
Background	#F7F8F4	Main application background
Surface	#FFFFFF	Cards, tables, forms
Text primary	#252D28	Main text
Text secondary	#6B756E	Supporting text
Border	#E4E8E1	Borders and dividers
Light gray	#DCE3DA	Disabled and neutral surfaces

3.3 Semantic colors
Success
#258451


Warning
#D18A26


Error / Critical
#D64B45


Information
#3978C5



3.4 Color application rules
Interface element	Color
Brand logo	Forest Green
Main CTA	Farm Green
Active navigation	Soft Green + Forest Green
Page background	Warm White
Cards	White
Headings	Charcoal
Supporting labels	Muted Text
Success badges	Success
Warnings	Warning
Critical health alerts	Error
Informational notifications	Information

Do not use semantic colors for decorative purposes.
3.5 Light and dark themes
Light is the primary and default theme.

Dark mode is an optional secondary theme for dashboards and chart-heavy views, not a replacement for the approved light-first application design.
Light theme
SmartFarm

Dashboard
1,250 L
Milk production



Dark dashboard theme
SmartFarm

Dashboard
1,250 L
Milk production




Recommended dark tokens:
Token	Value
Background	#19231E
Surface	#24332A
Elevated surface	#2D3D33
Primary text	#F3F6F2
Secondary text	#B4C0B6
Border	#39473E
Primary action	#6AA77C
Accent	#A9C5A5

Semantic status colors must be adjusted for readable contrast in dark mode.
4. Typography system
4.1 Font families
- Application UI: Inter
- Marketing headings: Plus Jakarta Sans
- Numeric dashboard values: Inter with tabular numerals
Load both fonts locally or through an approved font delivery method. Provide system sans-serif fallbacks.
4.2 Type scale
Element	Desktop	Mobile	Weight
H1	56–64px marketing	36–42px	700
H2	36–48px	28–32px	700
H3	28–32px	24–26px	600
H4	20–24px	18–20px	600
Page heading	24–30px	22–26px	600
Card heading	16–18px	16px	600
Body	14–16px	14–16px	400
Small	12–13px	12–13px	400
Button	14px	14px	600

4.3 Typography rules
- Use sentence case for headings and buttons.
- Avoid excessive uppercase text.
- Keep line lengths comfortable.
- Use tabular numerals for milk, inventory, payroll, and financial values.
- Use consistent numeric precision as configured by the application.
- Never reduce table text to the point that it becomes difficult to read.
5. Layout system
5.1 Application containers
Layout	Maximum width
Public marketing content	1200px
Dashboard content	1440px
Data-heavy workspace	1600px
Form content	760px
Narrow content	560px

Use fluid width with consistent horizontal gutters.
5.2 Responsive breakpoints
Breakpoint	Width	Layout behavior
Mobile small	320px	Single-column
Mobile	375px	Single-column
Tablet	768px	Collapsible navigation
Laptop	1024px	Compact sidebar
Desktop	1280px	Full dashboard
Wide desktop	1440px+	Expanded content

Tailwind configuration should use:
screens: {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}


The 320px layout is an additional narrow-device test target, not a separate Tailwind breakpoint.
5.3 Spacing scale
Token	Value
space-1	4px
space-2	8px
space-3	12px
space-4	16px
space-5	20px
space-6	24px
space-8	32px
space-10	40px
space-12	48px
space-16	64px
space-20	80px
space-24	96px

5.4 Grid system
- Public website: 12-column desktop grid.
- Admin application: 12-column content grid.
- Dashboard KPI cards: 4 columns desktop, 2 tablet, 1–2 mobile.
- Form layouts: 2 columns desktop, 1 mobile.
- Data tables: full-width with responsive overflow or card transformation.
5.5 Main application structure








dribbble.com


Desktop:
- Sidebar: 248px expanded, 76px collapsed.
- Header: 64–72px.
- Main content: 24–32px padding.
- Dashboard card gaps: 16–24px.
- Main content background: Warm White.
Mobile:
- Sidebar becomes a drawer or mobile navigation.
- Header remains compact.
- Main content uses 16px horizontal padding.
- KPI cards become one or two columns.
- Large tables use horizontal scrolling or responsive record cards.
- Primary operational actions remain easy to reach.
6. Interface architecture
6.1 Public website






















14











Page structure:
1. Navbar.
2. Hero.
3. About SmartFarm.
4. Features.
5. How it works.
6. Benefits.
7. Dashboard preview.
8. Contact inquiry.
9. Footer.
Design rules:
- Editorial composition.
- Authentic dairy photography.
- Clear hero headline and CTA.
- Real product screenshots when available.
- Restrained scroll reveals.
- Strong text hierarchy.
- No public registration or checkout UI.
6.2 Super Admin Panel








dribbble.com


Primary visual structure:
- Platform navigation.
- Customer management.
- Workspace management.
- Farm Admin provisioning.
- Customer access status.
- Platform activity records.
Keep it visually distinct from farm operations. Do not expose routine farm-management navigation in the platform administrator interface.
6.3 Farm Admin application








dribbble.com


The Admin dashboard can include the approved operational and financial information, such as:
- Animal statistics.
- Milk production.
- Health alerts.
- Vaccination reminders.
- Feeding and inventory.
- Attendance.
- Financial summaries.
- Recent activity.
6.4 Farm Supervisor application








shira.farm


Supervisor screens must show only authorized operations and information.

Prioritize:
- Milk production entry.
- Attendance.
- Feeding records.
- Animal profiles.
- Permitted health records.
- Equipment maintenance.
- Operational notifications.
Do not expose payroll, finances, farm settings, stock correction, leave approval, animal archive controls, or High/Critical health alert access.
7. Component design system
All components should be reusable across the three interfaces. Components may have role-specific variants, but their underlying visual language must remain consistent.
7.1 Navigation bar
Public navbar
- Height: 72–80px desktop.
- Logo on the left.
- Navigation links in the center.
- Contact CTA on the right.
- Sticky on scroll.
- Mobile menu becomes a drawer.
Application sidebar
Property	Specification
Expanded width	248px
Collapsed width	76px
Background	White
Border	1px solid Border
Active item	Soft Green background
Active text/icon	Forest Green
Item height	42–44px
Item radius	8px

Navigation must be generated from the authenticated user's permissions. Hiding a menu item is not a substitute for backend authorization.
7.2 Buttons
Button variants
Primary action

Secondary

Outline

Delete



Specifications
Property	Value
Standard height	40–44px
Small height	32–36px
Radius	8–10px
Font	14px, weight 600
Icon spacing	8px
Horizontal padding	16px


Required states:
- Default.
- Hover.
- Active.
- Focus-visible.
- Disabled.
- Loading.
Rules:
- One visually dominant primary action per main action group.
- Destructive actions use red.
- Disabled actions must have a distinguishable appearance.
- Loading must prevent duplicate submissions.
- Icon-only buttons require accessible labels or tooltips.
7.3 Inputs
Property	Specification
Height	42–44px
Radius	8px
Border	#E4E8E1
Background	White
Text	14px
Horizontal padding	12px
Focus border	Farm Green

Required states:
- Default.
- Focus.
- Error.
- Disabled.
- Read-only.
- Filled.
Input types should include text, number, date, time, email, password, textarea, search, select, checkbox, and radio where required.

For numerical entry, show the measurement unit beside or within the field. For example, milk production should clearly show litres.
7.4 Cards
Today's milk production
Normal

1,250 L
Total recorded production

Morning

680 L

Evening

570 L


Card types:
Type	Design
KPI	Large value, small label, optional trend
Chart	White surface, clear legend
Alert	Semantic accent and severity label
Data	Structured information
Profile	Avatar/photo and identity
Form	Grouped input sections

Specifications:
- Radius: 12–16px.
- Padding: 20–24px.
- Border: 1px solid Border.
- Shadow: subtle or none.
- Avoid oversized decorative icons.
7.5 Modals and dialogs
Property	Specification
Radius	16px
Small width	400px
Medium width	560px
Large width	760px
Padding	24px
Overlay	Dark translucent background
Animation	180–250ms

Use modals for:
- Confirmation.
- Short forms.
- Record details.
- Important warnings.
Use a dedicated page for complex forms instead of placing excessive fields inside a modal.

Deletion, archival, and other important destructive actions should clearly explain what will happen before confirmation.
7.6 Tables
Tables are a major part of SmartFarm and require particular attention.

Table specifications
Property	Value
Header height	44–48px
Row height	48–56px
Cell padding	12–16px
Text	13–14px
Header background	#F7F8F4
Row border	#E4E8E1
Hover	Subtle green-neutral background

Table features:
- Search.
- Filtering.
- Sorting on predefined columns.
- Pagination: 10, 25, 50, 100.
- Role-appropriate row actions.
- Admin-configurable columns where supported.
- Sticky header when useful.
- Empty, loading, and error states.
Mobile behavior:
- Use horizontal scrolling for genuinely tabular information.
- Use responsive cards when record comparison is more useful than columns.
- Preserve key values and actions.
- Never hide critical information without an alternative way to access it.
7.7 Dropdowns
- Minimum height: 40px.
- Radius: 8px.
- Background: White.
- Border: Border token.
- Dropdown shadow: subtle.
- Open transition: 150–200ms.
- Keyboard navigation supported.
- Selected option clearly indicated.
Use searchable dropdowns for long lists, such as animals, workers, customers, and inventory items.
7.8 Forms
Forms should use predictable field grouping.

Recommended structure:
1. Page heading and description.
2. Form sections.
3. Labels above inputs.
4. Required field indicators.
5. Inline validation messages.
6. Primary and secondary actions.
7. Confirmation where required by the SRS.
Form rules:
- Use two columns on desktop where appropriate.
- Use one column on mobile.
- Preserve entered values after validation errors.
- Clearly identify units and accepted formats.
- Show errors beside the relevant field.
- Do not assume automatic draft saving.
- Do not silently submit forms.
7.9 Footer
Public website footer
- Brand identity.
- Relevant navigation links.
- Contact information.
- Copyright information.
- Legal links only when approved content exists.
Use a dark Forest Green footer with readable light text.

Private application footer

Keep it minimal. Display only useful application information such as version or copyright where required.

8. Motion and interaction system
Subtle to moderate
Motion should improve understanding, feedback, and perceived responsiveness. It must never distract from entering or reviewing operational data.
8.1 Motion tokens
Token	Duration	Usage
Fast	120–150ms	Button and icon feedback
Normal	180–200ms	Dropdowns and cards
Slow	220–250ms	Sidebar and modal
Chart	300–500ms	Initial chart rendering

Recommended easing:
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-enter: cubic-bezier(0, 0, 0.2, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);


8.2 Page transitions
- Short fade-in.
- Optional slight vertical movement.
- Duration: 150–250ms.
- No long page-loading animation.
- Avoid transitions that delay access to operational records.
8.3 Hover interactions
Element	Interaction
Button	Slight shade change
Card	Subtle elevation
Navigation	Background highlight
Table row	Neutral highlight
Chart	Tooltip
Dropdown	Clear open/close state

Hover must not be required to discover essential actions or information.
8.4 Scroll interactions
Public website:
- Sticky navigation.
- Smooth anchor navigation.
- Subtle section reveals.
- Product screenshot storytelling.
- Optional restrained parallax.
Private applications:
- Normal vertical scrolling.
- Sticky table headers where useful.
- Sticky page actions where necessary.
- Independent scrolling for large panels.
- No forced scrolling or scroll-jacking.
8.5 Mouse-follow interactions
Mouse-follow effects are not recommended for the private application.

For the public landing page, a very subtle decorative background response may be used if it:
- Is limited to non-interactive decorative elements.
- Does not follow the pointer aggressively.
- Does not affect text or controls.
- Is disabled on touch devices and under reduced-motion preferences.
8.6 Cursor interactions
- Use pointer cursor for clickable elements.
- Use text cursor for editable text.
- Use not-allowed cursor for unavailable actions where appropriate.
- Keep native browser text selection.
- Do not create custom cursors that interfere with accessibility.
8.7 Loading states
Use:
- Skeletons for dashboard cards, tables, and pages.
- Small spinners for short actions.
- Progress indicators only when actual progress information is available.
- Clear loading text where a user might otherwise assume the interface is frozen.
Do not fabricate loading percentages.
8.8 Micro-interactions
Appropriate examples:
- Notification badge appearing.
- Success checkmark after a successful save.
- Subtle button press feedback.
- Chart bars animating into place.
- Status badge updating after a saved change.
- Counter transitions after refreshed data.
Important: animated numbers must represent actual saved or retrieved data, not simulated values.
8.9 Reduced motion
Respect the operating system preference:
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}


Essential status changes and feedback must remain understandable without animation.

9. 2D visual system
Included
2D is the complete visual direction for SmartFarm.
9.1 Decorative elements
Use restrained agricultural visual language:
- Abstract leaf shapes.
- Soft organic curves.
- Subtle field-inspired patterns.
- Layered rounded geometric forms.
- Minimal line illustrations.
- Small decorative separators.
Do not let decorative elements compete with operational data.
9.2 Illustrations






















13











Illustrations may be used for:
- Public marketing sections.
- Empty states.
- Feature explanations.
- Onboarding guidance.
- Lightweight status illustrations.
Use consistent line weights and a restrained green-neutral palette.

Avoid cartoon cows, childish characters, exaggerated anatomy, and unrelated generic corporate illustrations.
9.3 Shapes
Element	Treatment
Cards	Rounded rectangles
Hero backgrounds	Soft organic curves
Decorative patterns	Low contrast
Icons	Consistent outline style
Badges	Pill
Charts	Simple geometric forms

9.4 Gradients
Gradients are optional and should be very restrained.

Approved examples:
--gradient-brand:
  linear-gradient(135deg, #244C3A 0%, #3D7958 100%);

--gradient-soft:
  linear-gradient(135deg, #EAF1E8 0%, #F7F8F4 100%);


Use them selectively in marketing hero backgrounds or minor promotional surfaces.

Do not use gradients as the default background of every card or button.

10. 3D system
Not included
3D usage: 0% true 3D.

The SRS and creative direction explicitly exclude 3D functionality. ACR-002 approves one CSS/static decorative Home hero motif only; it is not a 3D runtime and does not introduce WebGL, canvas, GLB/GLTF or textures.
Requested dimension	SmartFarm decision
Whether 3D is used	No true 3D; ACR-002 CSS/static motif only
Where it is used	Public Home hero decorative layer only (ACR-002)
Scene style	Not applicable
Camera behavior	Not applicable
Interaction	Not applicable
Performance fallback	No 3D runtime or WebGL required

Excluded:
- 3D cow or animal models.
- Interactive farm environments.
- 3D equipment models.
- 3D dashboards.
- WebGL scenes.
- 3D simulations.
- Camera orbit and zoom controls.
Use realistic photography, SVG, CSS shapes, charts, and 2D illustrations instead.

This avoids introducing unnecessary loading, rendering, device compatibility, and maintenance costs.

11. Accessibility system
Accessibility-conscious implementation is required. Formal WCAG 2.2 AA certification is not currently an approved project requirement, so it must not be represented as certified.
11.1 Contrast
Use WCAG contrast checks during implementation.

Recommended minimum targets:
- Normal text: 4.5:1.
- Large text: 3:1.
- Important UI boundaries and focus indicators: 3:1 against adjacent colors where applicable.
Important color-pairing note:
- Farm Green with white text is suitable for primary actions when verified against the target contrast.
- Warning orange should use dark text rather than assuming white text is readable.
- Semantic badges should include descriptive text, not color alone.
11.2 Focus states
All interactive controls must have visible keyboard focus.
:focus-visible {
  outline: 3px solid #A9C5A5;
  outline-offset: 2px;
}


Do not remove focus outlines without providing a visible replacement.
11.3 Keyboard support
Support:
- Tab and Shift+Tab navigation.
- Enter and Space for appropriate controls.
- Escape to close dialogs and menus.
- Arrow-key navigation for accessible menu/listbox controls.
- Logical focus order.
- Focus trapping inside modal dialogs.
- Focus restoration after modal closure.
11.4 Forms and validation
- Every input must have an associated label.
- Required fields must be identified.
- Error messages must be associated with the relevant field.
- Validation must not rely solely on color.
- Screen readers must be able to identify important success and error messages.
11.5 Charts and tables
- Provide meaningful chart titles and legends.
- Do not rely only on color to distinguish chart series.
- Provide supporting tabular or textual data for important chart information.
- Use proper table headers and accessible names.
- Make horizontal scrolling usable on small screens.
11.6 Responsive accessibility
- Support browser zoom.
- Use adequate touch targets.
- Maintain readable text at mobile sizes.
- Avoid hover-only interactions.
- Ensure dialogs fit small screens.
- Respect reduced-motion settings.

12. Code-ready design tokens
The following is the recommended CSS foundation for the frontend.

:root {
  /* Brand */
  --color-brand-primary: #244C3A;
  --color-brand-action: #3D7958;
  --color-brand-sage: #A9C5A5;
  --color-brand-soft: #EAF1E8;

  /* Neutral colors */
  --color-background: #F7F8F4;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F1F4EF;
  --color-text-primary: #252D28;
  --color-text-secondary: #6B756E;
  --color-border: #E4E8E1;
  --color-disabled: #DCE3DA;

  /* Semantic colors */
  --color-success: #258451;
  --color-warning: #D18A26;
  --color-danger: #D64B45;
  --color-info: #3978C5;

  /* Typography */
  --font-ui: "Inter", sans-serif;
  --font-heading: "Plus Jakarta Sans", sans-serif;

  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-hero: clamp(36px, 5vw, 64px);

  /* Radius */
  --radius-input: 8px;
  --radius-button: 9px;
  --radius-card: 14px;
  --radius-modal: 16px;
  --radius-panel: 22px;
  --radius-pill: 999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Layout */
  --container-marketing: 1200px;
  --container-dashboard: 1440px;
  --container-wide: 1600px;
  --sidebar-expanded: 248px;
  --sidebar-collapsed: 76px;
  --header-height: 68px;

  /* Motion */
  --motion-fast: 150ms;
  --motion-normal: 200ms;
  --motion-slow: 250ms;
  --motion-chart: 400ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* Shadows */
  --shadow-card: 0 2px 8px rgba(36, 76, 58, 0.04);
  --shadow-dropdown: 0 6px 20px rgba(37, 45, 40, 0.10);
  --shadow-modal: 0 16px 48px rgba(37, 45, 40, 0.16);
}

[data-theme="dark"] {
  --color-background: #19231E;
  --color-surface: #24332A;
  --color-surface-muted: #2D3D33;
  --color-text-primary: #F3F6F2;
  --color-text-secondary: #B4C0B6;
  --color-border: #39473E;

  --color-brand-action: #6AA77C;
  --color-brand-soft: #30483A;

  --color-success: #56B982;
  --color-warning: #E8B45C;
  --color-danger: #F07870;
  --color-info: #78A9E8;
}

body {
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: var(--font-size-base);
  font-variant-numeric: tabular-nums;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}

button, input, select, textarea {
  font: inherit;
}

:focus-visible {
  outline: 3px solid var(--color-brand-sage);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}



13. Tailwind CSS implementation
Recommended Tailwind configuration using the token names above:

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#244C3A",
          action: "#3D7958",
          sage: "#A9C5A5",
          soft: "#EAF1E8",
        },
        background: "#F7F8F4",
        surface: "#FFFFFF",
        text: {
          primary: "#252D28",
          secondary: "#6B756E",
        },
        border: "#E4E8E1",
        success: "#258451",
        warning: "#D18A26",
        danger: "#D64B45",
        info: "#3978C5",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },

      borderRadius: {
        input: "8px",
        button: "9px",
        card: "14px",
        modal: "16px",
        panel: "22px",
      },

      boxShadow: {
        card: "0 2px 8px rgba(36, 76, 58, 0.04)",
        dropdown: "0 6px 20px rgba(37, 45, 40, 0.10)",
        modal: "0 16px 48px rgba(37, 45, 40, 0.16)",
      },

      maxWidth: {
        marketing: "1200px",
        dashboard: "1440px",
        wide: "1600px",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "250ms",
      },
    },
  },

  plugins: [],
};



For the production application, map Tailwind colors to CSS variables rather than duplicating literal colors throughout components. This keeps theme switching consistent.
14. Component implementation examples
Primary button

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function PrimaryButton({
  children,
  loading = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="
        inline-flex min-h-11 items-center justify-center gap-2
        rounded-button px-4
        bg-brand-action text-white
        text-sm font-semibold
        transition-colors duration-fast
        hover:bg-brand-primary
        active:scale-[0.99]
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-brand-sage
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full
          border-2 border-white/40 border-t-white"
        />
      )}

      {loading ? "Please wait..." : children}
    </button>
  );
}



Card

type CardProps = {
  title: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <section
      className="
        rounded-card border border-border
        bg-surface p-5 shadow-card
      "
    >
      <h2 className="mb-4 text-base font-semibold text-text-primary">
        {title}
      </h2>

      {children}
    </section>
  );
}



These examples establish styling patterns, not complete business workflows. Real forms and actions must still use application validation, API error handling, loading states, and role authorization.
15. Iconography and data visualization
Icon system
Recommended library: Lucide React.
- Standard icons: 20–24px.
- Compact table icons: 16px.
- Dashboard feature icons: 28–32px.
- Stroke width: 1.75–2px.
- Rounded line endings.
- Consistent outline style.
Use recognizable icons for animals, milk, inventory, workers, attendance, payroll, finance, equipment, reports, and settings.

Do not mix 3D icons, cartoon icons, and filled icons with the primary outline system.
Charts
Use a consistent chart palette:
Purpose	Color
Primary series	Forest Green
Secondary series	Farm Green
Supporting series	Sage Green
Neutral comparison	Light Gray
Positive trend	Success
Negative trend	Error
Information	Information

Chart rules:
- Include readable legends.
- Show units.
- Use clear axis labels.
- Provide tooltips.
- Avoid unnecessary 3D chart effects.
- Preserve actual values and configured precision.
- Provide textual or tabular alternatives for important information.
Charts must not imply a confirmed analytical capability that is excluded from the SRS.

16. Interface-specific implementation rules
Design area	Public website	Super Admin	Farm Admin	Supervisor
Navigation	Marketing navbar	Platform sidebar	Farm sidebar	Restricted sidebar
Primary focus	Customer inquiries	Customer/workspace management	Farm management	Daily operations
Main layout	Editorial sections	Enterprise dashboard	Operational dashboard	Simplified operational dashboard
Financial data	No	Not routine farm finance	Yes	No
Main actions	Contact inquiry	Provision workspace	Manage farm	Record operations
Mobile	Responsive website	Responsive panel	Responsive application	Mobile-first operational workflows

16.1 Data presentation priorities
Use the same component language but adapt information density to each user.

Farm Admin: information-rich dashboard with operational and financial summaries.

Farm Supervisor: clear, task-oriented entry screens with limited navigation and fewer competing metrics.

Super Admin: customer and workspace tables, account provisioning, and access status.
16.2 Data and formatting
- Respect farm-specific timezone settings.
- Respect farm-selected currency.
- Support the configured date and time formats.
- Support Indian/Pakistani numeric grouping where configured.
- Respect flexible measurement precision.
- Do not introduce automatic unit conversion.
- Clearly show units beside numeric values.
Do not hardcode PKR, a particular timezone, or a particular measurement precision into shared components.

17. Responsive behavior specification
Component	Desktop	Tablet	Mobile
Navbar	Full navigation	Compact navigation	Drawer/menu
Sidebar	Expanded	Collapsed/drawer	Drawer
KPI cards	4 columns	2 columns	1–2 columns
Forms	2 columns	2 columns where suitable	1 column
Tables	Full table	Scrollable table	Cards or horizontal scroll
Modals	Centered dialog	Responsive dialog	Full-screen/bottom sheet
Charts	Full-size	Adapted	Stacked
Actions	Inline	Compact	Reachable tap controls

Mobile operational priorities:
1. Milk production entry.
2. Attendance recording.
3. Actual feeding entry.
4. Animal profile access.
5. Permitted health record entry.
6. Notifications.
7. Equipment maintenance recording.

18. Design states and feedback standards
Every data-driven page must provide the following states:
State	Required presentation
Loading	Skeleton or action spinner
Empty	Helpful empty state and permitted next action
Success	Clear success feedback
Error	Understandable error message
Validation	Field-specific message
Disabled	Clearly unavailable control
Confirmation	Explicit action summary
Permission denied	Clear access explanation
No results	Search/filter-specific empty state

Use consistent feedback placement:
- Field validation: beside the field.
- Successful short actions: toast or inline status.
- Important errors: visible alert.
- Destructive actions: confirmation dialog.
- Page-level loading: skeletons.
Avoid showing raw technical error details to ordinary users. Technical details may be available to authorized Admins as specified in the requirements.

19. Design system governance
To prevent inconsistent implementation, establish these frontend conventions:

Recommended folder structure
src/
├── assets/
│   ├── images/
│   ├── illustrations/
│   └── fonts/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   └── Dropdown.tsx
│   ├── layout/
│   │   ├── PublicNavbar.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── AppHeader.tsx
│   │   └── PageContainer.tsx
│   ├── feedback/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   └── charts/
├── layouts/
│   ├── PublicLayout.tsx
│   ├── SuperAdminLayout.tsx
│   ├── FarmAdminLayout.tsx
│   └── SupervisorLayout.tsx
├── pages/
├── hooks/
├── services/
├── styles/
│   ├── tokens.css
│   ├── themes.css
│   └── globals.css
└── utils/


Governance rules
1. Use design tokens instead of arbitrary repeated colors.
2. Reuse shared components.
3. Do not create a separate visual language for each module.
4. Keep authorization and visual navigation aligned.
5. Test responsive layouts before considering a component complete.
6. Test loading, empty, error, and success states.
7. Test keyboard interaction.
8. Test light and optional dark theme behavior.
9. Keep animation durations within the defined motion system.
10. Record deviations from the design system for review.

20. Acceptance checklist
This checklist can be used by the UI designer, frontend developer, and QA engineer.
Design QA progress
0/29



Brand and visual consistency
[ ] Natural green and warm-neutral palette is consistent.
[ ] Typography uses Inter and Plus Jakarta Sans appropriately.
[ ] Logo usage follows approved branding assets.
[ ] Cards, borders, radii, and shadows follow tokens.
[ ] No cartoon-style agricultural branding or excessive gradients.


Layout and responsive design
[ ] Public, Super Admin, Farm Admin, and Supervisor layouts are distinct.
[ ] Desktop sidebar and header behavior is consistent.
[ ] Tablet navigation is usable.
[ ] Mobile forms use single-column layouts.
[ ] Tables remain usable on narrow screens.
[ ] Operational mobile actions are easy to reach.


Components and states
[ ] Buttons have hover, active, disabled, loading, and focus states.
[ ] Inputs show validation and disabled states.
[ ] Tables include search, filters, sorting, and supported pagination.
[ ] Dialogs support keyboard interaction.
[ ] Every data page has loading, empty, success, and error states.
[ ] Destructive actions have clear confirmation.


Motion and visuals
[ ] Motion uses the approved timing scale.
[ ] No distracting mouse-follow or forced scrolling.
[ ] Reduced-motion preferences are respected.
[ ] Charts use clear labels, units, and legends.
[ ] Only 2D illustrations and visual elements are used.
[ ] No 3D or WebGL features are introduced.


Accessibility and permissions
[ ] Text and UI contrast are checked.
[ ] Keyboard navigation and visible focus work.
[ ] Forms have accessible labels and error messages.
[ ] Status is never communicated by color alone.
[ ] Supervisor cannot see restricted Admin information or actions.
[ ] Backend authorization enforces all role permissions.

Reset checklist


21. Final design decisions and unresolved dependencies
The design system is the visual implementation baseline. It does not resolve outstanding business requirements.

The following items still require client decisions before their related workflows can be finalized:
Area	Design dependency
Multi-farm/customer model	Workspace switcher and account navigation
Super Admin support access	Support access and permission UI
Milk-drop detection	Alert details, acknowledgement, and resolution states
Feeding recommendations	Recommendation and override interfaces
Payroll formulas	Calculation review and correction screens
Financial definitions	Report labels and calculation explanations
Backup and recovery	Backup status and restore workflows
Email delivery	Notification and delivery failure feedback
Breeding records	Breeding forms and reminders
Branding assets	Final logo, approved photography, and brand files

Do not invent these workflows while implementing the visual system. Build only what is supported by the approved requirements and confirmed business rules.
22. Final creative direction








diariodolitoral.com.br


SmartFarm
Nature meets technology.
A modern dairy management platform built around clarity, trust, and intelligent farm operations.
Natural green
Clean corporate
Warm minimalism
2D only



Final implementation principle: SmartFarm should feel like one coherent product across its public website, platform administration, and farm operations. Its strongest identity comes from natural green branding, confident typography, clean information architecture, authentic imagery, accessible data presentation, and purposeful 2D interactions.

This design system is ready to serve as the frontend styling and component baseline. Final screen-level workflows must continue to follow the SRS, permission matrix, and approved business rules.