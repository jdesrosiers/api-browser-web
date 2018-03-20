import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";


describe("Given an App", () => {
  let app;

  beforeEach(() => {
    app = mount(App);
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

  //describe("When the url is updated", () => {
    //beforeEach(async () => {
      //app.vm.url = "http://localhost:3000";
    //});

    //it("Then fetch the resource and put the result in body", () => {
      //expect(app.vm.body).to.equal("some-body");
    //});
  //});
});
