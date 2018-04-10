import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import { Given, When, Then, wait } from "./test-utils.js";


Given("an App", () => {
  let app;

  const hashUrl = "#http%3A%2F%2Fexample.com";
  const url = "http://example.com";

  beforeEach(async () => {
    window.location.hash = hashUrl;
    await wait(0);

    app = mount(App, {
      data: { url },
      methods: {
        request: () => {}
      }
    });
  });

  afterEach(() => {
    app.vm.$destroy();
    window.location.hash = "";
  });

  When("there is no body", () => {
    Then("display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    Then("don't display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });
  });

  When("there is a body", () => {
    beforeEach(() => {
      app.setData({ body: "some-body" });
    });

    Then("don't display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("display Code", () => {
      expect(app.contains(Code)).to.equal(true);
    });
  });

  When("the url is updated", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";

    beforeEach(() => {
      app.setData({ url: anotherUrl });
    });

    Then("the hash location should be set to the url-encoded url", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  When("the hash location exists when the component is mounted", () => {
    Then("the hash location should be url-decoded and update the app url", () => {
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

    Then("it should be url-decoded and it should update the app url", () => {
      expect(app.vm.url).to.equal(expectedUrl);
    });
  });

  When("setting a generic error message", () => {
    beforeEach(() => {
      app.setMethods({
        request: app.vm.setGenericErrorMessage
      });

      app.setData({ url: "test-url" });
    });

    Then("display an error message", () => {
      expect(app.text()).contains("ERROR");
    });

    Then("display the code as text", () => {
      const code = app.find("code");
      expect(code.element.classList.contains("text")).to.be.true;
    });
  });
});
