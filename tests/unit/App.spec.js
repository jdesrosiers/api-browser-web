import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";


describe("When the App loads", () => {
  const app = mount(App);

  it("should display WelcomeBanner", () => {
    expect(app.contains(WelcomeBanner)).to.equal(true);
  });

  it("should not display Code", () => {
    expect(app.contains(Code)).to.equal(false);
  });

  describe("When a resource is requested", () => {
    //it("should put the result in the body variable", () => {
      //app.vm.request();
      //expect(app.vm.body).to.equal("some-body");
    //});

    describe("When the body variable has been populated", () => {
      before(() => {
        app.setData({ body: "foo" });
      });

      it("should not display WelcomeBanner", () => {
        expect(app.contains(WelcomeBanner)).to.equal(false);
      });

      it("should display Code", () => {
        expect(app.contains(Code)).to.equal(true);
      });
    });
  });
});
