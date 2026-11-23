# State (2026-11-24)

## Branch
- main: pushed. Live: one Resume link: the master PDF from the private `resume` repo (warns and uses
  data/Shlok_Vaishnav_Resume.pdf, phone-free, if the download fails), Projects (Ghostdesk, Pitchvision,
  Pitwall; data/projects.json; no tools line), Publications (FIDES, CITS 2026), ISRO removed.
- Look: space between entries (--entry-line none), one line under each section header row
  (--heading-line), one central text block: descriptions left, bio and role justified, lines fill the column
  (--text-wrap: wrap); dates at the right.
- check.sh passes (54 tests).

## Next
- RESUME_TOKEN holds an invalid value ("Bad credentials"): the owner sets a real fine-grained
  token (Contents read/write on resume + this repo) in both repos.
- Re-render assets/social.png on a machine with Chrome (role line changed).
