"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['dist']
};
exports.default = config;
