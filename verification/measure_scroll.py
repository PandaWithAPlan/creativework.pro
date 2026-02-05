import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        cwd = os.getcwd()
        # Use privacy.html as it has standard scrolling behavior with the sticky header
        url = f"file://{cwd}/privacy.html"

        # Inject code to spy on classList.toggle and count scroll events
        await page.add_init_script("""
            window.toggleCount = 0;
            window.scrollEvents = 0;

            window.addEventListener('scroll', () => {
                window.scrollEvents++;
            });

            const originalToggle = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(token, force) {
                if (token === 'is-scrolled') {
                    window.toggleCount++;
                }
                return originalToggle.apply(this, arguments);
            };
        """)

        await page.goto(url)

        print("Starting benchmark: Scroll Down 200px")
        await page.evaluate("""() => {
            return new Promise((resolve) => {
                let distance = 0;
                const interval = setInterval(() => {
                    window.scrollBy(0, 20);
                    distance += 20;
                    if (distance >= 200) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 20);
            });
        }""")

        await asyncio.sleep(0.5)

        print("Starting benchmark: Scroll Up 200px")
        await page.evaluate("""() => {
            return new Promise((resolve) => {
                let distance = 0;
                const interval = setInterval(() => {
                    window.scrollBy(0, -20);
                    distance += 20;
                    if (distance >= 200) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 20);
            });
        }""")

        await asyncio.sleep(0.5)

        data = await page.evaluate("""({
            toggleCount: window.toggleCount,
            scrollEvents: window.scrollEvents
        })""")

        print(f"-" * 40)
        print(f"BENCHMARK RESULTS")
        print(f"Total Scroll Events: {data['scrollEvents']}")
        print(f"DOM 'is-scrolled' Toggles: {data['toggleCount']}")
        print(f"-" * 40)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
