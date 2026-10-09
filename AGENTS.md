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

- Keep shared site navigation and discovery-call dialog in a site shell around the root Outlet, so every public page has consistent navigation and booking access.
- Reuse coaching content sections across the home page and dedicated content routes, so stage descriptions and programme details stay consistent.
- Submit discovery requests through a validated public server function into a service-role-only table with database-backed request throttling; visitors must never read personal submissions.
