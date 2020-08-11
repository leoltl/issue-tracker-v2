import { buildIssueClass } from "./issue";
import { MockUsers } from "../user";
import { mockId } from "../id";
describe(">> issue" , () => {
  const Issue = buildIssueClass({ Id: mockId });
  describe(">> constructor", () => {
    it("should instantiate Issue", () => {
      const issue = {
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
      }
      const entity = new Issue(issue);
      expect(entity instanceof Issue).toBeTruthy();
    });

    it ("should not instantiate Issue and throw Error when required field is missing", () => {
      const issueMissingFields = {
        title: "",
        description: "first issue of the project...",
        author: MockUsers[0],
      }

      expect(() => new Issue(issueMissingFields)).toThrow();

      const issueUndefinedFields = {
        title: undefined,
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "open",
        priority: "low"
      }

      expect(() => new Issue(issueUndefinedFields)).toThrow();
    })

    it ("should instantiate Issue with optional parameters when provided", () => {
      const issueWithOptionalParams = {
        id: "1234",
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "open",
        priority: "low"
      }
      const entity = new Issue(issueWithOptionalParams);
      expect(entity.getId()).toEqual(issueWithOptionalParams.id);
      expect(entity.getStatus()).toEqual(issueWithOptionalParams.status);
      expect(entity.getPriority()).toEqual(issueWithOptionalParams.priority);
    })

    it ("should generate a uuid if id is not provided", () => {
      const issueWithOptionalParams = {
        id: "",
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "open",
        priority: "low"
      }
      const entity = new Issue (issueWithOptionalParams);
      expect(entity.getId()).not.toBeNull();;
    })

    it ("should not generate a new uuid if id is provided", () => {
      const issueWithOptionalParams = {
        id: "1234",
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "open",
        priority: "low"
      }
      const entity = new Issue (issueWithOptionalParams);
      expect(entity.getId()).toEqual(issueWithOptionalParams.id);
    })
  })

  describe(">> closeTicket", () => {
    it("closes an open issue", () => {
      const comment = {
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
      }
  
      const entity = new Issue(comment);
      expect(entity.getStatus()).toEqual("open");
      entity.closeIssue();
      expect(entity.getStatus()).toEqual("closed");
    })
    
    it("does nothing to a closed issue", () => {
      const comment = {
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "closed"
      }
      const entity = new Issue(comment);
      entity.closeIssue();
      expect(entity.getStatus()).toEqual("closed");
    })
  })

  describe(">> getAuthor, getAssignedTo", () => {
    it("getAuthor should return author with a IUser interface", () => {
      const comment = {
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "closed"
      }
      const entity = new Issue(comment);
      expect(entity.getAuthor()).toEqual(MockUsers[0]);
    })

    it("getAssignedTo should return a user with a IUser interface", () => {
      const comment = {
        title: "first issue",
        description: "first issue of the project...",
        author: MockUsers[0],
        status: "closed",
        assignedTo: MockUsers[2]
      }
      const entity = new Issue(comment);
      expect(entity.getAssignedTo()).toEqual(MockUsers[2]);
    })
  })
})