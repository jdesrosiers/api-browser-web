import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then, wait } from "./test-utils.js";
import sinon from "sinon";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
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
        request: () => {}
      }
    });
  });

  afterEach(async () => {
    app.vm.$destroy();
    window.location.hash = "";
    await wait(0);
  });

  When("there is no URL", () => {
    beforeEach(async () => {
      window.location.hash = "";
      await wait(0);
    });

    Then("it should display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    Then("it should display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });

    Then("it should display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("there is a valid URL and no body", () => {
    beforeEach(() => {
      app.setData({ body: undefined });
    });

    Then("it should display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should not display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });

    Then("it should not display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("there is a valid URL and a body", () => {
    beforeEach(() => {
      app.setData({ body: "some-body" });
    });

    Then("it should not display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should display Code", () => {
      expect(app.contains(Code)).to.equal(true);
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

    Then("it should not display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });

    Then("it should display Error", () => {
      expect(app.contains(Error)).to.equal(true);
    });
  });

  When("the URL is updated with a valid URL", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";

    beforeEach(async () => {
      app.setMethods({
        request() {
          this.body = "expected-body";
        }
      });
      app.setData({ url: anotherUrl });
      app.find("input").trigger("keyup.enter");
      await wait(0);
    });

    Then("fetch the resource and put the result in body", () => {
      expect(app.vm.body).to.equal("expected-body");
    });

    Then("there should not be an error message", () => {
      expect(app.vm.error).to.equal(undefined);
    });

    Then("the hash location should be set to the url-encoded URL", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  When("the URL is updated with an invalid URL", () => {
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

  When("the URL is updated with a valid URL and the request fails", () => {
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
