import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then, wait } from "./test-utils.js";
import sinon from "sinon";
import App from "@/App.vue";
import Document from "@/components/Document.vue";
import Error from "@/components/Error.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import fetch from "node-fetch";


Given("an App", () => {
  let app;

  const hashUrl = "#http%3A%2F%2Fexample.com";
  const url = "http://example.com";

  beforeEach(async () => {
    window.location.hash = hashUrl;
    await wait(0);

    app = mount(App, {
      methods: {
        request: () => {}
      }
    });
  });

  afterEach(async () => {
    app.vm.$destroy();
    window.location.hash = "";
    await wait(0);
  });

  When("there is no response error", () => {
    beforeEach(async () => {
      window.location.hash = "";
      await wait(0);
    });

    Then("it should display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    Then("it should not display Document", () => {
      expect(app.contains(Document)).to.equal(false);
    });

    Then("it should not display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("there is a response", () => {
    beforeEach(() => {
      app.setData({ response: "" });
    });

    Then("it should display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should not display Document", () => {
      expect(app.contains(Document)).to.equal(false);
    });

    Then("it should not display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("there is an error", () => {
    const error = "some-error";
    beforeEach(() => {
      app.setData({ error });
    });

    Then("it should not display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should not display Document", () => {
      expect(app.contains(Document)).to.equal(false);
    });

    Then("it should display Error", () => {
      expect(app.contains(Error)).to.equal(true);
    });
  });

  When("a request is made with an invalid URL", () => {
    const invalidUrl = "some-invalid-url";
    const expectedHashUrl = "#some-invalid-url";
    const requestSpy = sinon.spy();

    beforeEach(async () => {
      app.setMethods({ request: requestSpy });
      app.setData({ url: invalidUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("it should not fetch the resource", () => {
      expect(requestSpy.called).to.equal(false);
    });

    Then("there should be an error message", () => {
      expect(app.vm.error).to.have.string("Invalid URL");
    });

    Then("the hash location should be set to the url-encoded URL", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  When("a request is made with a valid URL and the request is successful", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";
    let response;

    beforeEach(async () => {
      response = new fetch.Response(`"some-body"`, {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "application/json" }
      });
      app.setMethods({
        request() {
          this.response = response;
        }
      });
      app.setData({ url: anotherUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("fetch the resource and put the result in response", () => {
      expect(app.vm.response).to.equal(response);
    });

    Then("there should not be an error message", () => {
      expect(app.vm.error).to.equal(undefined);
    });

    Then("the hash location should be set to the url-encoded URL", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  When("a request is made with a valid URL and the request fails", () => {
    const anotherUrl = "http://another-example.com";

    beforeEach(async () => {
      app.setMethods({
        request() {
          this.doError();
        }
      });
      app.setData({ url: anotherUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("there should be an error message", () => {
      expect(app.vm.error).to.have.string("Check the browser console");
    });
  });

  When("the hash location exists when the component is mounted", () => {
    Then("the hash location should be url-decoded and update the app URL", () => {
      expect(app.vm.url).to.equal(url);
    });
  });

  When("the hash location is changed after mount", () => {
    const anotherHashUrl = "#http%3A%2F%2Fanother-example.com";
    const expectedUrl = "http://another-example.com";

    beforeEach(async () => {
      window.location.hash = anotherHashUrl;
      await wait(0);
    });

    Then("it should be url-decoded and it should update the app URL", () => {
      expect(app.vm.url).to.equal(expectedUrl);
    });
  });
});
