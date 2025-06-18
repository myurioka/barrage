let mockConsoleLog;

beforeAll(() => {
	mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
	mockConsoleLog.mockRestore();
});

afterEach(() => {
	mockConsoleLog.mockClear();
});
