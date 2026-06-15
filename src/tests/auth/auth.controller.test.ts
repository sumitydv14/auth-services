import { Request, Response } from "express";
import { AuthController } from "../../modules/auth/auth.controller";
import { AuthService } from "../../modules/auth/auth.service";

jest.mock("../../modules/auth/auth.service");

describe("AuthController", () => {
let controller: AuthController;

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
controller = new AuthController();

mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.clearAllMocks();

});

describe("register", () => {
it("should register user successfully", async () => {
const user = {
id: "1",
name: "Sumit",
email: "[sumit@gmail.com](mailto:sumit@gmail.com)",
};

  (
    AuthService.prototype.register as jest.Mock
  ).mockResolvedValue(user);

  mockRequest = {
    body: {
      name: "Sumit",
      email: "sumit@gmail.com",
      password: "Password123",
    },
  };

  await controller.register(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(201);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: true,
    data: user,
  });
});

it("should return 400 when register fails", async () => {
  (
    AuthService.prototype.register as jest.Mock
  ).mockRejectedValue(
    new Error("User already exists")
  );

  mockRequest = {
    body: {
      email: "sumit@gmail.com",
    },
  };

  await controller.register(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(400);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: false,
    message: "User already exists",
  });
});

});

describe("login", () => {
it("should login successfully", async () => {
const result = {
accessToken: "access-token",
refreshToken: "refresh-token",
};

  (
    AuthService.prototype.login as jest.Mock
  ).mockResolvedValue(result);

  mockRequest = {
    body: {
      email: "sumit@gmail.com",
      password: "Password123",
    },
  };

  await controller.login(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(200);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: true,
    data: result,
  });
});

it("should return 400 when login fails", async () => {
  (
    AuthService.prototype.login as jest.Mock
  ).mockRejectedValue(
    new Error("Invalid credentials")
  );

  mockRequest = {
    body: {
      email: "wrong@gmail.com",
      password: "wrong",
    },
  };

  await controller.login(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(400);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: false,
    message: "Invalid credentials",
  });
});

});

describe("getProfile", () => {
it("should return profile successfully", async () => {
const user = {
id: "1",
name: "Sumit",
email: "[sumit@gmail.com](mailto:sumit@gmail.com)",
};

  (
    AuthService.prototype.getProfile as jest.Mock
  ).mockResolvedValue(user);

  mockRequest = {
    user: {
      id: "1",
      email:"sumit@gmail.com",
      role:"USER"

    },
  };

  await controller.getProfile(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(200);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: true,
    data: user,
  });
});

it("should return 401 if user id is missing", async () => {
  mockRequest = {};

  await controller.getProfile(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(401);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: false,
    message: "Unauthorized",
  });
});

it("should return 400 if profile fetch fails", async () => {
  (
    AuthService.prototype.getProfile as jest.Mock
  ).mockRejectedValue(
    new Error("User not found")
  );

  mockRequest = {
    user: {
      id: "1",
      email:"sumit@gmail.com",
      role:"USER"
    },
  };

  await controller.getProfile(
    mockRequest as Request,
    mockResponse as Response
  );

  expect(
    mockResponse.status
  ).toHaveBeenCalledWith(400);

  expect(
    mockResponse.json
  ).toHaveBeenCalledWith({
    success: false,
    message: "User not found",
  });
});

});
});
