import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";
import { validateUri } from "@/validator.js";

Given("a URI", () => {
  When("the URI is invalid", () => {
    Then("it should return false", () => {
      expect(validateUri("abc")).to.be.false;
    });
  });

  When("the URI is valid", () => {
    Then("it should return true", () => {
      expect(validateUri("http://test.com")).to.be.true;
    });
  });

  When("the URI is an invalid URL, but a valid URI", () => {
    Then("it should return true", () => {
      expect(validateUri("http://test.com-x")).to.be.true;
    });
  });
});
