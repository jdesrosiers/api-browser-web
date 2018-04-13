import sinon from "sinon";
import "whatwg-fetch";
import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";
import { myFetch } from "@/app-helper.js";


Given("a window with the fetch API", () => {
  beforeEach(() => {
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

    Then("it should return the body as text", () => {
      myFetch("/foobar")
        .then((body) => {
          expect(body).to.equal(bodyString);
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
