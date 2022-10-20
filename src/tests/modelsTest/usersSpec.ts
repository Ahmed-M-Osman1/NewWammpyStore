import { User, UsersModel } from "../../DB-models/usersModels";
const UserModel = new UsersModel();
const testUser: User = {
  firstname: "ahmed",
  lastname: "mamdouh",
  email: "ahmed@udacity.com",
  password: "password",
};
let newUser: User;
describe("Testing UsersModel: ", () => {
  it("Test the create methods", () => {
    expect(UserModel.create).toBeDefined();
  });
  it("Test the create methods with testUser data", async () => {
    newUser = await UserModel.create(testUser);
    expect({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    }).toEqual({
      firstname: testUser.firstname,
      lastname: testUser.lastname,
      email: testUser.email,
    });
  });
  it("Test the index methods with testUser data", () => {
    expect(UserModel.index).toBeDefined();
  });

  it("Test the index methods to include the testUser", async () => {
    const allUsers = await UserModel.index();
    expect(allUsers).toContain(newUser);
  });

  it("Test the show methods", () => {
    expect(UserModel.show).toBeDefined();
  });

  it("Test the show methods to return the testUser", async () => {
    const userToSearch = await UserModel.show(newUser.id as number);
    expect(userToSearch).toEqual(newUser);
  });
  it("Test the delete method", () => {
    expect(UserModel.deleteUser).toBeDefined();
  });

  it("Test the delete method to return the deleted user", async () => {
    const deletedUser = await UserModel.deleteUser(newUser.id as number);
    expect(deletedUser.id).toEqual(newUser.id);
  });
});
