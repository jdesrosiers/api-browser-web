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

  When("there is no url", () => {
    beforeEach(async () => {
      window.location.hash = "";
      await wait(0);
    });

    Then("display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    Then("don't display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });
  });

  When("there is a url and no body", () => {
    beforeEach(() => {
      app.setData({ body: undefined });
    });

    Then("don't display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("don't display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });
  });

  When("there is a url and a body", () => {
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
      app.find("input").trigger("keyup.enter");
    });

    //Then("fetch the resource and put the result in body", () => {
      //expect(app.vm.body).to.equal("some-body");
    //});

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
});
