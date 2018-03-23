import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import { wait } from "./test-utils.js";


describe("Given an App", () => {
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

  describe("When there is no body", () => {
    it("Then display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    it("Then don't display Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });
  });

  describe("When there is a body", () => {
    beforeEach(() => {
      app.setData({ body: "some-body" });
    });

    it("Then don't display WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    it("Then display Code", () => {
      expect(app.contains(Code)).to.equal(true);
    });
  });

  describe("When the url is updated", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";

    beforeEach(() => {
      app.setData({ url: anotherUrl });
    });

    //it("Then fetch the resource and put the result in body", () => {
      //expect(app.vm.body).to.equal("some-body");
    //});

    it("Then the hash location should be set to the url-encoded url", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });
  });

  describe("When the hash location exists when the component is mounted", () => {
    it("Then the hash location should be url-decoded and update the app url", () => {
      expect(app.vm.url).to.equal(url);
    });
  });

  describe("When the hash location is changed after mount", () => {
    const anotherHashUrl = "#http%3A%2F%2Fanother-example.com";
    const expectedUrl = "http://another-example.com";

    beforeEach(async () => {
      window.location.hash = anotherHashUrl;
      await wait(0);
    });

    it("Then it should be url-decoded and it should update the app url", () => {
      expect(app.vm.url).to.equal(expectedUrl);
    });
  });
});
