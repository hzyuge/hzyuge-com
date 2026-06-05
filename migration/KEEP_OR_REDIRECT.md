# HZYUGE Site Migration Plan
# ============================================
# From: Hugo static site (current hzyuge.com)
# To:   Custom static HTML (new blog in this repo)
# Date: June 5, 2026

# ============================================
# OVERVIEW
# ============================================
# Current site has ~43 English articles on Hugo.
# Issues: template-heavy writing, no images, generic details,
#         affiliate content interrupts narratives.
#
# Strategy: Keep the best 5 articles (rewritten), redirect the rest.

# ============================================
# ARTICLES TO KEEP (rewrite with new voice)
# ============================================
# 1. why-i-switched-to-cycling
#    → Good core story (flat tire origin), needs more Hangzhou details
#    → Keep URL: /en/cycling/why-i-switched-to-cycling/
#
# 2. mountain-bike-muddy-road
#    → Best personal narrative, real riding experience
#    → Needs: remove affiliate table from story, add photos
#    → Keep URL: /en/cycling/mountain-bike-muddy-road/
#
# 3. ride-together-grow-together
#    → Family cycling - unique angle, different from all other articles
#    → Keep URL: /en/cycling/ride-together-grow-together/
#
# 4. qiantang-river-ride
#    → Route guide with real Hangzhou reference
#    → Keep URL: /en/routes/qiantang-river-ride/
#
# 5. west-lake-loop
#    → Popular Hangzhou route, good SEO potential
#    → Keep URL: /en/routes/west-lake-loop/

# ============================================
# WHAT TO REDIRECT (301 → homepage)
# ============================================
# All "best-X" gear listicles → impersonal, generic
# All generic how-to guides → rewrite as personal experience
# 404 pages → redirect to homepage
# Chinese (/zh/) articles → redirect to English homepage
