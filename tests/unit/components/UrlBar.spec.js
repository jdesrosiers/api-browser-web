import { expect } from "chai";
import { mount } from "@vue/test-utils";
import UrlBar from "@/components/UrlBar.vue";
import { Given, When, Then, And } from "../test-utils.js";


Given("a component with a UrlBar that binds to `url`", () => {
  let wrapper;
  const url = "http://example.com";
  const placeholder = "http://";

  beforeEach(() => {
    wrapper = mount({
      template: `<UrlBar v-model="url" placeholder="${placeholder}" />`,
      data: () => ({ url: "" }),
      components: { UrlBar }
    });
  });

  When("a placeholder is given", () => {
    Then("it should be set as the input's placeholder", () => {
      expect(wrapper.find("input").element.placeholder).to.equal(placeholder);
    });
  });

  When("a URL is entered in the UrlBar", () => {
    let input;

    beforeEach(() => {
      input = wrapper.find("input");

      wrapper.setData({ url });
    });

    And("the <Enter> key is pressed", () => {
      beforeEach(() => {
        input.trigger("keyup.enter");
      });

      Then("the UrlBar should emit a keyup.enter event", () => {
        const urlBar = wrapper.find(UrlBar);
        const enter = 13;
        expect(urlBar.emitted().keyup[0][0].keyCode).to.equal(enter);
      });
    });
  });

  When("the wrapper's url changes", () => {
    let input;
    const anotherUrl = "http://some-url.com";

    beforeEach(() => {
      input = wrapper.find("input");
      wrapper.setData({ url: anotherUrl });
    });

    Then("the text in the UrlBar should update", () => {
      expect(input.element.value).to.equal(anotherUrl);
    });
  });
});
