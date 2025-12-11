from playwright.sync_api import sync_playwright
import os

def verify_redesign(page):
    # Verify index.html (Homepage)
    page.goto(f"file://{os.getcwd()}/index.html")
    page.set_viewport_size({"width": 1400, "height": 900})
    page.screenshot(path="verification/redesign_home.png", full_page=True)
    print("Verified Home Page")

    # Verify services.html
    page.goto(f"file://{os.getcwd()}/services.html")
    page.screenshot(path="verification/redesign_services.png", full_page=True)
    print("Verified Services Page")

    # Verify contact.html
    page.goto(f"file://{os.getcwd()}/contact.html")
    page.screenshot(path="verification/redesign_contact.png", full_page=True)
    print("Verified Contact Page")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_redesign(page)
        browser.close()
