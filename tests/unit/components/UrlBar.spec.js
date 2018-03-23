import { expect } from "chai";
import { mount } from "@vue/test-utils";
import UrlBar from "@/components/UrlBar.vue";


describe("Given a UrlBar", () => {
  let urlBar;

  beforeEach(() => {
    urlBar = mount(UrlBar);
  });

  describe("When a placeholder is given", () => {
    const placeholder = "http://";

    beforeEach(() => {
      urlBar.setProps({ placeholder });
    });

    it("Then it should be set as the input's placeholder", () => {
      expect(urlBar.find("input").element.placeholder).to.equal(placeholder);
    });
  });
});

describe("Given a wrapper component with a UrlBar that binds to `url`", () => {
  let wrapper;
  const url = "http://example.com";

  beforeEach(() => {
    wrapper = mount({
      template: `<UrlBar v-model="url" />`,
      data: () => ({ url: "" }),
      components: { UrlBar }
    });
  });

  describe("When text is entered in the UrlBar", () => {
    let input;

    beforeEach(() => {
      input = wrapper.find("input");

      input.element.value = url;
    });

    it("Then `url` should not be updated to the value in the UrlBar", () => {
      expect(wrapper.vm.url).to.equal("");
    });

    describe("And the <Enter> key is pressed in the UrlBar", () => {
      beforeEach(() => {
        input.trigger("keyup.enter");
      });

      it("Then `url` should update to the value in the UrlBar", () => {
        expect(wrapper.vm.url).to.equal(url);
      });
    });
  });

  describe("When the wrapper's url changes", () => {
    let input;

    beforeEach(() => {
      input = wrapper.find("input");
      wrapper.setData({ url: "some-url" });
    });

    it("Then the text in the UrlBar should update", () => {
      expect(input.element.value).to.equal("some-url");
    });
  });
});
