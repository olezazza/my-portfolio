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
- Portfolio content (projects, links, text) lives only in src/data.ts; shared interactive UI (nav, workbench, terminal, explorer) in src/components/lab.tsx — keeps the codebase small and editable by the owner.
- Each project has its own route at /work/$slug; About, Toolbox, Contact are separate routes.
- Home and About reuse the personal introduction in src/components/lab.tsx so their presentation and content stay consistent.
