/**
 * HZYUGE Cycling Journal - Main Script
 * Features: article loading, Amazon affiliate links, AdSense slots
 */

// ============================================
// Free Image Sources (Unsplash - no AI generated)
// ============================================
const IMAGES = {
    cyclist_road:  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    cyclist_climb:  "https://images.unsplash.com/photo-1571068315805-91c6ebc73008?w=800&q=80",
    bike_gear:      "https://images.unsplash.com/photo-1541625602811-6630a8cc1c03?w=800&q=80",
    bike_repair:    "https://images.unsplash.com/photo-1532298229144-0ec6e92c7a04?w=800&q=80",
    lake_ride:      "https://images.unsplash.com/photo-1476482758037-1d662a89c7d6?w=800&q=80",
    group_ride:     "https://images.unsplash.com/photo-1507035895480-2d92c1e51d0e?w=800&q=80",
    nutrition:      "https://images.unsplash.com/photo-1490645935966-10f6d09737e9?w=800&q=80",
    sunset_ride:    "https://images.unsplash.com/photo-1501555088652-021f10510620?w=800&q=80",
};

// ============================================
// Article Data
// ============================================
const articles = [
    {
        id: 1780668757,
        title: "My First Group Ride Disaster: Lessons Learned the Hard Way",
        excerpt: "I showed up on a hybrid with no spare tube and got dropped. Here's what I learned about group rides.",
        date: "June 05, 2026",
        type: "Ride Journal",
        tags: ["group ride", "cycling etiquette", "drafting", "beginner cyclist", "lessons learned"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        url: "articles/my-first-group-ride-disaster-lessons-learned-the-hard-way.html"
    },

    {
        id: 1780668755,
        title: "Why I Ditched Strava Premium for Free Cycling Tools",
        excerpt: "I canceled my Strava Premium subscription and built a better cycling toolkit for free. Here's my honest setup.",
        date: "June 05, 2026",
        type: "Tips & Skills",
        tags: ["cycling apps", "Strava alternative", "free tools", "RideWithGPS", "Intervals.icu", "cycling tips"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1532298229144-0ec6e92c7a04?w=800&q=80",
        url: "articles/why-i-ditched-strava-premium-for-free-cycling-tools.html"
    },

    {
        id: 1780668717,
        title: "Real Food for 100km Rides: What Actually Works",
        excerpt: "From gagging on gels to perfecting rice balls, here's what I actually eat on 100km rides.",
        date: "June 05, 2026",
        type: "Tips & Skills",
        tags: ["cycling nutrition", "real food for cyclists", "bonk prevention", "100km ride tips", "energy gels alternative"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1532298229144-0ec6e92c7a04?w=800&q=80",
        url: "articles/real-food-for-100km-rides-what-actually-works.html"
    },

    {
        id: 1780668713,
        title: "How a Bike Fit Saved My Knees, Hands, and Back",
        excerpt: "Two years of pain from the wrong bike size ended with a professional fit. Here's what changed.",
        date: "June 05, 2026",
        type: "Ride Journal",
        tags: ["bike fit", "cycling pain", "knee pain cycling", "numb hands", "lower back pain", "professional bike fitting"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        url: "articles/how-a-bike-fit-saved-my-knees-hands-and-back.html"
    },

    {
        id: 1780668676,
        title: "My First Climb of Longjing: Pain, Tea, and Triumph",
        excerpt: "A rookie's honest take on climbing Longjing: too fast, too hard, but the tea fields made it epic.",
        date: "June 05, 2026",
        type: "Ride Journal",
        tags: ["Longjing", "Hangzhou", "climbing", "cycling", "first time"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        url: "articles/my-first-climb-of-longjing-pain-tea-and-triumph.html"
    },

    {
        id: 1780668105,
        title: "My First 100km Ride: Pain, Cramp, and Pure Joy",
        excerpt: "My first 100km ride was brutal\u2014cramps, pain, and doubt. But crossing the finish line made it all worth it.",
        date: "June 05, 2026",
        type: "Ride Journal",
        tags: ["first century ride", "cycling milestones", "endurance", "beginner cyclist", "long distance cycling"],
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
        url: "articles/my-first-100km-ride-pain-cramp-and-pure-joy.html"
    },

    {
        id: 1,
        slug: "longjing-hill-climb-guide",
        title: "Conquering Longjing: A Hill Climb Guide From Zero to Hero",
        date: "2026-06-03",
        tag: "Route Guide",
        excerpt: "Longjing is the proving ground for Hangzhou cyclists. 4.5km at 5% average gradient — it doesn't lie. Here's everything I learned from 50+ attempts.",
        coverImage: IMAGES.cyclist_climb,
        content: `
            <img src="${IMAGES.cyclist_climb}" alt="Cyclist climbing hill" class="article-img-full">
            <p>If you ride a road bike in Hangzhou and haven't climbed Longjing, you're missing the local rite of passage. This climb doesn't care about your bike's price tag — it only cares about your legs and your lungs.</p>

            <h2>The Route</h2>
            <p>The climb starts at the Longjing Road / Manjuelong Road intersection and ends at the Longjing Tea House. 4.5km, 220m elevation gain, average 5% with sections hitting 12%. For beginners, it's serious but absolutely doable.</p>

            <h2>Gear Check</h2>
            <p>Before your first attempt, make sure you check these:</p>
            <ul>
                <li><strong>Brakes:</strong> The descent is more dangerous than the climb. Pad thickness > 2mm, linear lever feel.</li>
                <li><strong>Tire pressure:</strong> Front 90-95psi, rear 95-100psi. Too high = less grip. Too low = more resistance.</li>
                <li><strong>Helmet:</strong> Non-negotiable. You'll hit 50+ km/h on the way down.</li>
            </ul>

            <h3>Recommended Gear</h3>
            <p>If you're gearing up for hill climbs, here's what actually works:</p>
            <a href="https://www.amazon.com/dp/B087TKF1NM?tag=hzyuge-20" class="amazon-link" target="_blank" rel="nofollow sponsored">
                <span class="amz-icon">🛒</span> Giro Syntax MIPS Helmet — lightweight climbing choice
            </a>

            <h2>Pacing Strategy</h2>
            <p>The secret to Longjing isn't speed — it's consistency. I've watched too many people sprint the first kilometer and walk the rest.</p>
            <ul>
                <li><strong>First 1km:</strong> Keep HR at 70-75% max. Big ring, mid cassette. This is your warmup.</li>
                <li><strong>Middle 2.5km:</strong> Switch to small ring. Cadence 85-95 rpm. If HR exceeds 85%, slow down — don't stop.</li>
                <li><strong>Final 1km:</strong> Gradient eases slightly. You can push, but save something for the descent.</li>
            </ul>

            <h2>Descent Safety</h2>
            <p>People underestimate the Longjing descent. Blind corners, occasional gravel, weekend tourist traffic. Three rules: brake before corners, eyes down the road, body relaxed on the bike.</p>

            <p>Cycling isn't just about reaching the top. Every breath, every drop of sweat — it's all part of the story. See you on the climb. 🚵</p>
        `
    },
    {
        id: 2,
        slug: "essential-cycling-gear-2026",
        title: "Essential Cycling Gear for Beginners (2026): What You Actually Need",
        date: "2026-05-28",
        tag: "Gear Review",
        excerpt: "Overwhelmed by cycling gear options? After 5 years of riding, here's my honest list — what to buy first, what to skip, and where to spend your money.",
        coverImage: IMAGES.bike_gear,
        content: `
            <img src="${IMAGES.bike_gear}" alt="Cycling gear on workbench" class="article-img-full">
            <p>Every new cyclist asks the same question: "What do I actually need?" There's no single answer — a ¥60,000 bike and a ¥6,000 bike both get you moving. But some gear genuinely makes you safer and more comfortable without emptying your wallet.</p>

            <h2>The Essentials (by priority)</h2>

            <h3>1. Helmet — Budget $50-100</h3>
            <p>This is the one piece of gear you hope you never test. Look for: MIPS technology, proper fit, decent ventilation.</p>
            <a href="https://www.amazon.com/dp/B087TKF1NM?tag=hzyuge-20" class="amazon-link" target="_blank" rel="nofollow sponsored">
                <span class="amz-icon">🛒</span> Giro Syntax MIPS Helmet — recommended
            </a>

            <h3>2. Bib Shorts — Budget $40-80</h3>
            <p>The most overlooked piece of gear by beginners. Good bibs make the difference between enjoying hour 3 and suffering through it. Look for: high-density chamois, breathable fabric, proper fit.</p>

            <h3>3. Bottle Cages + Bottles — Budget $10-30</h3>
            <p>Don't underestimate this. Riding an hour in summer without water is dangerous. A good cage won't eject your bottle on rough roads.</p>
            <a href="https://www.amazon.com/dp/B08RWX87L5?tag=hzyuge-20" class="amazon-link" target="_blank" rel="nofollow sponsored">
                <span class="amz-icon">🛒</span> CamelBak Podium Bottle — squeeze-to-drink design
            </a>

            <h3>4. Lights — Budget $20-50</h3>
            <p>Non-negotiable for night riding, helpful even during the day. Front: at least 400 lumens. Rear: multiple flash modes.</p>

            <h3>5. Gloves — Budget $15-30</h3>
            <p>Protect your palms, absorb sweat, improve grip. In a crash, they're your first line of defense.</p>

            <h2>Nice-to-Have (when budget allows)</h2>
            <ul>
                <li><strong>Clipless pedals + shoes:</strong> Noticeable efficiency gain, but takes getting used to.</li>
                <li><strong>Bike computer:</strong> GPS unit uses way less battery than your phone.</li>
                <li><strong>Jersey:</strong> Tight fit = less drag. Back pockets are incredibly useful.</li>
            </ul>

            <p>One thing to remember: gear is just tools. Your legs and consistency are what really matter. Don't let the gear nerds pressure you — just get out and ride.</p>
        `
    },
    {
        id: 3,
        slug: "qiandao-lake-loop-ride",
        title: "Qiandao Lake Loop: 136km, 8 Hours, and One Dog Chase",
        date: "2026-05-20",
        tag: "Ride Journal",
        excerpt: "A solo 136km loop around Qiandao Lake — from pre-dawn jitters to mid-ride dog sprints to sunset reflections.",
        coverImage: IMAGES.lake_ride,
        content: `
            <img src="${IMAGES.lake_ride}" alt="Cyclist riding by the lake" class="article-img-full">
            <p>My alarm went off at 5:20 AM and I immediately regretted everything. I'd been too excited to sleep, finally crashing around 1 AM. But when I pulled back the curtain and saw the eastern sky turning orange, every ounce of fatigue evaporated. The Qiandao Lake loop I'd been planning for a year was finally happening.</p>

            <h2>Departure: Dawn at Qiandao Lake Town</h2>
            <p>Wheels rolling at exactly 6:00 AM. The lake was impossibly still, thin mist hanging over distant islands. Occasional egrets skimmed the water surface. Temperature around 18°C — perfect. The first 20km along Chunyang Road southbound were smooth asphalt with almost zero traffic. I averaged 28 km/h through this section, feeling unstoppable.</p>

            <img src="${IMAGES.group_ride}" alt="Cyclists on scenic road" class="article-img-mid">

            <h2>Unscripted: The Dog Chase</h2>
            <p>Around kilometer 45, passing through a small village, a large yellow dog bolted out of a courtyard and came straight for me. I'm not exaggerating when I say my cadence hit a personal record in those 200 meters — heart rate spiked to 180 instantly. The dog gave up after about 200 meters. I stopped, caught my breath, and laughed out loud. These "unplanned moments" are exactly what makes cycling stories worth telling.</p>

            <h2>The Climbs: Shangjiangbu Bridge Section</h2>
            <p>The climbing on Chunyang Road hits hardest between km 60-80. A series of rolling hills stacked back to back tested my endurance. I stopped at a roadside shop for water. The owner, a 60-something man, was fascinated by my road bike. We chatted for 15 minutes. He told me he rode an old steel single-speed from Qiandao to Hangzhou back in his youth — those guys were the real cyclists.</p>

            <h2>Fuel: What to Bring</h2>
            <p>Rest stops are sparse on the Qiandao loop. Pack these:</p>
            <ul>
                <li>Energy gels x4 (one every 30km)</li>
                <li>Electrolyte tablets (you'll sweat more than you think)</li>
                <li>Bananas x2 (nature's energy bar)</li>
                <li>Snickers or Clif bars as backup</li>
            </ul>
            <a href="https://www.amazon.com/dp/B0026R8C8S?tag=hzyuge-20" class="amazon-link" target="_blank" rel="nofollow sponsored">
                <span class="amz-icon">🛒</span> GU Energy Gel — essential for long rides
            </a>

            <h2>Arrival: 2:03 PM</h2>
            <p>Back at Qiandao Lake Town. The bike computer read: 136.7km, 1,200m elevation, total time 8:03 (riding time 6:10). I sat on a bench by the lake, finished my last bottle of water, and watched the evening light paint the water gold.</p>

            <img src="${IMAGES.sunset_ride}" alt="Sunset over lake" class="article-img-mid">

            <p>That's the magic of cycling — the road beats you up, but when you look back, all you see is the view.</p>
        `
    }
];

// ============================================
// Amazon Affiliate Gear List
// ============================================
const AMAZON_TAG = "hzyuge-20";  // <-- Your Amazon Associate ID

const amazonGear = [
    { name: "Giro Syntax MIPS Helmet",     price: "$89.95", url: `https://www.amazon.com/dp/B087TKF1NM?tag=${AMAZON_TAG}` },
    { name: "CamelBak Podium Bottle",      price: "$12.99", url: `https://www.amazon.com/dp/B08RWX87L5?tag=${AMAZON_TAG}` },
    { name: "GU Energy Gel (24-pack)",      price: "$35.99", url: `https://www.amazon.com/dp/B0026R8C8S?tag=${AMAZON_TAG}` },
    { name: "Pearl iZUMi Bib Shorts",      price: "$64.99", url: `https://www.amazon.com/dp/B07FTVNQYX?tag=${AMAZON_TAG}` },
    { name: "Topeak Mini 20 Tool Kit",      price: "$26.95", url: `https://www.amazon.com/dp/B00CWWT8MY?tag=${AMAZON_TAG}` },
];

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    loadAmazonGear();
});

function loadArticles() {
    const grid = document.getElementById('articleGrid');
    if (!grid) return;

    grid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="card-image">
                <img src="${article.coverImage}" alt="${article.title}">
            </div>
            <div class="card-body">
                <div class="card-meta">
                    <span>${article.date}</span>
                    <span class="card-tag">${article.tag}</span>
                </div>
                <h3><a href="#" onclick="viewArticle('${article.slug}'); return false;">${article.title}</a></h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span>📖 ${estimateReadTime(article.content)} min read</span>
                    </div>
                    <a href="#" class="read-more" onclick="viewArticle('${article.slug}'); return false;">Read more →</a>
                </div>
            </div>
        </article>
    `).join('');
}

function viewArticle(slug) {
    const article = articles.find(a => a.slug === slug);
    if (!article) return;

    const grid = document.getElementById('articleGrid');
    const sectionTitle = document.querySelector('.section-title');

    const detailHTML = `
        <div class="article-detail" id="articleDetail">
            <a href="#" class="back-link" onclick="backToArticles(); return false;" style="display:inline-block;margin-bottom:16px;color:var(--green);font-weight:600;">← Back to articles</a>
            <div class="article-header">
                <div class="card-meta">
                    <span>${article.date}</span>
                    <span class="card-tag">${article.tag}</span>
                    <span>📖 ${estimateReadTime(article.content)} min read</span>
                </div>
                <h1>${article.title}</h1>
            </div>
            <div class="article-content">
                ${article.content}
            </div>
            <div class="ad-in-content">
                <div class="ad-label">Advertisement</div>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-替换为你的ID"
                     data-ad-slot="替换为你的广告位ID"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
        </div>
    `;

    grid.innerHTML = detailHTML;
    sectionTitle.textContent = article.title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToArticles() {
    const grid = document.getElementById('articleGrid');
    const sectionTitle = document.querySelector('.section-title');
    sectionTitle.innerHTML = '<span class="title-icon">📝</span> Latest Articles';
    grid.innerHTML = '';
    loadArticles();
}

function estimateReadTime(content) {
    const text = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, minutes);
}

function loadAmazonGear() {
    const list = document.getElementById('amazonGearList');
    if (!list) return;

    list.innerHTML = amazonGear.map(gear => `
        <li>
            <a href="${gear.url}" target="_blank" rel="nofollow sponsored">
                🛒 ${gear.name}
                <span class="gear-price">${gear.price}</span>
            </a>
        </li>
    `).join('');
}
