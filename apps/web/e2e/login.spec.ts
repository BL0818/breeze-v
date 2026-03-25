import { expect, test } from '@playwright/test'

test('login page can render and submit', async ({ page }) => {
  await page.goto('/login')

  await expect(page.getByTestId('login-title')).toBeVisible()

  await page.getByTestId('login-email').fill('hello@breezev.dev')
  await page.getByTestId('login-password').fill('breezev-2026')
  await page.getByTestId('login-submit').click()

  await expect(page.getByTestId('login-submit-message')).toContainText(
    'Submitted: hello@breezev.dev',
  )
})
