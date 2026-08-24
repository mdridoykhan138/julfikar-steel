# Steel Forge Hero

Build a premium, cinematic, modern industrial steel company website for:

Julfikar Steel Re-Rolling Mills Ltd.

This is the first phase of the website. For now, build ONLY:

Header / Navigation

Hero section with scroll-controlled Canvas sword animation

Three sections below the Hero

Footer

Do NOT build the rest of the website yet.

TECHNOLOGY

Use:

HTML5

CSS3

Vanilla JavaScript

GSAP

GSAP ScrollTrigger

HTML5 Canvas

Do NOT use React or Next.js.

The website should be clean, well-structured and production-ready.

BRAND COLORS

These colors MUST be followed throughout the entire design.

Primary / Company Logo Color:
#040405

Black:
#130F15

White:
#F6F5F5

Do not introduce random bright colors.

The overall visual language should be:

Deep black

Near-black

Soft white

Metallic steel

Subtle gray

Very restrained highlights

The design should feel like a premium international steel manufacturer.

DESIGN DIRECTION

The website should communicate:

Strength
Precision
Power
Durability
Engineering
Industrial excellence
Premium steel

The Zulfiqar-inspired sword is ONLY a visual metaphor for strength and superior steel.

Do NOT make the entire website religious or sword-themed.

The sword should appear primarily in the hero animation.

The overall website must clearly feel like a serious, premium steel manufacturing company.

Avoid:

Generic corporate templates

Excessive gradients

Excessive rounded cards

Cartoon-like graphics

Too many colors

Cheap-looking animations

Overuse of the sword

Use:

Large typography

Strong spacing

Dark cinematic backgrounds

Steel/metal textures

Thin borders

Subtle grid lines

Industrial imagery

Sophisticated GSAP animations

HEADER

Create a premium transparent header positioned over the Hero.

Left:

Julfikar Steel Re-Rolling Mills Ltd.

Use a clean text-based logo placeholder if an actual logo asset is not available.

Navigation:

Home

About

Products

Manufacturing

Quality

Contact

Right side:

A strong minimal CTA button:

Get in Touch

Header requirements:

Transparent initially

Smooth transition when scrolling

Sticky/fixed

On scroll, slightly change background/blur

Mobile responsive hamburger menu

Elegant GSAP entrance animation

No excessive rounded design

HERO + CANVAS SCROLL ANIMATION

This is the MOST IMPORTANT part.

I will provide a 10-second MP4 video showing a cinematic Zulfiqar-inspired sword / steel forging sequence.

Use my uploaded MP4.

Do NOT replace it with another video.

Do NOT simply autoplay the MP4.

The MP4 must be used as a scroll-controlled Canvas animation.

Implementation:

HTML5 video element should be hidden.

Use:

HTML Canvas + hidden HTML5 video + JavaScript + GSAP ScrollTrigger

The Canvas should display the current frame of the MP4.

Concept:

User scrolls DOWN:

0% scroll → video at 0 seconds

25% → approximately 2.5 seconds

50% → approximately 5 seconds

75% → approximately 7.5 seconds

100% → video at 10 seconds

User scrolls UP:

The video should automatically move backward according to scroll position.

So:

Scroll Down = sword animation plays forward

Scroll Up = sword animation plays backward

The animation must NOT loop.

CANVAS BEHAVIOR

Create a large pinned/sticky Canvas area.

Canvas:

Full viewport width

Full viewport height

position: sticky / pinned

object-fit style "cover" behavior

Maintain video aspect ratio

Properly handle resize

Desktop + tablet + mobile responsive

Use GSAP ScrollTrigger to pin the Canvas and control the animation timeline.

Create approximately:

300vh–400vh

scroll distance for the Hero animation.

The user should feel like the sword animation is happening as they travel through the Hero.

The Canvas should behave like a cinematic background.

HERO CONTENT

Overlay elegant text on top of the Canvas.

Primary headline:

FORGED FOR STRENGTH.

Secondary headline/text:

ENGINEERED TO ENDURE.

Supporting text:

Julfikar Steel Re-Rolling Mills Ltd.

Use minimal text.

Do not cover the sword unnecessarily.

Hero content should animate using GSAP.

Suggested sequence:

Small eyebrow text appears first

Main headline reveals

Supporting text fades in

CTA appears

Scroll indicator appears

The text should remain readable while the Canvas animation continues behind it.

HERO STORY

The supplied MP4 should visually communicate a story like:

Fire / molten steel

Steel being forged

Steel transforming into a powerful sword

Completed sword representing strength

Do not add fake visual effects on top of the MP4 unless necessary.

The Canvas itself should remain the main visual.

SECTION 01 — ABOUT / INTRODUCTION

After the Canvas animation finishes, transition into a premium dark section.

Heading:

BUILT FROM STRENGTH.

Content should introduce Julfikar Steel Re-Rolling Mills Ltd. as a modern steel manufacturing company focused on strength, reliability, precision and quality.

Use large typography.

Include a small numerical/stat-style area such as:

STRENGTH
PRECISION
QUALITY

Keep the layout editorial and premium.

Use subtle GSAP reveal animations.

SECTION 02 — STEEL / PRODUCTS

Create a visually strong product section.

Heading:

STEEL THAT PERFORMS.

Introduce the company's steel products in a premium industrial presentation.

Create 3 visual product blocks/cards:

Reinforcement Steel

Structural Steel

Industrial Steel

Do not use generic colorful cards.

Use dark steel surfaces, subtle borders, large typography and industrial imagery/placeholders.

On scroll:

Images reveal with GSAP

Text moves subtly

Cards enter with staggered animation

Keep everything sophisticated.

SECTION 03 — MANUFACTURING / QUALITY

Heading:

PRECISION IN EVERY TON.

Create an industrial manufacturing/quality section.

Show the idea of:

Raw Material → Processing → Rolling → Quality Control → Finished Steel

Use a horizontal or editorial timeline/process layout.

Include supporting copy about:

Advanced manufacturing

Quality control

Consistency

Strength

Engineering precision

Use subtle GSAP ScrollTrigger animations.

FOOTER

Create a premium dark footer.

Include:

Julfikar Steel Re-Rolling Mills Ltd.

Navigation links:

Home

About

Products

Quality

Contact

Include:

Contact information placeholders

Social media placeholders

Copyright

Privacy Policy

Terms & Conditions

Footer should be minimal and premium.

ANIMATION SYSTEM

Use GSAP + ScrollTrigger throughout the website.

Animations should feel:

Cinematic

Smooth

Expensive

Industrial

Controlled

Use:

Scroll reveal

Text reveal

Mask reveal

Image reveal

Stagger animations

Parallax

Scale transitions

Subtle horizontal movement

Do NOT over-animate normal content.

The Canvas sword animation should remain the main visual experience.

Respect:

prefers-reduced-motion

for accessibility.

RESPONSIVE DESIGN

Must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Adjust Canvas rendering

Keep sword visible

Reduce excessive animation

Make typography responsive

Mobile navigation should work properly

Prevent horizontal overflow

PERFORMANCE

Important:

Optimize Canvas rendering

Use requestAnimationFrame where appropriate

Avoid unnecessary scroll event listeners

GSAP ScrollTrigger should control the main scroll animation

Preload the MP4

Do not continuously play the video

Only render the required frame

Avoid layout thrashing

Lazy-load images below the Hero

Keep the website fast

If the video cannot load, provide a graceful fallback background.

FILE STRUCTURE

Keep the project organized approximately like:

/index.html

/css/
style.css

/js/
main.js
hero-canvas.js

/assets/
/images/
/video/
zulfiqar-steel.mp4

Use clean semantic HTML.

Keep JavaScript modular and readable.

FINAL IMPORTANT REQUIREMENT

The first version must contain ONLY:

HEADER
↓
HERO + CANVAS SCROLL VIDEO
↓
ABOUT SECTION
↓
PRODUCTS SECTION
↓
MANUFACTURING / QUALITY SECTION
↓
FOOTER

Make this first 5-section experience extremely polished before adding any other pages or sections.

The website should feel like a world-class steel manufacturer's website, not an AI-generated template.

The sword animation should create the emotional first impression:

Fire → Steel → Sword → Strength → Julfikar Steel

But after the Hero, transition naturally into a serious industrial brand experience.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
