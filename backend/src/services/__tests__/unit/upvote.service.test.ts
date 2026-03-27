// backend/src/services/__tests__/unit/upvote.service.test.ts

import { UpvoteService } from '../../upvote.service';
import { UpvoteRepository } from '../../../repositories/upvote.repository';
import { describe, beforeEach, vi, it, expect, Mocked, Mock } from 'vitest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// mock repository
vi.mock('../../../src/repositories/upvote.repository');

// mock bcrypt
vi.mock('bcryptjs', () => ({
    default: {
        compare: vi.fn(),
    },
}));

// mock jwt
vi.mock('jsonwebtoken', () => ({
    default: {
        sign: vi.fn(),
    },
}));

// test upvote service
describe('UpvoteService', () => {
    let upvoteService: UpvoteService;
    let mockUpvoteRepository: Mocked<UpvoteRepository>;
});