import sinon from "sinon";
import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";
import { request } from "@/app-helper.js";


Given("a window with the fetch API", () => {
  beforeEach(() => {
    window.fetch = () => {};
    sinon.stub(window, "fetch");
  });

  afterEach(() => {
    window.fetch.restore();
  });

  When("a 200 response is returned", () => {
    const bodyString = "{\"hello\":\"world\"}";
    const expectedData = {
      body: bodyString
    };

    beforeEach(() => {
      const okResponse = new window.Response(bodyString, {
        status: 200,
        headers: { "Content-type": "application/json" }
      });

      window.fetch.returns(Promise.resolve(okResponse));
    });

    Then("it should return the body", () => {
      request("/foobar")
        .then((data) => {
          expect(data).to.eql(expectedData);
        });
    });
  });
});

//return window.fetch("/foobar")
//  .then((response) => {
//    response.json()
//      .then((json) => {
//        expect(json.hello).to.equal("world");
//      });
//  });
