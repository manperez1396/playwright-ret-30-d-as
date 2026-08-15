import {test, expect} from '@playwright/test'

test('Get all the usernames registered', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
    
    
        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
        await page.getByRole('link', { name: 'Admin' }).click();   
        
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
        await page.getByRole('menuitem', { name: 'Users' }).getByText('Users').click();
        await page.getByRole('table');

        const rows = page.getByRole('table').getByRole('row');
        const usernames: string[] = [];
        const rowCount = await rows.count();

        for (let i = 1; i < rowCount; i++) {
            const row = rows.nth(i);
            const usernameCell = row.getByRole('cell').nth(1);
            const usernameText = await usernameCell.textContent();  

           if (usernameText) {
            usernames.push(usernameText)
        }
    }

        console.log('Usernames:', usernames);

    });