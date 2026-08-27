# IIIT BHAGALPUR Convocation — Design System

**Version:** 1.0  
**Owner:** Web Design Systems Team  
**Scope:** Convocation portal (public-facing) — Registration, Schedule, Gallery, Archive, Information

This document defines the visual and functional language for the convocation website. It is the single source of truth for design tokens, visual specifications, component behavior, accessibility, and responsive behavior.

**Implementation rule:** All UI work must reference semantic or primitive design tokens rather than hard-coded color, spacing, typography, radius, or elevation values.

---

## 1. Design Principles

| Principle | Description |
|---|---|
| Formal Prestige | The visual language reflects academic tradition through restrained color use, elegant serif display typography, generous whitespace, and premium photography. |
| Clarity First | Registration, schedule, and event information must be scannable within seconds; decorative elements must never compete with primary actions. |
| Accessible by Default | All components must meet WCAG 2.1 AA at minimum. Accessibility requirements are part of the component specification, not an optional enhancement. |
| Consistent Rhythm | Spacing, radii, typography, elevation, and layout must derive from the defined token scales. |
| Modern Academic | Traditional academic cues are balanced with clean sans-serif UI typography, rounded containers, asymmetric compositions, and restrained interaction states. |

---

## 2. Color Palette

### 2.1 Primitive Tokens

The primary visual palette is based on a deep institutional maroon, warm cream, white surfaces, and dark neutral text. The maroon and cream values below resolve the previously open brand-color placeholder.

| Token | Hex | Usage |
|---|---|---|
| `color.maroon.900` | `#5E101C` | Primary institutional color; primary actions, countdown card, heading accents, icons |
| `color.maroon.700` | `#8C1D2B` | Hover/active state for primary actions |
| `color.maroon.050` | `#FBEFEF` | Tinted backgrounds, badges, subtle interactive states |
| `color.cream.100` | `#F7F4EE` | Primary page background and hero underlay |
| `color.cream.050` | `#FBF8F3` | Subtle card surfaces on cream backgrounds |
| `color.charcoal.900` | `#1A1A1A` | Primary headings, navigation, body text |
| `color.charcoal.600` | `#4A4A4A` | Supporting text, subtitles, metadata |
| `color.charcoal.300` | `#8A8586` | Disabled text and placeholders |
| `color.gold.500` | `#C9A24B` | Ceremonial/decorative accent only |
| `color.white` | `#FFFFFF` | White surfaces and reversed text |
| `color.border.subtle` | `#E4DED4` | Card borders and dividers |
| `color.success` | `#2E7D4F` | Confirmation states |
| `color.error` | `#B3261E` | Form validation and destructive actions |

> **Source note:** The reference describes `#5E101C` and `#F7F4EE` as approximate visual observations. They are adopted here as the implementation values so both developers have one stable source of truth.

### 2.2 Semantic Tokens

| Semantic Token | Maps To | Notes |
|---|---|---|
| `color.bg.page` | `color.cream.100` | Default page background |
| `color.bg.surface` | `color.white` | Cards, information bars, modals, form fields |
| `color.bg.surface-subtle` | `color.cream.050` | Secondary card surfaces |
| `color.bg.inverse` | `color.maroon.900` | Countdown widget, footer, inverse surfaces |
| `color.action.primary` | `color.maroon.900` | Primary button fill |
| `color.action.primary-hover` | `color.maroon.700` | Primary button hover/active |
| `color.action.secondary` | `color.maroon.900` | Secondary button text/border |
| `color.action.secondary-hover` | `color.maroon.050` | Secondary button hover background |
| `color.text.default` | `color.charcoal.900` | Body copy and headings |
| `color.text.muted` | `color.charcoal.600` | Supporting copy and metadata |
| `color.text.disabled` | `color.charcoal.300` | Disabled controls/placeholders |
| `color.text.on-primary` | `color.white` | Text/icons on maroon surfaces |
| `color.icon.default` | `color.maroon.900` | Interface icons |
| `color.border.default` | `color.border.subtle` | Structural borders/dividers |
| `color.focus.ring` | `#2563EB` | Keyboard focus indicator; deliberately distinct from brand colors |

### 2.3 Gold Usage Rule

`color.gold.500` is strictly decorative. It may be used for ceremonial details such as seals, stoles, decorative dividers, or other non-interactive highlights.

Gold must **not** be used for:

- Primary or secondary actions
- Body text
- Form labels
- Required status indicators
- Interactive icons where contrast is required

---

## 3. Typography

The system combines a sophisticated serif display face with a clean sans-serif UI/body face. This preserves the formal academic character of the reference while maintaining readability and usability.

### 3.1 Font Stacks

```css
--font-display: "Playfair Display", "Georgia", serif;
--font-body: "Inter", "Segoe UI", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", monospace;
```

**Preferred fonts:**

- Display: **Playfair Display**
- Body/UI: **Inter**
- Mono/reference values: **IBM Plex Mono**

Alternative serif or sans-serif fonts should only be introduced through an explicit design-system update.

### 3.2 Type Scale

| Token | Size / Line Height | Font | Weight | Usage |
|---|---|---|---|---|
| `type.display.xl` | 64px / 72px | `--font-display` | 700 | Hero title |
| `type.display.lg` | 44px / 52px | `--font-display` | 700 | Section headings |
| `type.display.md` | 32px / 40px | `--font-display` | 600 | Card/modal titles |
| `type.display.accent` | 56px / 64px | `--font-display` | 600–700 | Event year/accent numerals such as `2026` |
| `type.body.xl` | 24px / 32px | `--font-body` | 400 | Large supporting statement |
| `type.body.lg` | 18px / 28px | `--font-body` | 400 | Hero subtext/lead copy |
| `type.body.md` | 16px / 24px | `--font-body` | 400 | Default body copy |
| `type.body.sm` | 14px / 20px | `--font-body` | 400 | Metadata/captions |
| `type.label` | 13px / 16px | `--font-body` | 600 | Nav items, labels, table headers |
| `type.numeral.countdown` | 56px / 56px | `--font-body` | 700 | Countdown digits |

### 3.3 Typography Rules

- Serif typography is reserved for display headings, major event numerals, and ceremonial accents.
- Sans-serif is used for navigation, buttons, metadata, forms, tables, and body copy.
- The hero title may use uppercase styling where the visual composition calls for it.
- The event year may be visually emphasized in maroon.
- Countdown digits use tabular numerals for stable alignment.
- Never use raw font-size values in component CSS when an existing type token applies.

---

## 4. Spacing, Grid & Shape

### 4.1 Spacing Scale

The spacing system uses a 4px base unit.

| Token | Value |
|---|---:|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.24` | 96px |

### 4.2 Grid

```css
--grid-columns-desktop: 12;
--grid-columns-tablet: 8;
--grid-columns-mobile: 4;

--grid-gutter: 24px;

--grid-margin-desktop: 80px;
--grid-margin-tablet: 40px;
--grid-margin-mobile: 20px;

--container-max-width: 1440px;
```

### 4.3 Layout Composition

The visual reference favors an asymmetric composition rather than a rigid equal-column layout:

- Hero content/image split may use approximately **50/50** or **40/60** proportions.
- Content and actions occupy the left side.
- Photography occupies the right side.
- Highlight cards may overlap the image/content boundary.
- Generous whitespace is intentional and should not be eliminated merely to increase information density.

### 4.4 Radii

| Token | Value | Usage |
|---|---:|---|
| `radius.sm` | 8px | Inputs, tags |
| `radius.md` | 12px | Standard cards |
| `radius.lg` | 24px | Feature/countdown/information containers |
| `radius.pill` | 999px | Buttons and pill controls |

The visual language uses prominent rounded corners. New component-specific radii should not be introduced without updating this system.

### 4.5 Elevation

| Token | Value | Usage |
|---|---|---|
| `elevation.card` | `0 2px 8px rgba(35,31,32,0.08)` | Standard card |
| `elevation.feature` | `0 8px 24px rgba(35,31,32,0.12)` | Overlapping feature cards |
| `elevation.modal` | `0 16px 48px rgba(35,31,32,0.24)` | Modal |

---

## 5. Core Components

### 5.1 Buttons

| Variant | Background | Text | Border | Hover | Radius |
|---|---|---|---|---|---|
| Primary | `color.action.primary` | `color.text.on-primary` | None | `color.action.primary-hover` | `radius.pill` |
| Secondary | Transparent | `color.action.secondary` | 1px `color.action.secondary` | `color.action.secondary-hover` | `radius.pill` |
| Ghost | Transparent | `color.action.primary` | None | `color.maroon.050` + underline | `radius.pill` |

**Base specifications:**

- Default height: `48px`
- Compact height: `40px`
- Minimum interactive target: `44px × 44px`
- Horizontal padding: `space.6`
- Icon gap: `space.2`
- Font: `type.body.md`
- Weight: 600
- Disabled opacity: 40%
- Disabled cursor: `not-allowed`

**Secondary button treatment:**

The secondary action is an outlined pill with a maroon border and maroon text. Where the action represents navigation such as **“View Schedule”**, use a right-pointing arrow icon after the label.

Use an icon component rather than relying on a literal Unicode arrow when possible.

```css
.btn-primary {
  background: var(--color-action-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--radius-pill);
  padding: 0 var(--space-6);
  min-height: 48px;
  font: 600 16px var(--font-body);
  transition: background 150ms ease;
}

.btn-primary:hover {
  background: var(--color-action-primary-hover);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

---

### 5.2 Navigation Bar

| Property | Spec |
|---|---|
| Height | 88px desktop / 64px mobile |
| Background | Transparent over hero; `color.bg.surface` when sticky/scrolled |
| Logo | Crest + institution wordmark |
| Logo position | Left aligned |
| Nav | Right aligned |
| Typography | `type.label` |
| Item spacing | `space.8` |
| Active state | `color.action.primary` + 2px underline |
| CTA | Primary button |
| Mobile | Hamburger + full-screen/overlay navigation |

The header should remain visually clean, with the institutional identity on the left and navigation/actions on the right.

All navigation controls must remain keyboard accessible.

---

### 5.3 Hero Section

The hero is the primary visual expression of the convocation experience.

| Property | Spec |
|---|---|
| Layout | Asymmetric two-column composition |
| Desktop split | Approximately 40/60 or 50/50 |
| Content | Left |
| Photography | Right |
| Background | `color.bg.page` |
| Image treatment | High-quality academic-regalia photography |
| Title | `type.display.xl` |
| Event year | `type.display.accent`, `color.action.primary` |
| Subtext | `type.body.lg`, `color.text.muted` |
| Meta | Date + venue, icon-assisted |
| CTA | Primary + Secondary |
| CTA gap | `space.4` |
| Countdown | Overlapping feature card |
| Mobile | Single-column stacked composition |

The reference favors professional photography of people in academic regalia integrated into the right side of the composition.

#### Hero hierarchy

1. Eyebrow/event identifier, where applicable
2. `CONVOCATION` or event name
3. Event year/accent
4. Supporting statement
5. Date/venue metadata
6. Primary and secondary actions
7. Countdown/feature card

Decorative imagery must not reduce text readability or interfere with CTA visibility.

---

### 5.4 Countdown Card

The countdown card is a key visual feature and must use the inverse maroon surface.

| Property | Spec |
|---|---|
| Background | `color.bg.inverse` |
| Text | `color.text.on-primary` |
| Radius | `radius.lg` |
| Padding | `space.8` |
| Desktop placement | Overlapping/bottom-right of hero image |
| Mobile placement | Full-width inline block beneath hero copy |
| Main numeral | `type.numeral.countdown` |
| Label | `type.label` or `type.body.sm` |
| Numeral alignment | Tabular, centered |
| Content | Days, hours, minutes, seconds |

The reference specifically describes a solid maroon countdown card with white/off-white text, generous padding, and a visually dominant countdown number.

The countdown must remain understandable when JavaScript is unavailable or motion is reduced.

For assistive technology:

- Use an appropriate accessible label.
- Use `aria-live` sparingly to avoid excessive announcements.
- Do not make rapidly changing digits the sole means of communicating event timing.
- Provide the target event date/time in accessible text.

---

### 5.5 Information Bar

The information bar sits beneath/overlapping the hero composition and provides the key event facts.

| Property | Spec |
|---|---|
| Background | `color.bg.surface` |
| Radius | `radius.lg` |
| Layout | Four-column horizontal layout on desktop |
| Items | Date / Time / Venue / Edition |
| Icons | `color.icon.default` |
| Icon style | Minimal line-art |
| Desktop alignment | Even distribution |
| Tablet | 2 × 2 |
| Mobile | Single-column stack |

The reference describes a white information container with prominent rounded corners and evenly distributed event details.

---

### 5.6 Iconography

Icons should reinforce the academic/premium visual language without becoming decorative noise.

| Property | Spec |
|---|---|
| Style | Minimal 2D line art |
| Stroke | Approximately 1.5–2px |
| Default color | `color.icon.default` |
| Shape | Simple, recognizable silhouettes |
| Examples | Calendar, clock, map pin, crest/crown |

The reference explicitly identifies calendar, clock, map-pin, and crest/crown icon treatments with consistent line weight.

Icons must:

- Have accessible labels when conveying information independently.
- Use `aria-hidden="true"` when purely decorative beside an equivalent text label.
- Never communicate a required state through iconography/color alone.

---

### 5.7 Data Tables — Student Lists

| Property | Spec |
|---|---|
| Header | `type.label`, `color.text.muted` |
| Header border | 1px `color.border.default` |
| Minimum row height | 56px |
| Row divider | 1px `color.border.default` |
| Hover | `color.cream.100` |
| Zebra striping | Optional |
| Sort indicator | Chevron icon |
| Pagination | Bottom-right |
| Empty state | Centered icon + `type.body.md` |
| Empty state height | Minimum 240px |
| Mobile | Convert to stacked cards |

Never require horizontal scrolling for ordinary student records when a stacked-card representation is practical.

---

### 5.8 Modals

| Property | Spec |
|---|---|
| Overlay | `rgba(35,31,32,0.5)` |
| Container | Maximum 560px |
| Radius | `radius.md` |
| Shadow | `elevation.modal` |
| Padding | `space.8` |
| Title | `type.display.md` |
| Close target | Minimum 44 × 44px |
| Focus | Trapped while modal is open |
| Close | Returns focus to triggering control |
| Long content | Internal scroll past 80vh |
| Animation | Fade + scale, 200ms |
| Reduced motion | Disable/reduce animation |

Click-outside dismissal is allowed for non-critical dialogs only.

---

## 6. Accessibility — WCAG 2.1 AA

Accessibility is a mandatory implementation requirement.

| Requirement | Standard |
|---|---|
| Body text contrast | ≥ 4.5:1 |
| Large text contrast | ≥ 3:1 |
| UI component contrast | ≥ 3:1 against adjacent background |
| Focus indicator | 2px visible ring using `color.focus.ring`, 2px offset |
| Keyboard navigation | All interactive components operable by keyboard |
| Tab order | Logical and predictable |
| Semantic HTML | Prefer native HTML semantics before ARIA |
| Screen readers | Appropriate labels, states, and relationships |
| Motion | Respect `prefers-reduced-motion: reduce` |
| Form errors | `aria-describedby` + accessible error announcement |
| Color dependence | Never communicate information through color alone |
| Images | Informational images require meaningful alt text |
| Decorative images | Use `alt=""` |
| Touch targets | Minimum 44 × 44px |

### Accessibility implementation rules

- Never remove `:focus-visible` outlines without an equivalent visible replacement.
- Buttons must be actual `<button>` elements unless navigation semantics require a link.
- Navigation destinations must use `<a>` elements.
- Form controls require visible labels.
- Validation errors must be communicated through both text and appropriate programmatic relationships.
- Modal focus must be trapped while open and restored when closed.
- Mobile navigation must expose its expanded/collapsed state through `aria-expanded`.
- Decorative icons should not create duplicate screen-reader announcements.
- Countdown changes must not continuously flood the accessibility tree.

---

## 7. Responsive Strategy

### 7.1 Breakpoints

```css
--breakpoint-sm: 375px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1440px;
```

| Range | Target | Grid | Navigation |
|---|---|---|---|
| `< 768px` | Mobile | 4 columns | Hamburger/overlay |
| `768–1023px` | Tablet | 8 columns | Condensed/hamburger |
| `1024–1439px` | Small desktop | 12 columns | Full inline |
| `≥ 1440px` | Desktop | 12 columns, capped | Full inline |

### 7.2 Layout Rules

- Hero uses asymmetric two-column composition above `breakpoint.lg`.
- Hero stacks below `breakpoint.lg`.
- Hero image should remain visually prominent without pushing essential copy below an unreasonable scroll depth.
- Countdown overlaps the hero image on desktop.
- Countdown becomes a full-width inline card beneath hero content on mobile.
- Information bar changes from 4 columns → 2 × 2 → single column.
- Tables convert to stacked cards below `breakpoint.md`.
- Navigation collapses below `breakpoint.md`.
- Touch targets remain at least 44 × 44px at every viewport.
- Avoid horizontal scrolling except where a specific data visualization genuinely requires it.

---

## 8. Motion & Interaction

### 8.1 Default Motion

Use restrained motion consistent with the formal visual tone.

| Interaction | Duration |
|---|---:|
| Button state | 150ms |
| Modal entrance | 200ms |
| Navigation/menu transition | 200ms |
| Decorative reveal | 200–300ms |

### 8.2 Reduced Motion

When `prefers-reduced-motion: reduce` is enabled:

- Remove non-essential transitions.
- Disable decorative movement.
- Avoid animated scale/slide effects.
- Keep functional state changes instantaneous and understandable.

---

## 9. Imagery

Photography is a major part of the visual identity.

### Guidelines

- Prefer high-quality professional photography.
- Academic regalia and convocation moments should be visually authentic.
- Photography should integrate naturally into the right side of hero compositions.
- Use overlays/vignettes only where required for text contrast.
- Avoid excessive filters or effects.
- Do not sacrifice image accessibility for visual presentation.

The visual reference characterizes the imagery as professional photography of individuals in academic regalia, integrated cleanly into the composition.

---

## 10. Component Implementation Contract

Every React component must satisfy the following before being considered complete:

### Tokens

- Uses semantic tokens wherever possible.
- Uses primitive tokens only when defining or extending semantic tokens.
- Contains no arbitrary hex colors.
- Contains no arbitrary spacing values.
- Contains no component-specific radius unless approved in this document.
- Uses the defined typography tokens.

### Accessibility

- Keyboard operable.
- Visible focus state.
- Minimum 44 × 44px interactive targets.
- Correct semantic HTML.
- Appropriate ARIA only where native semantics are insufficient.
- Screen-reader behavior tested for dynamic/interactive content.
- Reduced-motion behavior implemented where motion exists.

### Responsive behavior

- Mobile behavior explicitly defined.
- Tablet behavior explicitly defined where different from desktop/mobile.
- No accidental horizontal overflow.
- Content remains readable at narrow widths.

### Visual consistency

- Follows the formal, celebratory, prestigious, modern visual tone.
- Uses maroon as the primary brand color.
- Uses gold only decoratively.
- Uses rounded surfaces consistently.
- Maintains generous whitespace.

---

## 11. React Token Naming

The implementation should expose tokens through CSS custom properties so both developers can consume the same stable API.

Example:

```css
:root {
  --color-maroon-900: #5E101C;
  --color-maroon-700: #8C1D2B;
  --color-maroon-050: #FBEFEF;

  --color-cream-100: #F7F4EE;
  --color-cream-050: #FBF8F3;

  --color-charcoal-900: #1A1A1A;
  --color-charcoal-600: #4A4A4A;
  --color-charcoal-300: #8A8586;

  --color-gold-500: #C9A24B;
  --color-white: #FFFFFF;

  --color-border-subtle: #E4DED4;
  --color-focus-ring: #2563EB;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-pill: 999px;
}
```

Components should consume semantic aliases rather than primitive values directly:

```css
:root {
  --color-bg-page: var(--color-cream-100);
  --color-bg-surface: var(--color-white);
  --color-bg-inverse: var(--color-maroon-900);

  --color-action-primary: var(--color-maroon-900);
  --color-action-primary-hover: var(--color-maroon-700);

  --color-text-default: var(--color-charcoal-900);
  --color-text-muted: var(--color-charcoal-600);
  --color-text-on-primary: var(--color-white);
}
```

This allows the underlying visual values to change without requiring component-level rewrites.

---

## 12. Governance

- This document is the single source of truth for the convocation design system.
- All new components must be built from tokens defined in this document.
- No inline hex values are permitted in React component code.
- No arbitrary pixel spacing is permitted when an existing spacing token applies.
- New colors, typography values, spacing values, radii, elevations, or component variants must be added to this document before implementation.
- Visual deviations discovered during implementation must be resolved through a design-system update rather than one-off component overrides.
- Both developers must consume the same token names and component contracts.
- Pull requests should be reviewed against this document before merging into `dev`.

### Required pre-implementation confirmation

Before the document is considered fully institution-ready, replace:

- `IIIT BHAGALPUR` is the confirmed institution name.
- Confirm whether the adopted reference colors `#5E101C` and `#F7F4EE` should be treated as final production brand values rather than approximate visual observations.

Until then, the values in this merged document are the agreed implementation defaults for the React build.
