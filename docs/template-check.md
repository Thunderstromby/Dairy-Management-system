allowed. just do this what it says














SmartFarm — Free template sourcing and comparison report
Objective: Identify free Framer and open-source templates that could support the approved SmartFarm design blueprint and sitemap.

Evaluation standard: The SmartFarm SRS, Business Rules, Role & Permission Matrix, Design System and Section-wise Sitemap are the source of truth. A template is suitable only if it can support those requirements without forcing changes to the approved product.
1. Public website candidates
Agriculture, farming and business website references










1. AgriWorks — Framer
Strong visual reference
Source: Framer Marketplace
- License: Limited; free remix.
- Agricultural machinery and agribusiness presentation.
- Eleven-section enquiry journey, product specifications, dealer information and quote form.
- Editable in Framer's visual editor; not a downloadable React/HTML project.
- Fit: Useful for the public site's structured sections and inquiry experience, but its machinery-sales focus does not match SmartFarm's dairy-management product.













2. Krishimati — Framer
Strong industry reference
Source: Framer Marketplace
- License: Limited; free remix.
- Farming and farmer website, multiple pages, responsive layouts and CMS.
- Includes an editable Figma file and Framer visual editing.
- Fit: Strong agricultural identity and useful visual inspiration; not a dairy software product website structure.













3. Furrow — Framer
Strong agricultural storytelling reference
Source: Framer Marketplace
- License: Limited; free remix.
- 17 pages and 8 CMS collections.
- Farming calendar, herd and crop pages, enquiry forms and farm diary.
- Editable inside Framer; not a standalone exported React/HTML source project.
- Fit: Good agricultural storytelling, but its farm-shop and farm-contractor workflows are outside SmartFarm's approved scope.













4. Furrow — uiCookies HTML
Best editable agricultural reference
Source: Template details · License
- License: Free for personal, commercial and client work; attribution optional.
- Three HTML pages, Bootstrap 5.3.8 and vanilla JavaScript.
- Files can be downloaded, edited and hosted independently.
- Fit: Useful for natural agricultural imagery, warm colors and visual storytelling. Its shop and farm-visit content must not be imported into SmartFarm.













5. HTML5 UP
General-purpose reference
Source: HTML5 UP · License
- License: Creative Commons Attribution 3.0.
- Downloadable HTML, CSS and JavaScript.
- Fit: Responsive layouts and section composition, but no dairy-specific design or SmartFarm workflows. Attribution is required.



2. Application panel candidates
React, Tailwind, dashboard and component foundations










6. Mosaic Lite React — Cruip
Strong panel-layout reference
Source: GitHub repository · Cruip free templates
- License: GPL.
- React and Tailwind CSS; downloadable source code.
- Dashboard layout, charts, cards and admin interface patterns.
- Fit: Strong structural reference for Super Admin and farm dashboards, but generic dashboard content needs complete replacement.
- Important: GPL is not equivalent to MIT. Review the obligations before incorporating or distributing modified code.













7. TailAdmin React
Strong technical foundation candidate
Source: GitHub React repository
- License: MIT for the free community version.
- React 19, TypeScript and Tailwind CSS v4.
- Includes sidebar, charts, forms, tables, authentication elements and dark mode.
- Fit: Good foundation for the application shell and reusable dashboard patterns. Its free version is limited compared with Pro; don't assume paid screens are included.
- Editable through downloaded React source code.













8. Watermelon UI
Good reusable component source
Source: Free React collections
- License: MIT, according to its free collection page.
- React dashboard templates, Tailwind components and shadcn-style blocks.
- Copy/install source into a project and edit it directly.
- Fit: Useful for cards, filters, tables, forms and dashboard building blocks. Not a complete SmartFarm implementation.













9. shadcn/ui
Recommended component foundation
Source: Official GitHub repository · Documentation
- License: MIT.
- Accessible, customizable, open-code components.
- Copy components into the application and modify their source.
- Fit: Excellent for dialogs, forms, dropdowns, tabs, tables and other shared UI elements. It is a component system, not a complete SmartFarm dashboard.













10. Tailwind Admin React
Alternative dashboard candidate
Source: GitHub repository
- License: MIT.
- React 19, Tailwind CSS v4, Zustand, 25 pages and dark mode.
- Downloadable React source.
- Fit: Potentially useful for admin screens, but generic screens and workflows would need to be replaced.













11. Admin One — JustBoil
Alternative dashboard candidate
Source: GitHub repository
- License: MIT.
- React, Next.js, TypeScript and Tailwind CSS v4.
- Downloadable source and light/dark designs.
- Fit: Useful for dashboard shell and theme reference; not dairy-specific.



3. Framer editing versus source-code editing
This distinction matters before selecting any Framer template.
Candidate type	How it is edited	Independent source files?
Framer templates	Visual editor, remix and Framer Agent	No official HTML export for self-hosting
HTML5 UP	Download and edit files	Yes — HTML/CSS/JS
uiCookies Furrow	Download and edit files	Yes — HTML/CSS/JS
Mosaic Lite	Clone/download repository	Yes — React source
TailAdmin	Clone/download repository	Yes — React source
shadcn/ui	CLI or copy source components	Yes — components become project code
Watermelon UI	Copy/install source	Yes — project-owned components

Framer's official help documentation explicitly says published sites cannot be exported as standalone HTML for self-hosting. Therefore, a Framer remix is not the right production-code foundation for a React application that needs independent source control. 
Framer+2


License caution: Framer's free remix and Limited license do not mean unrestricted ownership or redistribution. The individual template license must be checked. The paid Agriculture template at $69 is excluded from this free-only comparison. 
Website Template for Framer+2

4. Fit against the approved SmartFarm sitemap
The following compares what the templates can contribute—not whether they already implement the required pages.
SmartFarm area	Best candidate reference	Actual fit
Public Home	AgriWorks + uiCookies Furrow	Visual structure and agricultural storytelling
About	Krishimati + Furrow	Farming identity and storytelling
Features	Original SmartFarm UI	Must explain actual SmartFarm modules
How It Works	Original SmartFarm UI	Must represent approved product journeys
Benefits	AgriWorks	Section composition and visual hierarchy
Dashboard Preview	Original SmartFarm UI	Must show genuine SmartFarm capabilities
Contact Inquiry	AgriWorks + Furrow	Form layout inspiration
Super Admin Dashboard	Mosaic Lite / TailAdmin	Dashboard layout and reusable patterns
Customer Management	TailAdmin / shadcn	Tables, filters and dialogs
Workspace Management	TailAdmin / shadcn	Forms and management layouts
Farm Admin Dashboard	Mosaic Lite / TailAdmin	Dashboard composition
Animal Management	Original SmartFarm UI	Dairy-specific records and workflows
Animal Health	Original SmartFarm UI	Health records and approved alert handling
Milk Production	Original SmartFarm UI	Milk production data and visualizations
Milk Management	Original SmartFarm UI	Approved milk-management workflows
Inventory and Feeding	Original SmartFarm UI	Farm-specific operational screens
Workers and Attendance	TailAdmin / shadcn	Table and form patterns
Payroll and Finance	Original SmartFarm UI	Must follow business rules
Equipment	TailAdmin / shadcn	Management table patterns
Notifications and Reports	TailAdmin / shadcn	Notification and reporting components
Settings and Data Management	shadcn	Forms, dialogs and settings patterns
Farm Supervisor	Original SmartFarm UI	Permission-restricted version of farm interface

Important: None of the candidates implements the complete SmartFarm sitemap, business rules or permission matrix. Their layouts cannot be treated as proof that a SmartFarm workflow is implemented.
5. Overall comparison
Candidate	Industry fit	Code editability	License suitability	Recommendation
AgriWorks	High	Framer only	Limited	Visual reference
Krishimati	High	Framer only	Limited	Visual reference
Framer Furrow	High	Framer only	Limited	Visual reference
uiCookies Furrow	High	HTML/CSS/JS	Commercial-friendly	Public visual reference
HTML5 UP	Low	HTML/CSS/JS	Attribution required	Optional reference
Mosaic Lite	Medium	React source	GPL	Layout reference
TailAdmin	Medium	React source	MIT	Technical reference
Watermelon UI	Medium	Copyable source	MIT	Component reference
shadcn/ui	Low industry fit	Copyable source	MIT	Component foundation
Tailwind Admin	Medium	React source	MIT	Alternative
Admin One	Medium	React source	MIT	Alternative

6. Final recommendation
Recommended approach
Generate an original SmartFarm UI
Do not adopt any candidate as the complete product template.

Public website

Use AgriWorks for section composition and enquiry patterns, uiCookies Furrow for agricultural visual inspiration, and our own SmartFarm brand identity.

Application panels

Use Mosaic Lite for dashboard layout inspiration, TailAdmin as an optional React technical reference, and shadcn/ui for reusable accessible components.

Original development

Build separate Super Admin, Farm Admin and Farm Supervisor experiences according to the approved sitemap and permission matrix.

Sources and direct links
Resource	Link
AgriWorks	Framer template
Krishimati	Framer template
Framer Furrow	Framer template
HTML Furrow	uiCookies template
HTML5 UP	License and template site
Mosaic Lite	GitHub source
TailAdmin	React source
Watermelon UI	Free components
shadcn/ui	GitHub source
Tailwind Admin	GitHub source
Admin One	GitHub source

Final decision: Original SmartFarm UI, informed by these references. No paid template is required, and no existing template should override the project documents.