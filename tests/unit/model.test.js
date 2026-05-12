const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation
        service = new TodoService();
        // This is a bit of a hack to reset the singleton for testing purposes
        service.todos = [];
    });

    test('should add a new todo', () => {
        // CALL the addTodo method with some text
        service.addTodo('Learn Software Engineering');

        // ASSERT that the service's todos array has a length of 1
        expect(service.todos.length).toBe(1);

        // ASSERT that the text of the first todo matches the input text
        expect(service.todos[0].text).toBe('Learn Software Engineering');
    });

    test('should toggle the completed state of a todo', () => {
        // FIRST, add a todo
        service.addTodo('Test Toggle');
        const todoId = service.todos[0].id;

        // CALL the toggleTodoComplete method (false -> true)
        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(true);

        // CALL toggleTodoComplete again (true -> false)
        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        // ADD a todo
        service.addTodo('Task to be deleted');
        const todoId = service.todos[0].id;

        // CALL the removeTodo method
        service.removeTodo(todoId);

        // ASSERT that the service's todos array is now empty
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // CALL addTodo with an empty string
        service.addTodo('');

        // ASSERT that the todos array still has a length of 0
        expect(service.todos.length).toBe(0);
    });
});