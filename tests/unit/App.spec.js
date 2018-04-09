import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then, wait } from "./test-utils.js";
import App from "@/App.vue";
import * as Browser from "../../lib/browser";
import Document from "@/components/Document.vue";
import Error from "@/components/Error.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";


Given("an App", () => {
  let app;

  const hashUrl = "#http%3A%2F%2Fexample.com";
  const url = "http://example.com";

  beforeEach(async () => {
    window.location.hash = hashUrl;
    await wait(0);

    app = mount(App, {
      methods: {
        request: () => Promise.resolve(Browser.nil)
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
      app.setData({ browser: "" });
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

  When("a request is made and the request is successful", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";
    let browser;

    beforeEach(async () => {
      browser = {};
      app.setMethods({
        request: () => Promise.resolve(browser)
      });
      app.setData({ url: anotherUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("fetch the resource and put the result in browser", () => {
      expect(app.vm.browser).to.equal(browser);
    });

    Then("there should not be an error message", () => {
      expect(app.vm.error).to.equal(undefined);
    });

    Then("the hash location should be set to the url-encoded URL", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  When("a request is made and the request fails", () => {
    const anotherUrl = "http://another-example.com";

    beforeEach(async () => {
      app.setMethods({
        request: () => Promise.reject("error")
      });
      app.setData({ url: anotherUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("there should be an error message", () => {
      expect(app.vm.error).to.have.string("error");
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
