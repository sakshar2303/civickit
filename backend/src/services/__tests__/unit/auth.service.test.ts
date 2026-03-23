//backend/tests/unit/services/auth.service.test.ts

import { AuthService } from '../../auth.service';
import { AuthRepository } from '../../../repositories/auth.repository';
import { describe, beforeEach, vi, it, expect, Mocked } from 'vitest';
import { CreateIssueDTO } from '@civickit/shared';

// Mock the repository, not integration test
vi.mock('../../../src/repositories/auth.repository');

describe('AuthService', () => {
    let authService: AuthService;
    let mockAuthRepository: Mocked<AuthRepository>;

    beforeEach(() => {
        // Create mock repository
        mockAuthRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findNearby: vi.fn(),
        } as unknown as Mocked<AuthRepository>;
        authService = new AuthService(mockAuthRepository);
    });
});