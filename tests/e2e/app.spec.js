const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- Task 1: Add a new todo item ---
    const input = window.getByPlaceholder('Add a new task...');
    await input.fill(taskText);
    // Find button by its text "Add"
    await window.getByRole('button', { name: 'Add' }).click();

    // --- Task 2: Verify the todo item was added ---
    // Look for the text directly in the window
    const todoItem = window.locator('li', { hasText: taskText }); 
    await expect(todoItem).toBeVisible();

    // --- Task 3: Mark the todo item as complete ---
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    // Kiểm tra class 'completed' trên thẻ li hoặc task text
    await expect(todoItem).toHaveClass(/completed/);

    // --- Task 4: Delete the todo item ---
    // Find delete button inside the specific todo item
    const deleteBtn = todoItem.locator('button'); // Nếu li chỉ có 1 button là nút xóa
    await deleteBtn.click();

    await expect(todoItem).not.toBeVisible();


    // Close the app
    await electronApp.close();
});