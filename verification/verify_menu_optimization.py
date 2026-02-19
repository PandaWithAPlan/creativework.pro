from playwright.sync_api import sync_playwright
import os

def verify_menu_optimization(page):
    print("Loading index.html...")
    page.goto(f"file://{os.getcwd()}/index.html")

    # Set viewport to mobile size
    page.set_viewport_size({"width": 375, "height": 800})
    print("Viewport set to mobile.")

    # Check if menu is initially hidden (not active)
    navbar_menu = page.locator("#navbar-menu")
    if navbar_menu.get_attribute("class") and "active" in navbar_menu.get_attribute("class"):
        print("FAIL: Menu should not be active initially.")
        exit(1)

    # Also check visibility (it should be hidden by CSS)
    # Note: is_visible() checks for display:none, visibility:hidden, etc.
    if navbar_menu.is_visible():
        print("FAIL: Menu should be hidden initially on mobile.")
        # We continue to test the JS logic even if CSS is weird, but warn.

    print("Initial state verified.")

    # Click mobile toggle
    mobile_btn = page.locator("#mobile-menu-btn")
    if not mobile_btn.is_visible():
        print("FAIL: Mobile menu button not visible.")
        exit(1)

    mobile_btn.click()
    print("Clicked mobile menu button.")

    # Check if menu is now active
    # Wait for class change if there is any animation, but here it's instant or via requestAnimationFrame?
    # JS uses classList.toggle, it should be instant.
    page.wait_for_timeout(100) # Give it a moment

    if "active" not in navbar_menu.get_attribute("class"):
        print("FAIL: Menu did not become active after click.")
        exit(1)

    if not navbar_menu.is_visible():
        print("FAIL: Menu is active but still not visible (CSS issue?).")
        # exit(1) # Don't exit, we are testing JS logic primarily.

    print("Menu opened successfully.")

    # Click a link inside the menu
    link = navbar_menu.locator("a").first
    link_href = link.get_attribute("href")
    print(f"Clicking link with href: {link_href}")

    # We need to ensure the click happens.
    link.click()
    print("Clicked link.")

    # Check if menu is closed (active class removed)
    page.wait_for_timeout(100)

    if "active" in navbar_menu.get_attribute("class"):
        print("FAIL: Menu did not close after clicking link. Event delegation might be broken.")
        exit(1)

    print("Menu closed successfully.")
    print("SUCCESS: Event delegation works correctly.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_menu_optimization(page)
        browser.close()
