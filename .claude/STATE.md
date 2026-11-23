# State (2026-11-24)

## Branch
- main: pushed. Live: resume PDFs from the private `resume` repo (warns and uses data/*.pdf,
  phone-free, if the download fails), Research CV link, Projects (Ghostdesk, Pitchvision,
  Pitwall, Freespace; data/projects.json), Publications (FIDES, CITS 2026), ISRO removed.
- Look: space between entries (--entry-line none), one line under each section header row
  (--heading-line), bio and role line justified, all else left-aligned, dates at the right.
- check.sh passes (54 tests).

## Next
- RESUME_TOKEN holds an invalid value ("Bad credentials"): the owner sets a real fine-grained
  token (Contents read/write on resume + this repo) in both repos.
- When Ghostdesk's repo is public: add its `repo` field in data/projects.json.
- Re-render assets/social.png on a machine with Chrome (role line changed).
