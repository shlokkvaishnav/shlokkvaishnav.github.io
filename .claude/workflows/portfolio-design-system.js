export const meta = {
  name: 'portfolio-design-system',
  description: 'Research-driven portfolio design system with theme and 8 component agents',
  phases: [
    { title: 'Theme Research', detail: 'Research design tokens from award-winning portfolios' },
    { title: 'Component Research', detail: '8 parallel agents researching each section' },
    { title: 'Integration', detail: 'Consistency audit and final synthesis' }
  ]
}

// Schema for Theme Agent output
const THEME_SCHEMA = {
  type: 'object',
  required: ['tokens', 'sources', 'fullReport'],
  properties: {
    tokens: {
      type: 'object',
      required: ['colors', 'typography', 'motion', 'spacing', 'personality'],
      properties: {
        colors: {
          type: 'object',
          required: ['background', 'surface', 'text', 'accent', 'muted'],
          properties: {
            background: { type: 'string' },
            surface: { type: 'string' },
            text: { type: 'string' },
            accent: { type: 'string' },
            muted: { type: 'string' }
          }
        },
        typography: {
          type: 'object',
          required: ['display', 'body'],
          properties: {
            display: { type: 'string' },
            body: { type: 'string' }
          }
        },
        motion: {
          type: 'object',
          properties: {
            easing: { type: 'string' },
            durationScale: { type: 'object' },
            scrollBehavior: { type: 'string' }
          }
        },
        spacing: { type: 'object' },
        borderRadius: { type: 'object' },
        shadows: { type: 'object' },
        personality: { type: 'string' }
      }
    },
    sources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          contribution: { type: 'string' }
        }
      }
    },
    fullReport: { type: 'string' }
  }
}

// Schema for component specs
const COMPONENT_SCHEMA = {
  type: 'object',
  required: ['sectionName', 'inspirations', 'codePattern', 'spec'],
  properties: {
    sectionName: { type: 'string' },
    inspirations: {
      type: 'array',
      minItems: 3,
      items: {
        type: 'object',
        required: ['url', 'exceptional'],
        properties: {
          url: { type: 'string' },
          exceptional: { type: 'string' }
        }
      }
    },
    codePattern: {
      type: 'object',
      required: ['url', 'technique'],
      properties: {
        url: { type: 'string' },
        technique: { type: 'string' }
      }
    },
    spec: {
      type: 'object',
      required: ['layout', 'motion', 'component', 'mobile'],
      properties: {
        layout: { type: 'string' },
        motion: { type: 'string' },
        component: { type: 'string' },
        mobile: { type: 'string' }
      }
    }
  }
}

// Phase 1: Theme Agent
phase('Theme Research')
log('Starting Theme Agent - researching design tokens from award-winning portfolios')

const themePrompt = `You are the Theme Agent for a portfolio website design system.

## Context
Personal portfolio website for a software developer.
Goal: strong first impression on recruiters, collaborators, and clients.
Aesthetic direction: modern, confident, subtly distinctive — not flashy, not generic.

## CRITICAL: Research Protocol

You MUST use ToolSearch to load WebSearch and WebFetch tools first, then complete ALL research steps before producing output.

### Required Research Steps (complete ALL):

1. Use ToolSearch to load: query "select:WebSearch,WebFetch"
2. WebSearch: "best portfolio website color palettes 2025"
3. WebSearch: "modern developer portfolio typography combinations 2025"
4. WebSearch: "portfolio website design trends 2025"
5. WebSearch: "award winning portfolio websites awwwards 2024 2025"
6. WebFetch: Visit top 3 URLs from above results and extract actual design tokens used

## Output Requirements:

Create a comprehensive Design Token Sheet with:

### Colors (extracted from real award-winning sites):
- background: hex/rgb value + description
- surface: hex/rgb value + description  
- text: hex/rgb value + description
- accent: hex/rgb value + description
- muted: hex/rgb value + description

### Typography (sourced from actual portfolios):
- display: font name + weight + source (NO Inter, Roboto, Arial, or system-ui)
- body: font name + weight + source

### Motion Language:
- easing: specific curve (e.g., cubic-bezier values)
- durationScale: {fast: Xms, base: Xms, slow: Xms}
- scrollBehavior: description

### Spacing Scale:
Object with values (e.g., {xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64})

### Border Radius:
Object with values (e.g., {sm: 4, md: 8, lg: 16})

### Shadow System:
Object with CSS shadow values (e.g., {subtle: '...', medium: '...', large: '...'})

### Personality Tag:
One word capturing the aesthetic (e.g., "precise", "editorial", "warm", "confident")

### Source Credits:
Array of {url, contribution} for every site researched

### Full Report:
Markdown-formatted comprehensive report of all research findings, design decisions, and rationale.

## Hard Constraints:
- NO purple gradients
- NO white-card-on-white defaults
- NO generic system fonts as primary (Inter, Roboto, Arial, system-ui)
- Subtle > loud
- All patterns SOURCED from real sites with citations
- Mobile-first mindset

This Token Sheet becomes LAW for all component agents.`

const themeResult = await agent(themePrompt, {
  label: 'Theme Research',
  phase: 'Theme Research',
  schema: THEME_SCHEMA
})

if (!themeResult) {
  return { error: 'Theme Agent was skipped or failed. Cannot proceed without design tokens.' }
}

log(`Theme established: "${themeResult.tokens.personality}" aesthetic with ${themeResult.sources.length} source inspirations`)

// Phase 2: Component Agents (all parallel)
phase('Component Research')
log('Spawning 8 component agents in parallel - each will conduct full research protocol')

const components = [
  {
    name: 'Navbar',
    sectionNames: ['navbar', 'navigation bar', 'portfolio header'],
    additionalSearches: [
      'sticky navbar blur glassmorphism portfolio 2025',
      'minimal portfolio navigation hover animation'
    ],
    requirements: 'sticky/fixed bar, name or logo left, links right, optional theme toggle, mobile hamburger menu, scroll-triggered style change'
  },
  {
    name: 'Hero',
    sectionNames: ['hero section', 'portfolio landing', 'above the fold'],
    additionalSearches: [
      'developer portfolio hero section text animation 2025',
      'portfolio hero background subtle animation canvas particles',
      'best portfolio opening screen awwwards 2024'
    ],
    requirements: 'name (large display type), one-line role, 2-line bio, primary CTA button, secondary link, background treatment (texture/canvas/gradient mesh/none), entrance animation sequence'
  },
  {
    name: 'Projects',
    sectionNames: ['projects grid', 'portfolio work section', 'case study grid'],
    additionalSearches: [
      'portfolio project cards hover effect 2025',
      'developer portfolio work section bento grid layout',
      'project showcase overlay animation portfolio'
    ],
    requirements: 'card or full-width layout, project thumbnail, title, tech stack tags, 1-line description, hover state (overlay/slide/reveal), filter by category option'
  },
  {
    name: 'About',
    sectionNames: ['about section portfolio', 'about me developer portfolio'],
    additionalSearches: [
      'portfolio about section two column layout 2025',
      'developer about me section skills visualization',
      'personal portfolio bio section human feel design'
    ],
    requirements: 'short bio (2–3 lines), photo or avatar treatment, skills list or tag cloud, current status badge, fun fact or values line'
  },
  {
    name: 'Experience',
    sectionNames: ['experience timeline portfolio', 'work history section'],
    additionalSearches: [
      'portfolio timeline section animation scroll reveal',
      'resume timeline design minimal developer portfolio',
      'experience section vertical timeline CSS 2025'
    ],
    requirements: 'vertical or alternating timeline, company + role + date + 1-line impact, scroll-triggered entrance per item, optional logo thumbnails'
  },
  {
    name: 'Testimonials',
    sectionNames: ['testimonials section portfolio', 'social proof developer site'],
    additionalSearches: [
      'portfolio testimonials design subtle card layout',
      'developer portfolio quotes section minimal 2025'
    ],
    requirements: '1–3 quotes, avatar + name + relation, card or pull-quote style, subtle entrance animation, no carousel unless justified by research'
  },
  {
    name: 'Contact',
    sectionNames: ['contact section portfolio', 'portfolio CTA footer section'],
    additionalSearches: [
      'portfolio contact section minimal design 2025',
      'developer contact page large text CTA email link',
      'portfolio contact form vs email link which converts better'
    ],
    requirements: 'large headline CTA ("Let\'s work together"), email link or short form (name + message), social icons (GitHub, LinkedIn, Twitter/X), availability status badge'
  },
  {
    name: 'Footer',
    sectionNames: ['portfolio footer design', 'minimal website footer'],
    additionalSearches: [
      'minimal portfolio footer 2025 examples',
      'portfolio footer back to top animation'
    ],
    requirements: 'copyright line, echo nav links, "designed & built by" credit, back-to-top button, keep it under 80px height unless research says otherwise'
  }
]

const componentSpecs = await parallel(components.map(comp => () => {
  const prompt = `You are the ${comp.name} Agent for a portfolio website design system.

## Design Token Sheet (MUST apply exactly):

\`\`\`json
${JSON.stringify(themeResult.tokens, null, 2)}
\`\`\`

Personality: "${themeResult.tokens.personality}"

## Your Section: ${comp.name}

## CRITICAL: Universal Search Protocol

You MUST complete ALL research steps before writing any spec. No spec from memory alone.

### Step 0: Load Tools
- Use ToolSearch with query "select:WebSearch,WebFetch" to load web research tools

### Step A - Find best examples:
1. WebSearch: "best portfolio ${comp.sectionNames[0]} design 2025"
2. WebSearch: "modern developer portfolio ${comp.sectionNames[1]} examples"
3. WebSearch: "awwwards portfolio ${comp.sectionNames[0]} inspiration"
4. WebSearch: "${comp.sectionNames[0]} portfolio design dribbble behance 2025"

### Step B - Deep dive on top results:
5. WebFetch: top 2-3 URLs from above searches
   Extract for each: layout structure, color usage, typography hierarchy, spacing patterns, animation behavior, hover states, mobile behavior

### Step C - Find code patterns:
6. WebSearch: "${comp.sectionNames[0]} portfolio React Tailwind component 2025"
7. WebSearch: "best ${comp.sectionNames[0]} CSS animation portfolio codepen"
8. WebFetch: any CodePen/GitHub links found - extract implementation patterns

### Step D - Additional domain-specific searches:
${comp.additionalSearches.map((s, i) => `${i + 9}. WebSearch: "${s}"`).join('\n')}

## Synthesis Requirements:

After completing ALL research, synthesize findings into a spec for: ${comp.requirements}

### Output Structure (all fields required):

**sectionName**: "${comp.name}"

**inspirations**: Array of top 3 examples, each with:
- url: full URL
- exceptional: 1-2 sentences on what makes it exceptional

**codePattern**: Best code implementation found:
- url: CodePen/GitHub/article URL
- technique: key technique extracted (animation library, CSS approach, React pattern)

**spec** object containing:

**layout**: Detailed visual and structural breakdown
- Component hierarchy
- Grid/flex layout approach
- How Token Sheet colors/spacing are applied
- Content structure

**motion**: Animation and interaction specification
- Entrance animation (tied to motion.durationScale and motion.easing from Token Sheet)
- Hover/focus states
- Scroll-triggered behavior
- Transition timings using Token values

**component**: React + Tailwind implementation structure
- High-level component breakdown
- Key Tailwind classes mapped to Token values
- State management approach
- Props interface

**mobile**: Responsive behavior
- Mobile-first adjustments
- Breakpoint-specific changes
- Touch interaction considerations
- Content reflow strategy

## Hard Constraints:
- Apply Token Sheet colors, fonts, spacing, motion EXACTLY
- Mobile-first approach
- Subtle > loud (match the "${themeResult.tokens.personality}" personality)
- NO patterns from memory - all must be sourced from research
- Cite every URL that influenced decisions
- NO Inter, Roboto, Arial, or system-ui fonts
- NO purple gradients or generic white-on-white

Conduct thorough research, then synthesize into structured output.`

  return agent(prompt, {
    label: `${comp.name} Research`,
    phase: 'Component Research',
    schema: COMPONENT_SCHEMA
  })
}))

const validSpecs = componentSpecs.filter(Boolean)

if (validSpecs.length < 8) {
  log(`Warning: Only ${validSpecs.length}/8 component agents completed successfully`)
}

log(`Component research complete: ${validSpecs.length}/8 agents returned specs`)

// Phase 3: Integration
phase('Integration')
log('Running consistency audit and synthesizing final unified document')

const integrationPrompt = `You are the Orchestrator performing final integration and consistency audit.

## Theme Token Sheet:
${themeResult.fullReport}

### Token Summary:
\`\`\`json
${JSON.stringify(themeResult.tokens, null, 2)}
\`\`\`

### Sources:
${themeResult.sources.map(s => `- ${s.url}: ${s.contribution}`).join('\n')}

## Component Specs Received:
${validSpecs.map((spec, i) => `
### ${spec.sectionName}:
**Inspirations:**
${spec.inspirations.map(insp => `- ${insp.url}: ${insp.exceptional}`).join('\n')}

**Code Pattern:**
- ${spec.codePattern.url}: ${spec.codePattern.technique}

**Layout:** ${spec.spec.layout}

**Motion:** ${spec.spec.motion}

**Component:** ${spec.spec.component}

**Mobile:** ${spec.spec.mobile}
`).join('\n---\n')}

## Your Tasks:

### 1. Consistency Audit
- Load WebSearch via ToolSearch: query "select:WebSearch"
- WebSearch: "cohesive portfolio website section transitions design"
- Check EVERY component spec against the Token Sheet
- Flag any drift in: colors, typography usage, spacing, motion timings, personality tone
- Note conflicts between specs (font sizes, animation approaches, spacing inconsistencies)

### 2. Integration Notes
Based on research and specs, define:
- **Section Transition Strategy**: How each section flows visually into the next (scroll reveal patterns, color transitions, spacing between sections)
- **Repeated Visual Motifs**: Elements that repeat across sections for cohesion (border styles, card treatments, hover effects, animation patterns)
- **Page-Level Animation Sequence**: What loads first, what staggers, what triggers on scroll (create a timeline)

### 3. Produce Final Unified Document

Create a comprehensive markdown document with this exact structure:

# Portfolio Design System — Final Specification

## Executive Summary
[2-3 paragraphs: aesthetic vision, personality, key differentiators]

---

## 1. Design Token Sheet

### Color Palette
- **Background**: [value] — [description/usage]
- **Surface**: [value] — [description/usage]
- **Text**: [value] — [description/usage]
- **Accent**: [value] — [description/usage]
- **Muted**: [value] — [description/usage]

### Typography
- **Display**: [font] [weight] — [usage context]
- **Body**: [font] [weight] — [usage context]

### Motion Language
- **Easing**: [value]
- **Duration Scale**: [object]
- **Scroll Behavior**: [description]

### Spacing Scale
[Full scale object]

### Border Radius
[Full radius object]

### Shadow System
[Full shadow object]

### Personality
**"${themeResult.tokens.personality}"** — [expanded description]

### Source Credits
[List all sources with contributions]

---

## 2. Component Specifications
[For EACH component in page order: Navbar, Hero, Projects, About, Experience, Testimonials, Contact, Footer]

### [Component Name]

#### Top 3 Inspirations
1. [URL] — [what makes it exceptional]
2. [URL] — [what makes it exceptional]
3. [URL] — [what makes it exceptional]

#### Best Code Pattern
- **Source**: [URL]
- **Technique**: [description]

#### Layout & Visual Breakdown
[Detailed structure applying Token Sheet]

#### Motion & Interaction Specification
[Animation spec with Token references]

#### React + Tailwind Component Structure
[Component breakdown with Tailwind classes mapped to tokens]

#### Mobile Behavior
[Responsive strategy]

---

## 3. Orchestrator Integration Notes

### Section Transition Strategy
[How sections flow: spacing, scroll reveals, color transitions]

### Repeated Visual Motifs
[Consistent elements for cohesion: borders, cards, hover effects, animation patterns]

### Page-Level Animation Sequence
[Timeline: what appears first, what staggers, scroll-triggered choreography]

### Consistency Audit Results
[Any conflicts found and how they were resolved]

---

## 4. Implementation Handoff Checklist

### Font Imports
\`\`\`javascript
// Google Fonts or Fontsource imports needed
\`\`\`

### CSS Variables
\`\`\`css
:root {
  /* Colors */
  --color-background: ...;
  --color-surface: ...;
  
  /* Typography */
  --font-display: ...;
  
  /* Motion */
  --ease-default: ...;
  
  /* Spacing */
  --space-xs: ...;
  
  /* Radius */
  --radius-sm: ...;
  
  /* Shadows */
  --shadow-subtle: ...;
}
\`\`\`

### NPM Dependencies
- framer-motion (or GSAP, based on research)
- [other animation libraries]
- [any UI component libraries]

### Responsive Breakpoints
\`\`\`javascript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
\`\`\`

### Implementation Priority Order
1. [First component to build]
2. [Second...]
[...]

---

## 5. Quality Checklist
- [ ] All components use Token Sheet exactly
- [ ] No Inter, Roboto, Arial, or system-ui as primary fonts
- [ ] Mobile-first responsive on every component
- [ ] Subtle > loud aesthetic maintained
- [ ] All patterns sourced from research (no invention)
- [ ] Cohesive visual flow between sections
- [ ] Personality "${themeResult.tokens.personality}" expressed throughout

---

Make it comprehensive, implementation-ready, and meticulously tied to the Token Sheet and research sources.`

const finalDoc = await agent(integrationPrompt, {
  label: 'Integration & Synthesis',
  phase: 'Integration'
})

log('Final unified design system document complete')

return {
  theme: themeResult,
  components: validSpecs,
  finalDocument: finalDoc,
  summary: `Design system complete with ${validSpecs.length}/8 components. Personality: "${themeResult.tokens.personality}". Ready for implementation.`
}
