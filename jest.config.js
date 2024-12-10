module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.(test|spec).(ts|tsx)',
    '**/?(*.)+(test|spec).(ts|tsx)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/tests/server/server.test.ts', // Adjust the path to the file you want to ignore
  ],
};
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/testing/**/*.(test|spec).(ts|tsx)',
    '**/?(*.)+(test|spec).(ts|tsx)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/tests/server/server.test.ts',
  ],
};
