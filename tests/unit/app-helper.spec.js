import sinon from "sinon";
import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";
import { request } from "@/app-helper.js";


Given("a function to make a request", () => {
  beforeEach(() => {
    window.fetch = () => {};
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  When("a 200 response is returned", () => {
    const bodyString = "{\"hello\":\"world\"}";

    beforeEach(() => {
      const okResponse = new window.Response(bodyString, {
        status: 200,
        headers: { "Content-type": "application/json" }
      });

      window.fetch.returns(Promise.resolve(okResponse));
    });

    Then("it should return the body", () => {
      request("/foo").then((data) => {
        expect(data).to.have.property("body", bodyString);
      });
    });

    Then("it should return the status text", () => {
      request("/foo").then((data) => {
        expect(data).to.have.property("statusText", "OK");
      });
    });

    Then("it should return false for the error response boolean", () => {
      request("/foo").then((data) => {
        expect(data).to.have.property("wasResponseAnError", false);
      });
    });
  });

  When("an error response is returned", () => {
    beforeEach(() => {
      const errorResponse = new window.Response("", {
        status: 404
      });

      window.fetch.returns(Promise.resolve(errorResponse));
    });

    Then("it should return true for the error response boolean", () => {
      request("/foo").then((data) => {
        expect(data).to.have.property("wasResponseAnError", true);
      });
    });
  });
});
