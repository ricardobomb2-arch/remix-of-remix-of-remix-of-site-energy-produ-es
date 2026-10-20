<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep photography gallery filtering and accessible image enlargement in a dedicated browser-safe component; the photography route supplies its media and page content so existing pages stay unchanged.
- Keep the quote wizard in a dedicated browser-safe component and its schemas and submission adapter in a shared module; this isolates conditional validation and allows testing delivery without sending owner emails.
- Use a scoped animation class for the home service marquee so other marquees and reduced-motion accessibility remain unchanged.
- Share the browser-safe EnergyLogo presentation between the home title and footer so transparency and pointer effects stay consistent.
- Keep scroll reveal coordination, the per-word masked title entrance and router-event page curtains in the browser-safe shared site-motion module; this applies cinematic motion consistently without changing page content or intercepting navigation.
- Keep the decorative camera cursor in site-motion and scope the focus entrance to the home title; preserve native pointers, click targets, logo hover effects, and reduced-motion access.
- Keep scene-light coordination in site-motion and confine its decorative texture to dark section backgrounds; this preserves image colors, native interaction, and reduced-motion access.
- Keep home photo parallax in the browser-safe site-motion module with a clipped, natural-aspect image and reduced-motion reset; this adds scroll depth without changing photo framing or moving page content.
- Keep the photography comparison in a dedicated browser-safe component accepting explicit before/after sources; label single-source filter previews as demonstrations so simulated edits are never represented as real originals.
