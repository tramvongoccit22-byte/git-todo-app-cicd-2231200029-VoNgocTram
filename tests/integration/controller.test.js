const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const testText = 'Buy milk';

        // 1. Call the controller's handleAddTodo method with test text
        controller.handleAddTodo(testText);

        // 2. Get the list of todos directly from the service
        const todos = service.getTodos();

        // 3. Assert that the service's todos array has a length of 1
        expect(todos.length).toBe(1);

        // 4. Assert that the text of the first todo in the service matches the input
        expect(todos[0].text).toBe(testText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // 1. First, directly add a todo to the service
        service.addTodo('Task to be removed');

        // 2. Get the ID of the new todo
        const todoId = service.getTodos()[0].id;

        // 3. Call the controller's handleRemoveTodo method with that ID
        controller.handleRemoveTodo(todoId);

        // 4. Assert that the service's todos array is now empty
        expect(service.getTodos().length).toBe(0);
    });
});