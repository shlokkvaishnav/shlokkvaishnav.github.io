# State (2026-11-24)

## Branch
- main: pushed 2026-11-24 (resume PDFs, Publications, ISRO removed, new look).

## What changed (2026-11-24)
- Resumes: site.yml downloads Shlok_Vaishnav_Resume(.pdf|_Research.pdf) from the private
  `resume` repo's release `latest` (secret RESUME_TOKEN, not yet created); on failure it
  warns and uses data/*.pdf, now phone-free PUBLIC=1 builds. New "Research CV" link.
- Content: ISRO removed; role/description add "distributed systems" (bio unchanged on
  purpose); research lines match each repo's current question; new Publications section
  (data/publications.json: FIDES, CITS 2026) in Experience markup with a DOI link.
- Look: space instead of lines between entries (--entry-line none); one line under each
  section's header row (--heading-line); bio, role line and paper description justified, all else left-aligned;
  curly quotes, theme-color, 44px touch targets, scroll-margin.
- check.sh passes (52 tests).

## Next
- Owner creates RESUME_TOKEN (fine-grained PAT) in both repos; until then the deploy warns
  and serves the PDFs saved in data/.
- Re-render assets/social.png on a machine with Chrome (role line changed).
