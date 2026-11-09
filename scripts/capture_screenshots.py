"""Capture real screenshots of the running Tiny Touch & Tastes demo site."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:4323/tiny-touch-and-tastes/"
OUT = Path("/root/readme-work/tiny-touch-and-tastes/docs/screenshots")
OUT.mkdir(parents=True, exist_ok=True)


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        # Homepage: hero + waiting list card
        await page.goto(BASE, wait_until="networkidle")
        await page.screenshot(path=str(OUT / "homepage.png"), full_page=True)

        # Book page: select a class, then a date so the calendar and time slots show
        await page.goto(BASE + "book", wait_until="networkidle")
        await page.click('button.class-option[data-id="baby-massage"]')
        await page.wait_for_timeout(600)
        day = page.locator("button.calendar-day").first
        await day.click()
        await page.wait_for_timeout(600)
        await page.screenshot(path=str(OUT / "booking-calendar.png"), full_page=True)

        # About page: founder + credentials
        await page.goto(BASE + "about", wait_until="networkidle")
        await page.screenshot(path=str(OUT / "about.png"), full_page=True)

        await browser.close()
        print("screenshots written to", OUT)


asyncio.run(main())