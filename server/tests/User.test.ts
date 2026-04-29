import { getUserByIdService, loginUserService, registerUserService} from "../src/services/UserService";
import { UserInterface } from "../src/interfaces/UserInterface";

describe("UserService", () => {
   
        const user : UserInterface = {
            username: "testuser",
            email: `testuser${Date.now()}@example.com`,
            password: "password123",
            address: "123 Test St",
            phone: "1234567890",
            role: "customer"

        };
        test("should register a new user", async () => {
            const res=await registerUserService(user);
            
            
            expect(res).toHaveProperty("user");
            expect(res).toHaveProperty("token");
            expect(res.user.email).toBe(user.email);
        });
        test("should login successfully", async () => {
            const res=await loginUserService(user.email, user.password);

            expect(res).toHaveProperty("user");
            expect(res).toHaveProperty("token");
            expect(res.user.email).toBe(user.email);
            
        });
        test("should get user by id", async () => {
            const rs= await registerUserService({
                username: "testuser2",
                email: `testuser2${Date.now()}@example.com`,
                password: "password123",
                address: "456 Test St",
                phone: "0987654321",
                role: "customer"
            });

            const user=getUserByIdService(rs.user.id!);
            expect(user).toBeDefined();
            expect(user.email).toBe("testuser2@example.com");
        }

        );
    });
