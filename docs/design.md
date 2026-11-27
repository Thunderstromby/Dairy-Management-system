SmartFarm — Complete UI Design Blueprint
DESIGN SPECIFICATION · VERSION 1.0 · 22 NOVEMBER 2026

Status: Implementation blueprint for UI generation
Target: Stitch / UI generators / frontend development team
Source of truth: SmartFarm SRS v1.0, Business Rules v1.0, Role & Permission Matrix, Section-wise Sitemap.
1. Design vision
1.1 Creative direction
Primary direction: Modern Agricultural Technology
SmartFarm must look like a serious agricultural management product built for real dairy farm operations, not a generic SaaS administration template.

The visual identity combines:
- Agricultural: Natural greens, warm ivory, earthy supporting colors.
- Professional: Structured information, clear hierarchy, disciplined spacing.
- Modern: Clean interfaces, responsive layouts, refined charts and typography.
- Practical: Large readable values, obvious actions, low-friction forms.
- Trustworthy: Consistent status indicators, predictable navigation and restrained decoration.
The design should communicate that SmartFarm brings organization, visibility and control to everyday dairy farm operations.
1.2 Visual classification
Dimension	Decision
Primary style	Modern agricultural technology
Secondary style	Minimal clean
Supporting style	Corporate / editorial
Public website	Bright, photographic, welcoming
Super Admin	Professional, structured, neutral
Farm application	Operational, information-dense, clean
Visual personality	Natural, dependable, intelligent
Decoration	Restrained
3D	Excluded except ACR-002 CSS/static Home hero motif; no WebGL
Dark/light mode	Both supported

1.3 Non-negotiable design rules
1. Never use indigo or violet as the primary brand color.
2. Never use generic Bootstrap-blue styling.
3. Avoid excessive gradients and glassmorphism.
4. Avoid decorative dashboard elements without operational value.
5. Do not use illustrations that make the system look like a children's farming game.
6. Do not use artificial livestock imagery or cartoon animals.
7. Use actual data for charts and KPI values.
8. Do not imply that a design preview is live operational data.
9. Maintain the same brand identity across all three application areas.
10. Keep Farm Admin and Supervisor interfaces permission-aware.

2. Color system
2.1 Primary palette
The chosen palette is Pasture Green + Deep Forest + Warm Ivory.

It references healthy pasture, agricultural land, natural growth and dependable farm infrastructure.

Forest Green

#245C45

Primary brand


Pasture Green

#397A58

Secondary


Harvest Gold

#D5A64A

Accent


Sage Mist

#E9EFE5

Soft surface


Complete light-mode palette
Token	Hex	Application
Primary	#245C45	Primary buttons, brand
Primary Hover	#194833	Hover and active
Primary Light	#E4EFE7	Selected backgrounds
Secondary	#397A58	Secondary actions
Secondary Light	#E9EFE5	Soft panels
Accent	#D5A64A	Highlights and emphasis
Accent Light	#F7EED9	Highlight surfaces
Background	#F7F7F1	Main application background
Surface	#FFFFFF	Cards and dialogs
Surface Alt	#F0F2EA	Secondary panels
Text	#25332C	Primary text
Text Secondary	#58675D	Supporting text
Muted	#849087	Hints and metadata
Border	#DCE3DA	Dividers and borders
Success	#28784A	Success state
Success BG	#E5F3E9	Success surface
Warning	#A96D13	Warning state
Warning BG	#FBF0D9	Warning surface
Error	#B64036	Error state
Error BG	#FBE9E6	Error surface
Info	#39748A	Informational state
Info BG	#E8F2F5	Informational surface

2.2 Dark-mode palette
Dark mode must feel like a refined operational interface, not a pure-black gaming dashboard.
Token	Hex
Primary	#8DC6A1
Primary Hover	#A5D7B5
Primary Light	#263F32
Secondary	#75B38B
Accent	#E4BC69
Background	#151D19
Surface	#1E2922
Surface Alt	#27342C
Text	#EDF3EE
Text Secondary	#BBC8BE
Muted	#91A096
Border	#35443A
Success	#83C99A
Success BG	#253C2D
Warning	#E8BC69
Warning BG	#453820
Error	#F08D82
Error BG	#472C2A
Info	#8BBED0
Info BG	#263D45

2.3 Color application rules
- Forest Green: main navigation identity, primary actions and selected navigation.
- Pasture Green: supporting actions, icons and charts.
- Harvest Gold: limited highlights, attention points and important metrics.
- Warm Ivory: public website backgrounds and light application canvas.
- White: data cards and form surfaces.
- Semantic colors: only for actual status meaning.
- Dark mode: invert surfaces and text through semantic tokens, not through simple color filters.
Do not use Harvest Gold for primary buttons. Do not use red or orange as decorative brand colors.
2.4 Alternative palettes considered
Alternative	Reason for rejection
Emerald + cyan	Too close to generic technology branding; cyan weakens the agricultural character
Olive + terracotta	Attractive rural identity, but insufficiently crisp for dense operational dashboards
Navy + lime	Feels like industrial logistics or financial software rather than dairy management

The Forest Green palette is the selected brand direction.

3. Typography
3.1 Font pairing
Headings
Manrope
SemiBold / Bold · 600–700
Better dairy management starts here.


Body and interface
Inter
Regular / Medium · 400–600

Clear records, organized operations and meaningful insights for everyday farm management.


Why this pairing works
- Manrope gives the brand a modern but approachable character.
- Inter provides excellent readability for dense tables, labels and forms.
- Both work well in responsive interfaces.
- The combination avoids overly decorative agricultural typography.
Use tabular numerals for quantities, money, timestamps, production values and dashboard KPIs.
3.2 Type scale
Element	Desktop	Mobile	Weight
H1	48px	34px	700
H2	36px	29px	700
H3	28px	24px	650
H4	22px	20px	600
Body large	18px	17px	400
Body	15px	15px	400
Small	13px	13px	400
Caption	12px	12px	500
Button	14px	14px	600
Table header	12px	12px	600

Never reduce important table data below 13px on desktop or 12px on mobile.

4. Iconography
Library: Lucide Icons.

Style: Consistent outline icons with 1.8px stroke.

Use:
- 20px for sidebar navigation.
- 18px for buttons and inline actions.
- 24px for feature cards.
- 32px for empty-state illustrations where needed.
Icon rules:
1. Use Lucide consistently.
2. Never mix emoji with interface icons.
3. Do not use solid icons randomly.
4. Use semantic color only when an icon communicates a status.
5. Use a consistent icon for the same action throughout the application.
Icon mapping
Area	Icon
Dashboard	layout-dashboard
Animals	cow where available, otherwise paw-print
Animal health	heart-pulse
Milk production	milk where available, otherwise droplet
Inventory	boxes
Feeding	wheat
Workers	users
Attendance	calendar-check
Payroll	wallet
Finance	chart-no-axes-combined
Equipment	tractor where available, otherwise wrench
Notifications	bell
Reports	chart-column
Settings	settings
Data management	database

Use no unverified icon names: substitute the closest supported Lucide icon if an icon is unavailable in the installed version.

5. Imagery and visual assets
5.1 Public website










Primary imagery

Authentic dairy livestock and farm environments.











Operational imagery

Realistic farm operations and workers.


Photography direction:
- Documentary-style, not overly polished stock photography.
- Natural daylight.
- Realistic dairy farm environments.
- Green and neutral color grading.
- Horizontal landscape images for hero sections.
- Rounded corners, 12–16px.
- No exaggerated saturation.
- No artificial green overlays across entire images.
5.2 Application imagery
Use real uploaded images for:
- Animal profiles.
- Equipment records.
- Worker documents where appropriate and authorized.
- Approved product screenshots.
For missing records, use neutral placeholders, not invented animal identities or fake operational evidence.
5.3 Illustration
Use minimal agricultural line illustrations only for:
- Public feature explanations.
- Empty states.
- How It Works.
- Supporting visual accents.
No cartoon farm scenes, 3D livestock models, isometric farming illustrations or decorative dashboards.
5.4 Abstract shapes
Use organic shapes sparingly:
- Soft sage circles.
- Rounded geometric leaf-inspired shapes.
- Subtle green tonal backgrounds.
- Small agricultural line patterns.
They may appear on the public website, especially the hero. They must not compete with application data.

6. Logo direction
Direction only — not a final logo
Create a simple agricultural technology identity.

Concept: A recognizable combination of a leaf, pasture line and subtle milk-drop geometry.

Requirements:
- Simple silhouette.
- Forest Green primary mark.
- Wordmark: SmartFarm.
- Modern sans-serif lettering.
- No cow-head mascot.
- No detailed farm illustration.
- Must work in monochrome.
- Must work in compact sidebar format.
- Provide light and dark background variants.
Until an approved logo exists, use a Manrope SemiBold SmartFarm wordmark with a simple leaf-inspired mark.

7. Motion personality
Subtle and functional
Motion must communicate state changes, not entertain users.
Element	Motion
Public hero	Gentle fade and image reveal
Navbar	Background/shadow transition
Public sections	Short scroll reveal
Cards	150ms hover transition
Dashboard charts	250–400ms entrance
KPI values	Short count-up only for real values
Forms	150ms focus and validation transitions
Dialogs	180ms fade/scale
Sidebar	200ms width transition
Notifications	Brief badge update
Tables	Subtle row hover
Loading	Skeleton shimmer or spinner
Save feedback	Short toast entrance

Global timing: 150–250ms for normal interactions.

Do not use:
- Continuous floating objects.
- Parallax-heavy scrolling.
- Rotating agricultural illustrations.
- Artificially changing KPI numbers.
- Simulated production activity.
- Excessive bouncing or elastic effects.
Respect prefers-reduced-motion. In reduced-motion mode, remove nonessential movement and replace animated transitions with immediate state changes.

7.1 Motion Pattern Selection

Scope: approved public Home page only (`sitemap.md` §1, `appflow.md` Journey 01). Private surfaces keep the standard state transitions in `design-system.md` §§8.2–8.3; no Section 19a signature effect is added there. At most one signature text effect and one signature scroll effect are selected. Only transform and opacity are animated. No new library is introduced.

| Pattern | Type (text / micro-interaction / scroll) | Where used | Purpose | Library | Mobile behavior | Reduced-motion fallback |
|---|---|---|---|---|---|---|
| Word Stagger | text | Hero H1 on public Home | Signature text effect: sets a premium, calm tone without adding information | Native CSS transforms/opacity + React; no motion library | Words are shown together at final position; no stagger | Full text appears immediately with no transform or opacity animation |
| Layered Parallax | scroll | Hero sage organic layer and Dashboard Preview frame | Signature scroll effect: restrained 2D depth behind content only | Native CSS custom properties + shared pointer/scroll source with `requestAnimationFrame`; no motion library | Disabled on coarse pointers; layers remain static and readable | Layers stay static; no pointer or scroll transform updates |
| Loading to Success | micro-interaction | Contact Inquiry submit button | Communicates a real submission state change only | Native CSS + React state | Same label/state order; no hover dependency | Immediate label/icon change with no morphing |
| Error Shake | micro-interaction | Contact Inquiry field-level validation | Communicates real invalid input; keeps focus and message | Native CSS + React state | Border/message appears without movement | Border/message appears immediately; no shake |
| Toast Drop | micro-interaction | Contact Inquiry success/error result | Confirms the actual inquiry result without blocking navigation | Native CSS + React state | Inline status message replaces the moving toast; same wording | Status appears immediately in place |

7.1.1 Additional approved 2D effects outside Section 19a

These are already permitted by `design-system.md` §§8.3–8.6 and are implemented under the same transform/opacity and reduced-motion constraints. They are supporting polish, not signature patterns.

| Effect | Where used | Constraint |
|---|---|---|
| Subtle scroll reveal | About, Features, How It Works, Benefits, Footer | Short fade/translate only; content is readable before reveal completes |
| Pointer-follow decorative layer | Public hero background only | Non-interactive, `aria-hidden`, low amplitude, disabled on touch and reduced motion |
| Cursor-reactive highlight | Public hero decorative layer only | No custom cursor; native pointer/text/not-allowed cursors are preserved |
| Magnetic primary CTA | Hero primary CTA only | Small transform on fine pointers; full-size hit area retained; static on mobile/reduced motion |
| Hover lift | Feature cards only | 150ms elevation via transform/shadow; never required to discover content |
| Image reveal/movement | Hero photograph and Dashboard Preview frame | Fixed aspect ratio to prevent layout shift; no continuous motion |
| Smooth section transition | Anchor navigation between approved Home sections | Short fade only; no scroll-jacking |

7.1.2 Rejected Section 19a patterns

| Rejected pattern(s) | Reason |
|---|---|
| Typewriter, Scramble Decode, Rotating Word, Wave, Letter Bounce, Letter Flip, RGB Glitch, Split Halves | Novel or game-like; compete with the serious agricultural-technology identity and slow reading. |
| Gradient Flow, Outline to Fill, Marker Highlight, Squiggle Underline, Zoom Punch, Tracking Expand, Blur In | Decorative text treatment that adds no state or information; risks readability and reads as generic template motion. |
| Number Count-up | Dashboard preview values are illustrative; animating numbers would imply real saved values. Revisit only with approved real data. |
| Pinned Heading, 3D Card Zoom, Card Arc Carousel, Fixed 3D Model, Stacking Cards, Focus-frame Slider, Scroll-triggered Demo | Scroll-jacking, heavy composition, or 3D/game language; excluded by the 2D direction and `sitemap.md`/`scope.md`. |
| Line-by-line Reveal | Would become a second competing scroll signature alongside Layered Parallax; short section reveals already cover this need. |
| Like Burst, Add to Cart, Star Rating, Bookmark Save, Copy Link, Pull to Refresh, Swipe to Delete, Long Press Menu, Segmented Control, Number Stepper | No matching state or control exists in the approved public journey; add-to-cart is incompatible with COD/manual inquiry-only sales. |
| Toggle Switch, Password Reveal, Progress Ring, Accordion Expand | No eligible public state; password reveal belongs to authenticated surfaces and progress rings require real progress data. Accordion expansion would introduce layout movement. |

Implementation seam: `apps/web/src/motion/` with global styles in `apps/web/src/styles/motion.css`. Per-page usage remains subject to `docs/visual-review-tracker.md`; no feature page is claimed complete by these primitives alone.

8. Repeating structural system
These components are locked and must be reused consistently.
8.1 Public navbar

SmartFarm


Home　About　Features　Contact
Contact Us



Structural reference — desktop navbar
Desktop
- Height: 76px.
- Content width: 1200px maximum.
- Left: logo.
- Center/right: navigation links.
- Right: Contact Us button.
- Sticky positioning.
- White or warm ivory background.
- On scroll: subtle border and shadow.
Mobile
- Height: 64px.
- Logo left.
- Menu icon right.
- Drawer slides from the right.
- Full-width navigation links.
- Contact Us CTA at drawer bottom.
Navigation order must remain:

Home → About → Features → How It Works → Benefits → Dashboard Preview → Contact.
8.2 Public footer
Three-column desktop layout:
1. Brand column: Logo, short SmartFarm description.
2. Navigation column: Home, About, Features, How It Works, Benefits.
3. Contact column: Approved contact details.
Bottom strip:
- Divider.
- Copyright.
- Approved legal links only.
Mobile: vertically stacked columns with the brand first.

No invented social media links or contact details.
8.3 Application shell
SmartFarm




MAIN MENU
Dashboard

Animals

Milk Production

Inventory

Workers

Reports

Settings


Dashboard
128
Animals

--
Milk today


Production chart area



Structural reference — application shell, illustrative only
Sidebar specification
Property	Specification
Expanded width	256px
Collapsed width	76px
Background	Surface
Active item	Primary Light
Active text	Primary
Icon	20px
Item height	44px
Item radius	8px
Group spacing	20px

Desktop: fixed sidebar.

Mobile: off-canvas drawer with overlay.

Farm Admin and Supervisor receive separate navigation configurations. Hidden permissions must also be enforced by the backend.
Application header
- Height: 68px.
- Breadcrumb or page context on left.
- Notifications and account controls on right.
- Page heading appears in the main content area.
- No oversized marketing-style header inside the application.
Main content
- Maximum content width: 1440px.
- Desktop horizontal padding: 32px.
- Tablet: 24px.
- Mobile: 16px.
- Standard section spacing: 24px.
- Card padding: 20–24px.
8.4 Super Admin shell
Use the same structural foundation but a more neutral operational treatment.
- Sidebar: white/light neutral.
- Active navigation: pale sage with green text.
- Header: white.
- Main canvas: warm ivory.
- Primary actions: Forest Green.
- No farm operational navigation.
Only these Super Admin navigation groups are included:
- Customer Management.
- Workspace Management.
- Farm Admin Management.
- Customer Access Management.
- Workspace Suspension.
8.5 Hero patterns
Public homepage hero — owner-approved Stitch override (25 November 2026)

The project owner approved adopting the Stitch Home hero composition and copy on 25 November 2026. This is the canonical Home hero and supersedes the earlier two-column layout reference. ACR-003, approved by the owner on 25 November 2026, authorizes the three exact Stitch-hosted Googleusercontent images on Public Home only; the owner accepts the unverified license and external-availability risk, and licensed local files replace them when supplied. On 26 November 2026 the owner supplied the official hero photograph and logo, which now replace the remote hero URL and the screenshot-cropped logo fallback under the ACR-003 follow-up; only the connected-dairy `aboutPasture` URL remains external pending a local file. Outside that narrow exception this override does not authorize Stitch export code, video, WebGL, canvas, GLB/GLTF, livestock models, simulations, new routes or any 3D in private surfaces. The ACR-002 CSS/static motif remains the fallback when the hero image fails to load.

- Full-viewport deep-forest editorial composition with the critical content in ordinary HTML.
- Eyebrow: short gold rule followed by "SMARTER DAIRY FARM MANAGEMENT".
- H1: "Every farm deserves a smarter tomorrow." (owner instruction 26 November 2026; Manrope 600, sentence case, −0.035em tracking, 1.08 line height)
- Supporting copy: "From animal care to milk production, bring everything that matters to your farm together in one simple, connected place." (owner instruction 26 November 2026; Inter 400, 17–19px, max-width 480–560px)
- Primary CTA: "Explore SmartFarm" → Features. Secondary CTA: "See How It Works" → How It Works.
- Public navigation CTA remains "Contact Us" under sitemap §1.1; it is not a hero CTA.
- Lower edge: neutral "Illustrative design preview — not live farm data" label and "Scroll to explore" cue. Never show a fictional farm name, live-status dot, quota or sync indicator.
- Background: owner-supplied photograph `apps/web/src/assets/hero-pasture.png` (copied unchanged from `design/images/Hero Image/Golden Pasture with Grazing Holsteins.png`, ACR-003 follow-up 26 November 2026) rendered with `object-fit: cover` and only localized dark scrims for navbar and text legibility — no heavy dark layer and no blur, the herd and landscape stay visible, and the copy sits in the natural left-side negative space. The ACR-002 CSS/static motif remains the fallback if the image fails to load.
- Headline face: Manrope 600 per the owner's 26 November 2026 typography instruction. The earlier Georgia/serif display-face exception for this H1 is withdrawn; Manrope remains the heading default everywhere else and Inter remains body text.
- Motion: restrained 150–250 ms reveal only; reduced motion shows the final state immediately. No autoplay or simulated activity. The one existing 30-second `animate-cinematic` pan on the owner-supplied hero photograph is retained by owner instruction 27 November 2026 as the sole continuous-motion exception; it is disabled under `prefers-reduced-motion`, and no other surface adds continuous motion.
- Mobile: eyebrow, H1, copy and stacked CTAs remain first in DOM and reading order; decorative motif follows.

The Home page follows the complete approved Stitch section order: hero, connected-dairy introduction, five-tab capability showcase, product-interface reveal, three-stage How It Works, three-card benefits and contact CTA. The Stitch navbar and footer visual language applies to all seven original approved public pages under ACR-004, approved by owner instruction on 25 November 2026 and later expanded to ten pages by ACR-007. Nav links resolve to approved hash routes (React Router `HashRouter`) so that About, Features, How It Works, Contact, Benefits and Dashboard Preview are reachable as pages; the footer lists the original routes plus the three informational links. The static signature strip sits after the footer on every public page. ACR-003 permits Stitch-hosted imagery on Public Home only; four inner pages use owner-supplied local hero photographs (ACR-004 addendum, 27 November 2026) while Benefits and Dashboard Preview keep the source-owned deep-forest gradient; the unavailable remote logo was first replaced by a local fallback cropped from the owner-supplied Stitch screenshot and is now the owner-supplied official logo `apps/web/src/assets/smartfarm-logo.png` (ACR-003 follow-up 26 November 2026). All other locked-rule substitutions remain mandatory: neutral illustrative values replace fake live metrics; no live-status, sync, quota or fictional-farm cues; no RFID/IoT, automation, invented formulas or unapproved herd-size field; and the brand strip is static rather than an infinite marquee.

Inner public-page hero
- Full-width warm ivory surface.
- Centered title and short supporting text.
- Maximum text width: 760px.
- Optional small icon or agricultural line illustration.
- No large photographic hero unless the sitemap explicitly requires one. Owner instruction 27 November 2026 adds four licensed local photographs as decorative hero backgrounds on About, Features, How It Works and Contact only (ACR-004 addendum); they sit behind a left-side scrim so the white hero copy stays legible, and Benefits/Dashboard Preview keep the deep-forest gradient. No external URL or new route is introduced.
Application page header
- Left aligned.
- Breadcrumb where applicable.
- H1 and short contextual subtitle.
- Primary CTA on right.
- On mobile: CTA moves below title, full-width when necessary.
Form page header
- Back navigation.
- H1.
- Short explanatory subtitle.
- No decorative hero image.
8.6 Card patterns
A. KPI card
- Surface background.
- Small label.
- Large value.
- Unit.
- Optional comparison/period.
- Small relevant Lucide icon.
- No arbitrary gradients.
B. Data card
- Heading and supporting action.
- Structured content.
- Consistent 20px padding.
- Border and 12px radius.
C. Feature card
- Icon at top.
- Heading.
- Short description.
- Optional text link.
- Used on the public website only.
D. Profile card
- Image/avatar.
- Entity name and ID.
- Status.
- Important metadata.
- Role-authorized actions.
E. Chart card
- Heading.
- Period selector where supported.
- Chart.
- Axis labels, units and legend.
- Supporting totals.
8.7 CTA patterns
Type	Treatment
Primary	Forest Green background, white text
Secondary	White/surface, green border and text
Tertiary	Text button, green
Destructive	Error background/text
Disabled	Muted surface, muted text

Dimensions:
- Standard height: 44px.
- Large public CTA: 48px.
- Small table action: 32px.
- Radius: 8px.
Button text must describe the action: Save, Add Animal, Submit Inquiry, Export, Approve.

9. Public website — page-by-page blueprint
9.1 HOME
Canvas: Warm ivory. Maximum width 1200px.

1. Navbar
- 76px horizontal navigation.
- Logo on left, approved links in the center/right.
- Contact Us primary CTA.
- Sticky state and mobile drawer.
2. Hero
- Two-column 52/48 split.
- Left: eyebrow, large H1, two-line supporting paragraph, primary and secondary CTA.
- Right: authentic dairy farm photograph.
- Sage organic shape behind image.
- Entrance fade and image reveal.
3. About SmartFarm
- Two-column layout, 45/55.
- Left: agricultural line illustration or farm photograph.
- Right: H2, product introduction, value proposition and short supporting text.
- No additional CTA unless the approved section content requires it.
4. Features
- Centered H2 and introductory paragraph.
- Eight cards in a four-column desktop grid, two-column tablet grid and one-column mobile grid.
- Cards: Animal Management, Animal Health, Milk Production, Inventory & Feeding, Workers & Attendance, Payroll & Finance, Equipment, Reports & Data.
- Lucide icon above heading.
- One concise description per card.
- Explore SmartFarm / Contact Us CTAs below the grid.
5. How It Works
- Centered section heading.
- Three-column numbered workflow layout.
- Step number, icon/illustration, title and explanation.
- Use a connecting line between steps on desktop.
- Stack vertically on mobile.
- Subtle scroll reveal.
6. Benefits
- Split layout: benefit list on left, supporting image/illustration on right.
- Five benefit rows with icon, heading and description.
- Benefits: centralized records, operational visibility, production organization, health and feeding oversight, worker and financial management.
7. Dashboard Preview
- H2 and short introduction.
- Large product preview centered in a framed dashboard mockup.
- Below: KPI preview strip and milk production chart preview.
- Label design previews clearly when actual screenshots are unavailable.
- Contact Us CTA below.
- Restrained reveal.
8. Contact Inquiry
- Two-column layout.
- Left: heading, inquiry instructions and approved contact information.
- Right: form card.
- Use only approved inquiry fields.
- Required indicators, field-level validation and submit CTA.
- Success/error feedback.
- Do not add registration or checkout.
9. Footer
- Reusable three-column public footer.
- Brand, navigation and approved contact details.
- Bottom copyright strip.

10. Super Admin — page-by-page blueprint
All pages use the Super Admin shell. Canvas: #F7F7F1; cards: white; primary action: Forest Green.
10.1 SUPER ADMIN LOGIN
1. Login Header
   - Centered brand lockup.
   - Small Super Admin identification label.
2. Login Form
   - Centered card, maximum width 420px.
   - Email/login identifier.
   - Password field with visibility toggle.
   - Field-level errors.
3. Login Actions
   - Full-width Sign In button.
   - Loading state.
   - Authentication error beneath the button.
4. Login Footer
   - Minimal copyright text.
No public navbar, promotional image or registration link.
10.2 SUPER ADMIN DASHBOARD
1. Platform Header
   - Dashboard heading.
   - Account controls.
2. Platform Overview
   - Four-column KPI grid.
   - Customer count, workspace count and approved access-status metrics.
   - Use actual backend values only.
3. Customer and Workspace Summary
   - Two-column chart/table cards.
   - Customer summary on left.
   - Workspace summary on right.
4. Platform Activity
   - Full-width activity table.
   - Actor, activity, date/time and status.
5. Quick Actions
   - Three action cards or buttons: Add Customer, Manage Customers, Manage Workspaces.
10.3 CUSTOMER MANAGEMENT
1. Page header with Add Customer CTA.
2. Four KPI summary cards.
3. Search/filter toolbar: search, applicable customer filters and sorting.
4. Full-width customer table with identity, approved details, status and workspace.
5. Pagination with 10/25/50/100 options.
6. Toast and confirmation feedback.
Desktop: full table. Mobile: responsive record cards with preserved actions.
10.4 ADD CUSTOMER
1. Header with back link.
2. Customer Information form in a single-column card, with two-column field layout on desktop.
3. Workspace Registration Information in a visually separated subsection.
4. Save/Create Customer primary CTA and Cancel secondary CTA.
5. Validation and confirmation feedback.
Only SRS-confirmed fields are permitted. Do not invent extra customer fields.
10.5 WORKSPACE MANAGEMENT
1. Header and authorized management actions.
2. Workspace KPI cards.
3. Search and status filters.
4. Full-width workspace table: identity, customer, status and Farm Admin.
5. Workspace action area for approved provisioning and access management.
6. Pagination and feedback.
10.6 FARM ADMIN MANAGEMENT
1. Header.
2. Account-status overview cards.
3. Search and account-status filters.
4. Farm Admin table: identity, customer, workspace and access status.
5. Provisioning form/modal connected to approved workspace setup.
6. Confirmation and success/error feedback.
10.7 CUSTOMER ACCESS MANAGEMENT
1. Header.
2. Customer search and selection control.
3. Two-column information panel: customer/workspace on left; Farm Admin/account status on right.
4. Access-management controls in a dedicated card.
5. Confirmation dialog summarizing the exact access change.
6. Updated status and action feedback.
10.8 WORKSPACE SUSPENSION
1. Header.
2. Workspace search and selection.
3. Workspace and customer information card.
4. Current status and access details.
5. Suspension action in a distinct warning treatment.
6. Confirmation dialog with workspace identity and consequences.
7. Result status and feedback.
Suspension must never happen from a single accidental click.

11. Private farm application — page-by-page blueprint
The following specification uses the shared Farm Application shell. Navigation visibility and page actions must be derived from the approved role permissions.
11.1 DASHBOARD
Farm Admin Dashboard
1. Page header: Dashboard, date/context information.
2. Farm overview: KPI grid for animal statistics and approved farm indicators.
3. Milk production: full-width chart card, daily/morning/evening values.
4. Animal health: two-column alert and vaccination reminder cards, severity labels.
5. Feeding and inventory: two-column stock and feeding panels.
6. Worker and attendance: attendance KPI cards and summary.
7. Financial summary: income/expense cards and chart.
8. Recent activity: full-width timeline/table.
9. Dashboard customization: widget configuration controls at the bottom.
Farm Supervisor Dashboard
1. Page header: Dashboard and operational context.
2. Daily operational overview: simplified KPI cards.
3. Milk production: production summary and Production Entry CTA.
4. Attendance: check-in/check-out controls and daily summary.
5. Feeding: assigned plan and Actual Feeding Entry CTA.
6. Animal operations: permitted animal records.
7. Health operations: permitted records only; no High/Critical health alert access.
8. Equipment: condition summary and maintenance recording access.
9. Operational notifications: authorized notification list.
The Supervisor dashboard must not show payroll, finance, farm settings or data management.
11.2 ANIMAL MANAGEMENT
Animal List
1. Header: Animal List; Add Animal for Farm Admin only.
2. Animal KPI summary.
3. Search, group and status filters.
4. Animal table: identification, animal information, group and status.
5. Pagination.
6. Empty, no-results and error states.
Add/Edit Animal
1. Header with back navigation and mode-specific title.
2. Animal Identification card.
3. Animal Details card, including characteristics and group.
4. Parent and Calf Information card.
5. Purchase and Lifecycle Information card.
6. Photos and Attachments card.
7. Save and Cancel actions.
8. Field-level validation and save feedback.
Animal Profile
1. Profile header: animal photo, identification, status and authorized management actions.
2. Animal Overview: two-column metadata grid.
3. Lifecycle Information: purchase and lifecycle summary.
4. Health Summary: permitted health records.
5. Milk Production Summary: production chart.
6. Weight Summary: latest weight and trend chart.
7. Related Records: Lifecycle History, Weight History and supporting records as navigation links/tabs.
Lifecycle History
1. Header with animal identity and back navigation.
2. Lifecycle status summary.
3. Chronological lifecycle timeline/table.
4. Authorized record actions and confirmation feedback.
Weight History
1. Header with animal identity.
2. Current weight KPI card and unit.
3. Full-width weight trend line chart with date/weight axes and tooltips.
4. Weight records table.
5. Authorized add/edit controls and validation.
11.3 ANIMAL HEALTH
Health Records
1. Header and authorized management actions.
2. Health overview KPI cards.
3. Search/filter toolbar: animal, date and severity.
4. Health records table with animal, event, date, severity and status.
5. Record detail drawer or page panel.
6. Loading, empty, error and success feedback.
Severity colors: Low green, Moderate gold, High orange, Critical red. Always display text labels alongside colors.
Treatments
1. Header with authorized Add Treatment CTA.
2. Search/filter toolbar.
3. Treatment records table.
4. Treatment detail panel.
5. Create/edit form and feedback.
Vaccinations
1. Header with Add Vaccination CTA.
2. Overview cards for records and due/upcoming reminders.
3. Search and status/date filters.
4. Vaccination table.
5. Vaccination details.
6. Reminder information and feedback.
Veterinary Appointments
1. Header with Add Appointment CTA.
2. Appointment overview cards.
3. Animal/date/status filters.
4. Appointment records table.
5. Appointment detail panel.
6. Management actions and feedback.
Disease History
1. Header.
2. Disease overview cards.
3. Animal/date/severity filters.
4. Disease records table.
5. Related treatment and health references.
6. Empty/loading/error feedback.
Supervisor access must exclude restricted High/Critical information as defined by permissions.
11.4 MILK PRODUCTION
Production Entry
1. Header.
2. Date and morning/evening session card.
3. Animal search/selection.
4. Production form with quantity, unit and Good/Average/Poor quality selection.
5. Validation summary.
6. Save Production and Cancel buttons.
7. Save feedback.
Use a clean form, not a dashboard-style layout.
Animal Production History
1. Header.
2. Animal selector.
3. Production summary cards and selected period.
4. Production chart with session comparisons where supported.
5. Production records table.
6. Date filters and feedback.
Daily Totals
1. Header with date selector.
2. Farm production KPI cards: daily, morning and evening totals.
3. Animal-level breakdown in a table or supported chart.
4. Daily production records.
5. Full-width daily production chart.
6. Loading/empty/error feedback.
Monthly Reports
1. Header.
2. Month/year selector.
3. Monthly production KPI cards.
4. Monthly production chart.
5. Daily and animal breakdown.
6. Monthly production data table.
7. Export and Print actions.
11.5 MILK MANAGEMENT
Collection
1. Header.
2. Collection overview KPI cards.
3. Collection records table with date/time, quantity and session.
4. Collection detail panel.
5. Authorized record actions.
6. Validation and feedback.
Storage
1. Header.
2. Current storage overview with quantity and units.
3. Storage records table.
4. Storage detail panel.
5. Authorized operations and confirmation feedback.
Milk Sales
1. Header with Add Sale CTA.
2. Sales KPI cards for totals and payment status.
3. Search, date and payment-status filters.
4. Sales table with customer, quantity, price, payment method, status and date.
5. Sale details panel.
6. Authorized sale actions.
7. Success/error/loading/empty feedback.
Wastage Records
1. Header with Add Wastage CTA.
2. Wastage and estimated loss summary cards.
3. Date and record filters.
4. Wastage records table.
5. Detail panel.
6. Record actions and feedback.
11.6 INVENTORY
Inventory List
1. Header.
2. Stock KPI cards and low-stock/expiry indicators.
3. Search and category filters: Feed, Medicines, Other.
4. Inventory table with item, category, quantity, unit and expiry.
5. Pagination.
6. Feedback states.
Item Details
1. Header with item name, category and permitted actions.
2. Item overview card.
3. Stock information panel.
4. Purchase/addition history table.
5. Adjustment/usage history table.
6. Role-appropriate actions.
Purchases
1. Header with Add Purchase CTA.
2. Purchase summary.
3. Item/date/category filters.
4. Purchase records table.
5. Purchase detail panel.
6. Authorized purchase actions and feedback.
Stock Additions
1. Header with Add Stock CTA.
2. Item selector.
3. Addition form with quantity, unit and supporting details.
4. Addition history table.
5. Save and Cancel actions.
6. Validation and feedback.
Stock Adjustments
1. Header.
2. Item selector.
3. Current stock summary.
4. Adjustment form with quantity and reason.
5. Adjustment history table.
6. Save Adjustment and Cancel actions.
7. Confirmation and result feedback.
Farm Admin only.
11.7 FEEDING
Feeding Plans
1. Header.
2. Plan overview cards.
3. Search and animal/group/status filters.
4. Plan records table.
5. Plan details panel with feed items, quantities, assignments and schedules.
6. Role-appropriate actions.
Feeding Schedule
1. Header.
2. Schedule overview: morning/evening and configured custom schedules.
3. Date and animal/group filters.
4. Schedule records in chronological table/list format.
5. Schedule details panel.
6. Loading, empty and error states.
Actual Feeding Records
1. Header.
2. Feeding date and schedule/session selector.
3. Animal/group selector.
4. Actual feeding form: feed item, quantity, unit and details.
5. Recorded feeding history.
6. Save Feeding Record and Cancel.
7. Validation and feedback.
11.8 WORKERS
Worker List
1. Header with Add Worker CTA for Farm Admin.
2. Worker KPI summary.
3. Search and status filters.
4. Worker table with identity, relevant details and employment information.
5. Pagination.
6. Feedback states.
Worker Profiles
1. Profile header with identity and relevant profile information.
2. Worker Information metadata card.
3. Identification Information section, including CNIC and applicable uniqueness validation.
4. Worker Documents section.
5. Related Attendance information.
6. Other authorized related records.
7. Management actions and feedback.
Worker Documents
1. Header.
2. Worker selector.
3. Document overview.
4. Document records table with name, type and details.
5. Authorized upload/management controls.
6. Validation and feedback.
11.9 ATTENDANCE
Attendance Records
1. Header.
2. Attendance KPI cards.
3. Date and worker filters.
4. Attendance table with worker, date, status, check-in/out and overtime.
5. Attendance detail panel.
6. Actions and feedback.
Check-in/Check-out
1. Header.
2. Worker selection.
3. Attendance date.
4. Large check-in/check-out action panel.
5. Current attendance status.
6. Overtime entry where supported.
7. Confirmation and feedback.
The two main attendance actions must be visually distinct and easy to use on mobile.
Leave Management
1. Header.
2. Leave overview cards.
3. Worker/date/status filters.
4. Leave records table.
5. Leave detail panel.
6. Farm Admin-only approval/rejection controls and confirmation.
7. Feedback.
11.10 PAYROLL
Farm Admin only
Salary Management
1. Header.
2. Worker selector.
3. Salary information card: wage type and salary amount.
4. Attendance-related calculation information.
5. Salary records table with effective dates.
6. Authorized management actions.
7. Validation and confirmation.
Payroll Records
1. Header.
2. Payroll period selector.
3. Payroll KPI summary.
4. Payroll records table with worker, wage, attendance, adjustments and payment status.
5. Payroll detail panel with calculation breakdown.
6. Authorized actions and confirmation.
7. Loading, empty and error states.
Advances
1. Header.
2. Worker selector.
3. Advance entry form with amount, date and details.
4. Advance history table.
5. Save action, validation and confirmation.
Deductions
1. Header.
2. Worker selector.
3. Deduction entry form.
4. Deduction history table.
5. Save action, validation and confirmation.
Payslips
1. Header.
2. Worker and payroll period selection.
3. Payslip information.
4. Printable payslip preview in a document-style white sheet.
5. Download PDF and Print actions.
Do not style the payslip as a marketing card. Use a formal printable document structure.
11.11 FINANCE
Farm Admin only
Income Records
1. Header with Add Income CTA.
2. Income KPI cards.
3. Date/category/search filters.
4. Income records table.
5. Income detail panel.
6. Authorized actions and feedback.
Expense Records
1. Header with Add Expense CTA.
2. Expense KPI cards.
3. Date/category/search filters.
4. Expense records table.
5. Expense detail panel.
6. Authorized actions and feedback.
Financial Dashboard
1. Header.
2. Daily/weekly/monthly/custom reporting period selector.
3. Financial KPI cards: income, expenses and approved profit/loss.
4. Income vs expense comparison chart.
5. Financial trend chart.
6. Financial records summary.
7. Report/export actions.
11.12 EQUIPMENT
Equipment List
1. Header.
2. Equipment KPI and condition indicators.
3. Search and condition/status filters.
4. Equipment records table.
5. Pagination.
6. Feedback.
Equipment Details
1. Profile header with name, ID, condition and authorized actions.
2. Equipment information card.
3. Maintenance summary.
4. Usage summary.
5. Related History links: Maintenance History and Usage Records.
6. Feedback.
Maintenance History
1. Header with equipment identification.
2. Maintenance overview.
3. Maintenance records table.
4. Maintenance detail panel.
5. Farm Admin management and Supervisor permitted maintenance/condition update actions.
6. Feedback.
Usage Records
1. Header with equipment identification.
2. Usage overview.
3. Usage records table.
4. Usage detail panel.
5. Authorized usage actions.
6. Feedback.
11.13 NOTIFICATIONS
Notification Center
1. Header.
2. Notification summary with unread/read counts.
3. Read/unread and category filters.
4. Notification list with icon, message, timestamp and status.
5. Notification details panel.
6. Read/unread and authorized actions.
7. Empty/loading/error states.
Notification History
1. Header.
2. Category, date and read/unread filters.
3. Historical notification records.
4. Full detail panel.
5. Feedback states.
11.14 REPORTS
Milk Reports
1. Header.
2. Reporting period selector.
3. Production KPI cards with morning/evening totals.
4. Production chart.
5. Animal production breakdown.
6. Structured report table.
7. Export and Print actions.
Financial Reports
1. Header.
2. Daily/weekly/monthly/custom period selector.
3. Financial summary.
4. Approved financial charts.
5. Structured financial data.
6. PDF, Excel and Print actions.
Available Data Exports
1. Header.
2. Exportable data category cards/list.
3. Data selection and applicable filters.
4. Excel/CSV format selector.
5. Export CTA.
6. Loading, success, error and no-data feedback.
11.15 SETTINGS
Farm Admin only
All settings pages use a common layout: left-aligned page header, standard settings card, field groups and bottom Save Changes / Cancel actions.
Farm Profile
1. Header.
2. Farm information form.
3. Profile details.
4. Save Changes and Cancel.
5. Validation and feedback.
Units
1. Header.
2. Measurement preference section.
3. Unit configuration controls.
4. Save Changes and Cancel.
5. Validation and feedback.
Currency
1. Header.
2. Currency selection.
3. Numeric and currency formatting preview.
4. Save Changes and Cancel.
5. Confirmation and feedback.
Timezone
1. Header.
2. Timezone selection.
3. Date/time context preview.
4. Save Changes and Cancel.
5. Validation and feedback.
Preferences
1. Header.
2. Date/time format settings.
3. Numeric grouping and precision.
4. Approved application preferences, including theme preference where supported.
5. Save Changes and Cancel.
6. Feedback.
Notifications Settings
1. Header.
2. Notification preferences.
3. In-app and supported email delivery controls.
4. Notification configuration.
5. Save Changes and Cancel.
6. Delivery-related and save feedback.
Configuration
1. Header.
2. Approved module configuration.
3. Farm-specific configuration.
4. Save Changes and Cancel.
5. Confirmation and feedback.
11.16 DATA MANAGEMENT
Farm Admin only
Import
1. Header.
2. Import category selection.
3. Excel/CSV file upload card.
4. File and field validation.
5. Import review with issues/warnings.
6. Confirm Import and Cancel.
7. Import outcome.
Export
1. Header.
2. Data category selection.
3. Date range and applicable filters.
4. Excel/CSV format selector.
5. Export CTA.
6. Loading and success/error feedback.
Backup Configuration
1. Header.
2. Backup overview.
3. Automatic/manual and supported local/cloud configuration.
4. Backup history table.
5. Manual backup and configuration save actions.
6. Confirmation and feedback.
7. Restore workflows must not be designed or enabled until the client confirms backup/recovery requirements.
Activity Logs
1. Header.
2. Search, date and activity filters.
3. Activity records table with actor, event, date/time and related record.
4. Activity details panel.
5. Loading, empty and error states.

12. Responsive design specification
Every page must support desktop, tablet and mobile.
Property	Desktop	Tablet	Mobile
Main content padding	32px	24px	16px
KPI columns	4	2	2
Feature columns	4	2	1
Form columns	2	2	1
Card padding	24px	20px	16px
Sidebar	Fixed	Collapsible	Drawer
Tables	Full table	Responsive	Stacked records
Chart height	300px	260px	220px

Breakpoints
- Mobile: below 640px.
- Tablet: 640–1023px.
- Desktop: 1024–1439px.
- Wide desktop: 1440px and above.
Additional rules:
- Never allow horizontal page overflow.
- Preserve primary actions on small screens.
- Forms must have full-width mobile inputs.
- Tables must retain all essential information when converted into mobile record cards.
- Dialogs must fit within mobile viewport height.
- Charts must remain readable and must not rely on hover-only interactions.
13. Data visualization specification
Use a consistent 2D chart system across the application.
Chart	Application
Line	Milk production and animal weight trends
Bar	Daily/monthly production
Grouped bar	Morning vs evening production
Doughnut	Appropriate categorical summaries
Horizontal bar	Income and expense comparison
Table	Detailed operational and financial records

Chart colors
- Forest Green: primary series.
- Pasture Green: secondary series.
- Harvest Gold: comparison series.
- Muted gray: reference data.
- Semantic colors: actual status information.
Chart requirements:
1. Every chart must have a meaningful title.
2. Display measurement units.
3. Display readable axes.
4. Include legends where multiple series exist.
5. Provide tooltips.
6. Support empty data states.
7. Do not create fictional values.
8. Never animate data as if new production is occurring.
9. Respect the farm's configured units and date/time preferences.
14. Forms, tables and interaction standards
Forms
- Labels above inputs.
- Required indicator beside required labels.
- Helper text below fields where necessary.
- Validation immediately below the relevant field.
- Consistent input height: 44px.
- Focus border: Primary Green.
- Disabled background: Surface Alt.
- Save button aligned bottom-right on desktop.
- Save button full-width or appropriately stacked on mobile.
Tables
- Header background: Surface Alt.
- Row height: 52–60px.
- Text: 13–14px.
- Header: 12px semibold.
- Borders: Border token.
- Status displayed as text plus a semantic badge.
- Actions aligned to the right.
- Pagination below the table.
Confirmation dialogs
Every important destructive or access-changing action must use:
1. Dialog title.
2. Clear explanation.
3. Affected record identification.
4. Consequence.
5. Confirm action.
6. Cancel action.
Do not use browser-default confirmation dialogs.
15. Accessibility and usability
Mandatory:
- WCAG 2.2 AA contrast target.
- Keyboard navigation.
- Visible focus indicators.
- Associated form labels.
- Accessible modal focus management.
- Descriptive button labels.
- Screen-reader-friendly status updates.
- Text labels alongside semantic colors.
- Reduced-motion support.
- Touch-friendly mobile controls.
- No color-only information encoding.
16. Theme implementation
Both themes required
SmartFarm supports Light Mode and Dark Mode throughout the public website and authenticated application.

Theme selection:
- Light.
- Dark.
- System.
The application should use semantic design tokens rather than hardcoded component colors.
Element	Light	Dark
Main canvas	Warm Ivory	Deep Charcoal Green
Cards	White	Deep Green Surface
Main text	Deep Charcoal Green	Soft White
Borders	Light Sage Gray	Dark Sage Gray
Primary button	Forest Green	Light Pasture Green
Active navigation	Pale Sage	Dark Sage
Charts	Green/Gold	Light Green/Gold

Do not change the brand identity when switching themes.
17. Component implementation inventory
Stitch should create reusable components rather than separately designing identical elements on every page.
Component	Reuse
Public Navbar	All public pages
Public Footer	All public pages
Public Hero	Home and approved inner-page contexts
Application Sidebar	Farm application
Application Header	Farm application
Super Admin Sidebar	Super Admin
Super Admin Header	Super Admin
Page Header	All authenticated pages
KPI Card	All dashboards and overviews
Data Table	Management pages
Search Filter Bar	Listing pages
Status Badge	All relevant records
Profile Header	Animal, worker and equipment
Chart Card	Dashboard and reporting pages
Form Section Card	Create/edit/settings
Confirmation Dialog	Important actions
Detail Drawer	Record inspection
Empty State	All data-driven pages
Loading Skeleton	All data-driven pages
Toast Notification	All authenticated areas
Pagination	Supported listing pages
File Upload	Attachments/import
Date Range Selector	Reporting pages
Theme Selector	Supported application preferences

18. Strict exclusions
The UI generator must not create:
- Any additional page outside the approved sitemap.
- Breeding management.
- Multi-farm switching.
- Super Admin farm-data support access.
- Unapproved account registration.
- Checkout or online payment workflows.
- Unconfirmed calculation features.
- Backup restoration controls.
- 3D livestock models.
- WebGL scenes.
- Interactive 3D environments.
- Fake dashboard data presented as real.
- Unapproved social integrations.
- Unapproved legal pages.
- Unapproved notification channels.
- Unconfirmed fields or workflows.
19. Stitch implementation instructions
The following requirements override any automatic design choices made by Stitch.
Implementation contract
Locked

1. Use the exact SmartFarm color palette documented above.
2. Use Manrope for headings and Inter for body/interface text.
3. Use Lucide outline icons consistently.
4. Use the specified reusable navigation, footer, card and CTA structures.
5. Follow the page-by-page section ordering exactly.
6. Do not introduce additional sections or pages.
7. Keep Super Admin, Farm Admin and Farm Supervisor experiences distinct.
8. Implement light and dark themes.
9. Use realistic dairy photography only in approved public and profile contexts.
10. Use real data bindings for operational charts and KPIs.
11. Use the documented responsive breakpoints.
12. Include loading, empty, error, disabled, success and validation states.
13. Respect the role-permission matrix.
14. Use only the ACR-002 approved CSS/static decorative Home hero motif; never use WebGL or any other 3D.
15. Do not replace the specified layouts with generic SaaS templates.

20. Final design acceptance checklist
Design QA progress
0/16



[ ] Brand colors and semantic tokens implemented
[ ] Manrope and Inter typography implemented
[ ] Light and dark themes implemented
[ ] Public navbar and footer consistent
[ ] Super Admin shell implemented separately
[ ] Farm Admin navigation permission-aware
[ ] Farm Supervisor navigation permission-aware
[ ] Every sitemap page implemented
[ ] Section order matches the sitemap
[ ] Reusable cards, forms and tables implemented
[ ] Charts use real data and configured units
[ ] Responsive desktop, tablet and mobile layouts
[ ] All required interaction states implemented
[ ] Accessibility and reduced motion supported
[ ] No unapproved pages or workflows
[ ] No 3D, WebGL or simulated operational activity


Final design decision: SmartFarm is a forest-green, warm-neutral, modern agricultural management platform. Its public experience is welcoming and photographic; its Super Admin experience is restrained and administrative; its Farm application is operational, data-focused and permission-aware.

This blueprint establishes the visual and structural implementation contract. Any unresolved business logic, field definitions, calculations or permission details must still follow the approved SRS and business rules rather than being invented by the UI generator.