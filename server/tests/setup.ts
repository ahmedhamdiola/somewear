// This file runs before all tests — sets up required environment variables
process.env.jwt_secret = "test-secret-key-for-jest";
process.env.db_path = process.env.db_path;
process.env.cloud_name = "test_cloud";
process.env.api_key = "test_api_key";
process.env.api_secret = "test_api_secret";
