// @ts-check
import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Title check
  await expect(page).toHaveTitle('VirtualShop - Premium Shopping Experience');
});

test('has search bar visible', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByPlaceholder('Search for products...')).toBeVisible();
});

test('category buttons are visible', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Electronics' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Accessories' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sports' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('navbar links work', async ({ page }) => {
  await page.goto('http://localhost:3000');

//await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
});
