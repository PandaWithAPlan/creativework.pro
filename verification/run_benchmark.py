from playwright.sync_api import sync_playwright
import os
import time

def run_benchmark(page):
    print("Loading benchmark page...")
    page.goto(f"file://{os.getcwd()}/verification/benchmark_delegation.html")

    # Wait for results to be populated in window.benchmarkResults
    start_wait = time.time()
    while time.time() - start_wait < 5:
        results = page.evaluate("() => window.benchmarkResults")
        if results:
            print("Benchmark Results:")
            print(f"Items: {results['count']}")
            print(f"Individual Listeners Time: {results['individualTime']} ms")
            print(f"Delegation Time: {results['delegationTime']} ms")

            if results['delegationTime'] == 0:
                print("Delegation Time was too fast to measure accurately (0 ms).")
                print("Performance improvement is effectively infinite.")
            else:
                improvement = results['individualTime'] / results['delegationTime']
                print(f"Improvement: {improvement:.2f}x faster initialization")
            return
        time.sleep(0.1)

    print("Timeout waiting for benchmark results.")
    exit(1)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        run_benchmark(page)
        browser.close()
