import sinon from "sinon";
import "whatwg-fetch";
import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";


Given("a window with the fetch API", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  When("a 200 response is returned", () => {
    beforeEach(() => {
      const okResponse = new window.Response("{\"hello\":\"world\"}", {
        status: 200,
        headers: {
          "Content-type": "application/json"
        }
      });

      window.fetch.returns(Promise.resolve(okResponse));
    });

    Then("it should return the response", () => {
      return window.fetch("/foobar")
        .then((response) => {
          console.log(response);
          response.json()
            .then((json) => {
              expect(json.hello).to.equal("world");
            });
          });
        });
  });
});
