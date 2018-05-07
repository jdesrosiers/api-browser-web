import { expect } from "chai";
import { mount, shallow, createLocalVue } from "@vue/test-utils";
import { Given, When, Then, wait } from "@/../tests/unit/test-utils";
import { browserFixture } from "@/../tests/unit/fixtures";
import Vuex from "vuex";
import App from "@/App.vue";
import * as Application from "@/../lib/application";
import Document from "@/components/Document/Document.vue";
import Error from "@/components/Error.vue";
import store from "@/store";
import UrlBar from "@/components/UrlBar.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";


const localVue = createLocalVue();
localVue.use(Vuex);

Given("an App", () => {
  let app;

  afterEach(async () => {
    app.vm.$destroy();
    window.location.hash = "";
    await wait(0);
  });

  When("there is no hash location", () => {
    before(async () => {
      Application.setLocation("");
      await wait(0);

      app = shallow(App);
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

  When("a request is pending", () => {
    before(async () => {
      Application.setLocation("http://example.com");
      await wait(0);

      const Browser = browserFixture({
        follow: () => new Promise((resolve) => setTimeout(resolve, 100, {}))
      });

      app = shallow(App, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
    });

    Then("it should not display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should not display Document", () => {
      expect(app.contains(Document)).to.equal(false);
    });

    Then("it should not display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("a request is made and there is an error", () => {
    before(async () => {
      Application.setLocation("http://example.com");
      await wait(0);

      const Browser = browserFixture({
        follow: () => Promise.reject("some-error")
      });

      app = shallow(App, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
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
    before(async () => {
      Application.setLocation("http://example.com");
      await wait(0);

      const Browser = browserFixture({
        follow: () => Promise.resolve({})
      });

      app = shallow(App, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
    });

    Then("it should not display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("it should display Document", () => {
      expect(app.contains(Document)).to.equal(true);
    });

    Then("it should not display Error", () => {
      expect(app.contains(Error)).to.equal(false);
    });
  });

  When("the hash location is changed after mount", () => {
    before(async () => {
      const Browser = browserFixture({
        follow: () => Promise.resolve({})
      });

      app = shallow(App, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });

      Application.setLocation("http://example.com");
      await wait(0);
    });

    Then("it should make a request for that URL", () => {
      expect(app.contains(Document)).to.equal(true);
    });
  });

  When("a request is made from the UrlBar", () => {
    before(async () => {
      const Browser = browserFixture({
        follow: () => Promise.reject("some-error")
      });

      app = mount(App, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });

      const urlBar = app.find(UrlBar);
      const input = urlBar.find("input");
      input.element.value = "http://example.com";
      input.trigger("keyup.enter");
    });

    Then("it should update the location", () => {
      expect(Application.getLocation()).to.equal("http://example.com");
    });
  });
});
