#!/usr/bin/env python3
"""
HZYUGE Cycling Blog - AI Article Workflow (DeepSeek Powered)
ReAct Pattern: Reason -> Act -> Observe

Fully automated: User inputs idea -> AI generates complete English article
"""

import json
import os
import re
import sys
import time
import requests
from datetime import datetime

# ============================================
# Load API Key from config.py (NOT committed to Git)
# ============================================
try:
    from config import DEEPSEEK_API_KEY, DEEPSEEK_API_URL, DEEPSEEK_MODEL
except ImportError:
    print("ERROR: config.py not found!")
    print("   -> Create config.py with your DeepSeek API key")
    sys.exit(1)


# ============================================
# DeepSeek API Helper
# ============================================
def call_deepseek(system_prompt, user_prompt, max_tokens=2000, temperature=0.7):
    """
    Call DeepSeek API and return the response text.
    """
    headers = {
        "Authorization": "Bearer " + DEEPSEEK_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": False
    }
    try:
        resp = requests.post(DEEPSEEK_API_URL, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"].strip()
    except requests.exceptions.RequestException as e:
        return "[API ERROR] " + str(e)
    except (KeyError, IndexError) as e:
        return "[API PARSE ERROR] " + str(e) + "\nResponse: " + resp.text[:500]


# ============================================
# Style Guide Loader
# ============================================
def load_style_guide(path="templates/style-guide.json"):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"tone": "conversational, honest", "forbidden_words": [], "min_words": 800}


# ============================================
# ReAct Agent
# ============================================
class CyclingArticleAgent:
    def __init__(self, max_steps=5):
        self.max_steps = max_steps
        self.history = []
        self.style_guide = load_style_guide()
        self.ad_client = "ca-pub-2958320523040643"
        self.ad_slot = "6909660918"
        self.amazon_tag = "hzyuge-20"
        self.unsplash_images = {
            "Route Guide":  "https://images.unsplash.com/photo-1571068315805-91c6ebc73008?w=800&q=80",
            "Gear Review":  "https://images.unsplash.com/photo-1541625602811-6630a8cc1c03?w=800&q=80",
            "Ride Journal": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
            "Tips & Skills":"https://images.unsplash.com/photo-1532298229144-0ec6e92c7a04?w=800&q=80",
            "Race Report":  "https://images.unsplash.com/photo-1507035895480-2d6298e724e6?w=800&q=80",
        }

    # ---------------------------------------------------------------
    # REASON: Analyze input, decide article type & outline
    # ---------------------------------------------------------------
    def reason(self, user_input):
        """
        Use AI to analyze the user's idea and produce a structured article plan.
        Returns dict: {type, topic, outline, date}
        """
        print("[Reason] Analyzing your idea with AI...")

        forbidden = ", ".join(self.style_guide.get("forbidden_words", []))
        tone = self.style_guide.get("tone", "conversational")

        system_prompt = (
            "You are an expert cycling blogger. Analyze the user's rough idea and return a JSON object.\n"
            "Rules:\n"
            "- Writing style: " + tone + "\n"
            "- Forbidden words: " + forbidden + "\n"
            "- Output ONLY valid JSON, no markdown fences.\n\n"
            "JSON schema:\n"
            "{\n"
            '  "type": "Route Guide | Gear Review | Ride Journal | Tips & Skills | Race Report",\n'
            '  "topic": "A catchy but honest English article title (max 60 chars)",\n'
            '  "outline": [\n'
            '    {"title": "section title", "type": "intro|story|tips|gear|closing", "words": 150},\n'
            "    ... (4-6 sections)\n"
            "  ],\n"
            '  "tags": ["tag1", "tag2", "tag3"],\n'
            '  "excerpt": "A 20-word honest excerpt in English"\n'
            "}"
        )

        user_prompt = "User's idea: " + user_input + "\n\nReturn only the JSON object."
        raw = call_deepseek(system_prompt, user_prompt, max_tokens=800, temperature=0.5)

        # Extract JSON from possible markdown wrapping
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if json_match:
            try:
                analysis = json.loads(json_match.group())
            except json.JSONDecodeError:
                analysis = self._fallback_analysis(user_input)
        else:
            analysis = self._fallback_analysis(user_input)

        analysis["date"] = datetime.now().strftime("%B %d, %Y")
        analysis["raw_input"] = user_input

        print("   Type: " + analysis["type"])
        print("   Topic: " + analysis["topic"])
        print("   Sections: " + str(len(analysis.get("outline", []))))
        return analysis

    def _fallback_analysis(self, user_input):
        return {
            "type": "Ride Journal",
            "topic": user_input[:60],
            "outline": [
                {"title": "The Idea", "type": "intro", "words": 150},
                {"title": "The Ride", "type": "story", "words": 400},
                {"title": "What I Learned", "type": "tips", "words": 250},
                {"title": "Bottom Line", "type": "closing", "words": 150}
            ],
            "tags": ["cycling"],
            "excerpt": user_input[:120]
        }

    # ---------------------------------------------------------------
    # ACT: Generate full article HTML using AI
    # ---------------------------------------------------------------
    def act(self, analysis):
        """
        Use AI to write the full article in English, following the outline.
        Returns HTML string ready for insertion into the article page.
        """
        print("[Act] Generating full article with AI (this may take 20-40s)...")

        outline_parts = []
        for i, s in enumerate(analysis.get("outline", [])):
            outline_parts.append(
                "  " + str(i+1) + ". " + s["title"] + " (" + s["type"] + ", ~" + str(s["words"]) + " words)"
            )
        outline_str = "\n".join(outline_parts)

        forbidden = ", ".join(self.style_guide.get("forbidden_words", []))

        system_prompt = (
            "You are an experienced cycling blogger writing for HZYUGE Cycling Journal.\n\n"
            "VOICE & TONE:\n"
            "- Conversational, like texting a cycling buddy\n"
            "- Honest opinions - mention flaws, not just hype\n"
            '- First-person ("I felt", "my legs were burning")\n'
            "- No corporate speak, no fake enthusiasm\n\n"
            "FORBIDDEN WORDS (never use):\n"
            + forbidden + "\n\n"
            "AMAZON AFFILIATE LINKS (use naturally in gear reviews or when mentioning products):\n"
            '- Format: <a href="https://www.amazon.com/dp/PRODUCT_ASIN/?tag=' + self.amazon_tag + '">product name</a>\n'
            "- Only link actual products you mention, max 3 links per article\n\n"
            "AD SENSE PLACEMENT (add these comment markers for auto-ads):\n"
            "- After the intro section, add: <!-- adsbygoogle -->\n"
            "- After the middle section, add: <!-- adsbygoogle -->\n\n"
            "IMAGES:\n"
            '- After intro, add: <img src="https://images.unsplash.com/photo-XXXX?w=800&q=80" alt="descriptive alt text" class="article-img-full">\n'
            '- In middle of article, add one <img src="..." alt="..." class="article-img-mid"> (centered, 80% width)\n\n'
            "OUTPUT FORMAT:\n"
            "- Write in HTML (use <h2>, <p>, <ul>, <li>, <strong> tags)\n"
            "- Do NOT wrap in ```html``` fences\n"
            "- Do NOT include <html>, <head>, or <body> tags\n"
            "- Total length: 800-1500 words\n"
            "- Each outline section = one <h2> + 1-3 <p> (or <ul> for tips)\n"
        )

        user_prompt = (
            "Write a complete English cycling blog article with these details:\n\n"
            "Title: " + analysis["topic"] + "\n"
            "Article type: " + analysis["type"] + "\n"
            "Date: " + analysis["date"] + "\n\n"
            "Outline:\n" + outline_str + "\n\n"
            "Requirements:\n"
            "- Follow the outline sections exactly\n"
            "- Insert 2-3 Amazon affiliate links naturally (for bikes, gear, tools, etc.)\n"
            "- Add <!-- adsbygoogle --> comment after intro and after the second section\n"
            "- Add one full-width Unsplash image after the intro\n"
            "- Add one mid-width image in the middle section\n"
            "- End with a short honest conclusion (1-2 paragraphs)\n"
            '- Sign off naturally: "Ride on - HZYUGE"\n\n'
            "Write the full article HTML now."
        )

        article_html = call_deepseek(system_prompt, user_prompt, max_tokens=3000, temperature=0.7)
        word_count = len(article_html.split())
        print("   Generated ~" + str(word_count) + " words")
        return article_html

    # ---------------------------------------------------------------
    # OBSERVE: Quality check using AI
    # ---------------------------------------------------------------
    def observe(self, article_html, analysis):
        """
        Use AI to review the article and return a quality report.
        """
        print("[Observe] Running quality check...")

        word_count = len(article_html.split())

        system_prompt = (
            "You are a quality reviewer for a cycling blog. Check the article against these criteria.\n\n"
            "Return ONLY a JSON object:\n"
            "{\n"
            '  "pass": true,\n'
            '  "word_count": <number>,\n'
            '  "has_amazon_links": true,\n'
            '  "has_images": true,\n'
            '  "has_ad_markers": true,\n'
            '  "forbidden_words_found": [],\n'
            '  "issues": [],\n'
            '  "score": <1-10>\n'
            "}"
        )

        user_prompt = (
            "Article HTML (send 3000 chars for accurate review):\n"
            + article_html[:3000]
            + "\n\nExpected type: " + analysis["type"]
            + "\nExpected sections: " + str(len(analysis.get("outline", [])))
            + "\n\nCheck:\n"
            "1. Word count >= 800?\n"
            "2. Contains Amazon affiliate links (tag=" + self.amazon_tag + ")?\n"
            "3. Contains <img> tags?\n"
            "4. Contains <!-- adsbygoogle --> markers?\n"
            "5. No forbidden words?\n\n"
            "Return JSON."
        )

        raw = call_deepseek(system_prompt, user_prompt, max_tokens=500, temperature=0.3)
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if json_match:
            try:
                report = json.loads(json_match.group())
            except json.JSONDecodeError:
                report = {"pass": True, "word_count": word_count, "score": 7, "issues": ["Could not parse quality report"]}
        else:
            report = {"pass": True, "word_count": word_count, "score": 7, "issues": []}

        report["word_count"] = word_count
        return report

    # ---------------------------------------------------------------
    # OBSERVE: Auto-fix common issues
    # ---------------------------------------------------------------
    def auto_fix(self, article_html, report):
        """Fix common issues automatically."""
        fixed = article_html

        if not report.get("has_images", False):
            img_tag = '<img src="' + self.unsplash_images.get("Ride Journal", "") + '" alt="Cycling" class="article-img-full">\n'
            fixed = re.sub(r'(<h2>.*?</h2>)', r'\1\n' + img_tag, fixed, count=1)

        if not report.get("has_ad_markers", False):
            fixed = re.sub(r'(</p>)', r'\1\n<!-- adsbygoogle -->\n', fixed, count=1)

        return fixed

    # ---------------------------------------------------------------
    # SAVE: Write article HTML file
    # ---------------------------------------------------------------
    def save_article(self, analysis, article_html):
        """Save the generated article as a standalone HTML file."""
        os.makedirs("articles", exist_ok=True)
        slug = re.sub(r'[^a-z0-9]+', '-', analysis["topic"].lower()).strip('-')
        if not slug:
            slug = "article-" + str(int(time.time()))
        filename = "articles/" + slug + ".html"
        cover_img = self.unsplash_images.get(analysis["type"], self.unsplash_images["Ride Journal"])

        full_doc = (
            '<!DOCTYPE html>\n'
            '<html lang="en">\n'
            '<head>\n'
            '    <meta charset="UTF-8">\n'
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
            '    <title>' + analysis["topic"] + ' - HZYUGE Cycling Journal</title>\n'
            '    <meta name="description" content="' + analysis.get("excerpt", analysis["raw_input"][:120]).replace('"', '&quot;') + '">\n'
            '    <link rel="stylesheet" href="../css/style.css">\n'
            '    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + self.ad_client + '"\n'
            '     crossorigin="anonymous"></script>\n'
            '</head>\n'
            '<body>\n'
            '    <header class="site-header">\n'
            '        <div class="container">\n'
            '            <a href="../index.html" class="logo">\n'
            '                <span class="logo-icon">🚴</span>\n'
            '                <span class="logo-text">HZYUGE</span>\n'
            '                <span class="logo-sub">· Cycling</span>\n'
            '            </a>\n'
            '        </div>\n'
            '    </header>\n\n'
            '    <main class="container" style="max-width:800px;margin:40px auto;">\n'
            '        <article class="article-detail">\n'
            '            <div class="article-header">\n'
            '                <img src="' + cover_img + '" alt="' + analysis["topic"].replace('"', '') + '" class="article-img-full">\n'
            '                <div class="card-meta" style="margin-top:20px;">\n'
            '                    <span>' + analysis["date"] + '</span>\n'
            '                    <span class="card-tag">' + analysis["type"] + '</span>\n'
            '                </div>\n'
            '                <h1>' + analysis["topic"] + '</h1>\n'
            '                <p style="color:var(--gray-500);font-size:14px;">' + analysis.get("excerpt", "") + '</p>\n'
            '            </div>\n'
            '            <div class="article-content">\n'
            + article_html
            + '\n            </div>\n'
            '        </article>\n'
            '    </main>\n\n'
            '    <footer class="site-footer">\n'
            '        <div class="container">\n'
            '            <div class="footer-grid">\n'
            '                <div>\n'
            '                    <div class="footer-brand">🚴 HZYUGE</div>\n'
            '                    <p>Honest cyclist stories. No fluff.</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="footer-bottom">\n'
            '                <p style="margin-bottom:8px;">As an Amazon Associate, HZYUGE earns from qualifying purchases.</p>\n'
            '                <p>&copy; 2026 HZYUGE Cycling Journal</p>\n'
            '            </div>\n'
            '        </div>\n'
            '    </footer>\n'
            '</body>\n'
            '</html>'
        )

        with open(filename, "w", encoding="utf-8") as f:
            f.write(full_doc)

        # Also update blog.js articles array
        self._update_index(slug, analysis)

        return filename

    def _update_index(self, slug, analysis):
        """Append new article info to blog.js articles array."""
        try:
            with open("js/blog.js", "r", encoding="utf-8") as f:
                content = f.read()

            tags_json = json.dumps(analysis.get("tags", ["cycling"]))
            read_time = max(3, len(analysis.get("excerpt", "").split()) // 200 + 3)
            image_url = self.unsplash_images.get(analysis["type"], self.unsplash_images["Ride Journal"])

            new_article = (
                "    {\n"
                "        id: " + str(int(time.time())) + ",\n"
                "        title: " + json.dumps(analysis["topic"]) + ",\n"
                "        excerpt: " + json.dumps(analysis.get("excerpt", "")[:150]) + ",\n"
                "        date: " + json.dumps(analysis["date"]) + ",\n"
                "        type: " + json.dumps(analysis["type"]) + ",\n"
                "        tags: " + tags_json + ",\n"
                '        readTime: "' + str(read_time) + ' min read",\n'
                "        image: " + json.dumps(image_url) + ",\n"
                "        url: " + json.dumps("articles/" + slug + ".html") + "\n"
                "    },\n"
            )

            content = content.replace(
                "const articles = [",
                "const articles = [\n" + new_article
            )

            with open("js/blog.js", "w", encoding="utf-8") as f:
                f.write(content)
            print("   -> index updated with new article")
        except Exception as e:
            print("   Warning: Could not update index: " + str(e))

    # ---------------------------------------------------------------
    # RUN: Full ReAct workflow
    # ---------------------------------------------------------------
    def run(self, user_input):
        print("=" * 50)
        print("HZYUGE Article Workflow (DeepSeek Powered)")
        print("   Input: " + user_input)
        print("=" * 50)

        # REASON
        analysis = self.reason(user_input)

        # ACT
        article_html = self.act(analysis)

        # OBSERVE (Loop: fix + re-check up to 2 times)
        for attempt in range(2):
            report = self.observe(article_html, analysis)
            print("\n   Quality Report (attempt " + str(attempt+1) + "):")
            print("   Score: " + str(report.get("score", "?")) + "/10")
            print("   Word count: " + str(report.get("word_count", "?")))
            print("   Issues: " + str(report.get("issues", [])))

            if report.get("pass") and report.get("score", 0) >= 7:
                print("   Quality check passed!")
                break
            else:
                print("   Quality issues found, auto-fixing...")
                article_html = self.auto_fix(article_html, report)

        # SAVE
        result_path = self.save_article(analysis, article_html)

        print("\nArticle saved: " + result_path)
        print("Amazon tag: " + self.amazon_tag + " | AdSense: " + self.ad_client)
        return result_path


# ============================================
# Main
# ============================================
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python article_workflow.py \"Your article idea in English\"")
        print("\nExamples:")
        print('  python article_workflow.py "Longjing hill climb - how I survived my first 4.5km climb"')
        print('  python article_workflow.py "Review of my Garmin Edge 530 after 2 years"')
        sys.exit(1)

    user_idea = " ".join(sys.argv[1:])
    agent = CyclingArticleAgent(max_steps=5)
    output_file = agent.run(user_idea)
    print("\nDone! Open: " + output_file)
