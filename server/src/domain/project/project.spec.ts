import { buildProject } from "./project";
import { MockIssues, MockIssueClass } from "../issue"; 
import { MockUsers, MockUserClass } from "../user";
import { mockId } from "../id";

describe(">> project", () => {
  const Project = buildProject({ Id: mockId });

  describe(">> constructor", () => {
    it("should instantiate Project", () => {
      const projectInfo = {
        name: "project uno",
      }
      const entity = new Project(projectInfo);
      expect(entity instanceof Project).toBeTruthy();
    });

    it ("should not instantiate Project and throw Error when required field is missing", () => {
      const projectWithEmptyName = {
        name: "",
      }
      expect(() => new Project(projectWithEmptyName)).toThrow();
      const projectWithUndefinedName = {
        name: undefined,
      }
      expect(() => new Project(projectWithUndefinedName)).toThrow();
    })

    it ("should instantiate Project with Issues when provided", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues
      }
      const entity = new Project(projectInfo);
      expect(entity.getIssues()[0] instanceof MockIssueClass).toBeTruthy;
    })

    it ("should generate a uuid if id is not provided", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues
      }
      const entity = new Project(projectInfo);
      expect(entity.getId()).not.toBeNull();;
    })

    it ("should not generate a new uuid if id is provided", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        id: "_1231252"
      }
      const entity = new Project(projectInfo);
      expect(entity.getId()).toEqual(projectInfo.id);
    })
  })

  describe(">> getIssues, getMembers", () => {
    it("getIssues should returns an array of object with IIssue interface", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        members: MockUsers,
      }
      const entity = new Project(projectInfo);
      expect(entity.getIssues()[0] instanceof MockIssueClass).toBeTruthy;
    })

    it("getMembers should returns an array of object with IUser interface", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        members: MockUsers,
      }
      const entity = new Project(projectInfo);
      expect(entity.getMembers()[0] instanceof MockUserClass).toBeTruthy;
    })
  })

  describe(">> addMember", () => {
    it ("should add the provided user as member", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        members: MockUsers.slice(0,2),
      }
      const entity = new Project(projectInfo);
      const newMember = MockUsers[2]
      const success = entity.addMember(newMember);
      expect(entity.getMembers()).toContain(newMember);
      expect(success).toBeTruthy();
    })

    it ("should not add a duplicate member and should return false on method call", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        members: MockUsers.slice(0,2),
      }
      const entity = new Project(projectInfo);
      const newMember = MockUsers[0]
      const success = entity.addMember(newMember);
      expect(entity.getMembers().filter(member => member.getUsername() == newMember.getUsername()).length).toEqual(1);
      expect(success).toBeFalsy();
    })
  })

  describe(">> addIssue", () => {
    it ("should add the provided issue to issue list", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues.slice(0,2),
        members: MockUsers,
      }
      const entity = new Project(projectInfo);
      const newIssue = MockIssues[2]
      const success = entity.addIssue(newIssue);
      expect(entity.getIssues()).toContain(newIssue);
      expect(success).toBeTruthy();
    })

    it ("should not add a duplicate issue and should return false on method call", () => {
      const projectInfo = {
        name: "project uno",
        issues: MockIssues,
        members: MockUsers,
      }
      const entity = new Project(projectInfo);
      const duplicatedIssue = MockIssues[0]
      const success = entity.addIssue(duplicatedIssue);
      expect(entity.getIssues().filter(issue => issue.getId() == duplicatedIssue.getId()).length).toEqual(1);
      expect(success).toBeFalsy();
    })
  })
})