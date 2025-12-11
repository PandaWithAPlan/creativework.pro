from playwright.sync_api import sync_playwright
import os

def verify_creative_hub(page):
    # Load the local HTML file using absolute path
    # Current working directory is /app
    page.goto(f"file://{os.getcwd()}/index.html")

    # Wait for the main elements to load
    page.wait_for_selector('h1')

    # Take a screenshot of the whole page (or viewport)
    page.set_viewport_size({"width": 1400, "height": 900})

    # Take screenshot
    page.screenshot(path="verification/creative_hub_desktop.png", full_page=True)

    # Mobile view verification
    page.set_viewport_size({"width": 375, "height": 800})
    page.screenshot(path="verification/creative_hub_mobile.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_creative_hub(page)
        browser.close()
