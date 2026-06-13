import bcrypt from "bcrypt";
import { AuthService } from "../../modules/auth/auth.service";
import { AuthRepository } from "../../modules/auth/auth.repository";
import {
generateAccessToken,
generateRefreshToken,
} from "../../utils/jwt";

jest.mock("../../modules/auth/auth.repository");
jest.mock("bcrypt");
jest.mock("../../utils/jwt");
jest.mock("../../utils/logger", () => ({
info: jest.fn(),
warn: jest.fn(),
error: jest.fn(),
}));

describe("AuthService", () => {
let authService: AuthService;
let mockRepository: jest.Mocked<AuthRepository>;

beforeEach(() => {
authService = new AuthService();


mockRepository =
  (authService as any).repository;

jest.clearAllMocks();

});

describe("register", () => {
it("should register a new user", async () => {
mockRepository.findUserByEmail =
jest.fn().mockResolvedValue(null);

  mockRepository.createUser =
    jest.fn().mockResolvedValue({
      id: "1",
      name: "Sumit",
      email: "sumit@gmail.com",
      password: "hashedPassword",
      role: "USER",
    });

  (bcrypt.hash as jest.Mock)
    .mockResolvedValue("hashedPassword");

  const result =
    await authService.register({
      name: "Sumit",
      email: "sumit@gmail.com",
      password: "Password123",
    });

  expect(
    mockRepository.findUserByEmail
  ).toHaveBeenCalledWith(
    "sumit@gmail.com"
  );

  expect(
    bcrypt.hash
  ).toHaveBeenCalledWith(
    "Password123",
    10
  );

  expect(
    mockRepository.createUser
  ).toHaveBeenCalled();

  expect(result.email)
    .toBe("sumit@gmail.com");
});

it("should throw error if user already exists", async () => {
  mockRepository.findUserByEmail =
    jest.fn().mockResolvedValue({
      id: "1",
      email: "sumit@gmail.com",
    });

  await expect(
    authService.register({
      name: "Sumit",
      email: "sumit@gmail.com",
      password: "Password123",
    })
  ).rejects.toThrow(
    "User already exists"
  );
});

});

describe("login", () => {
it("should login successfully", async () => {
const mockUser = {
id: "1",
name: "Sumit",
    email: "sumit@gmail.com",
password: "hashedPassword",
role: "USER",
};

  mockRepository.findUserByEmail =
    jest.fn().mockResolvedValue(
      mockUser
    );

  (bcrypt.compare as jest.Mock)
    .mockResolvedValue(true);

  (generateAccessToken as jest.Mock)
    .mockReturnValue("access-token");

  (generateRefreshToken as jest.Mock)
    .mockReturnValue("refresh-token");

  const result =
    await authService.login({
      email: "sumit@gmail.com",
      password: "Password123",
    });

  expect(
    result.accessToken
  ).toBe("access-token");

  expect(
    result.refreshToken
  ).toBe("refresh-token");
});

it("should throw error if user does not exist", async () => {
  mockRepository.findUserByEmail =
    jest.fn().mockResolvedValue(null);

  await expect(
    authService.login({
      email: "test@gmail.com",
      password: "Password123",
    })
  ).rejects.toThrow(
    "Invalid credentials"
  );
});

it("should throw error if password is invalid", async () => {
  mockRepository.findUserByEmail =
    jest.fn().mockResolvedValue({
      id: "1",
      email: "sumit@gmail.com",
      password: "hashedPassword",
    });

  (bcrypt.compare as jest.Mock)
    .mockResolvedValue(false);

  await expect(
    authService.login({
      email: "sumit@gmail.com",
      password: "wrongPassword",
    })
  ).rejects.toThrow(
    "Invalid credentials"
  );
});

});

describe("getProfile", () => {
it("should return user profile", async () => {
mockRepository.findUserById =
jest.fn().mockResolvedValue({
id: "1",
name: "Sumit",
      email: "sumit@gmail.com",
});

  const result =
    await authService.getProfile("1");

  expect(result.id)
    .toBe("1");
});

it("should throw error if user not found", async () => {
  mockRepository.findUserById =
    jest.fn().mockResolvedValue(null);

  await expect(
    authService.getProfile("1")
  ).rejects.toThrow(
    "User not found"
  );
});

});
});
