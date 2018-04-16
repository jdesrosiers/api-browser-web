import { expect } from "chai";
import { Given, When, Then, And } from "../test-utils.js";
import { mount } from "@vue/test-utils";
import UrlBar from "@/components/UrlBar.vue";


Given("a UrlBar", () => {
  let urlBar;

  beforeEach(() => {
    urlBar = mount(UrlBar);
  });

  When("a placeholder is given", () => {
    const placeholder = "http://";

    beforeEach(() => {
      urlBar.setProps({ placeholder });
    });

    Then("it should be set as the input's placeholder", () => {
      expect(urlBar.find("input").element.placeholder).to.equal(placeholder);
    });
  });

  When("a valid URL is typed into the UrlBar", () => {
    let input;

    beforeEach(() => {
      input = urlBar.find("input");

      input.element.value = "http://www.test.com";
    });

    And("the <Enter> key is pressed in the UrlBar", () => {
      beforeEach(() => {
        input.trigger("keyup.enter");
      });

      Then("the input element should be registered as valid", () => {
        const isInputValid = !input.element.classList.contains("is-invalid");

        expect(isInputValid).to.be.true;
      });

      Then("two events are emitted", () => {
        const emittedEvents = urlBar.emitted();
        const numberOfEmittedEvents = Object.keys(emittedEvents).length;

        expect(numberOfEmittedEvents).to.equal(2);
      });
    });
  });

  When("an invalid URL is typed into the UrlBar", () => {
    let input;

    beforeEach(() => {
      input = urlBar.find("input");

      input.element.value = "abc";
    });

    And("the <Enter> key is pressed in the UrlBar", () => {
      beforeEach(() => {
        input.trigger("keyup.enter");
      });

      Then("the input element should be registered as invalid", () => {
        const isInputValid = !input.element.classList.contains("is-invalid");

        expect(isInputValid).to.be.false;
      });

      Then("two events are emitted", () => {
        const emittedEvents = urlBar.emitted();
        const numberOfEmittedEvents = Object.keys(emittedEvents).length;

        expect(numberOfEmittedEvents).to.equal(2);
      });
    });
  });
});

Given("a wrapper component with a UrlBar that binds to `url`", () => {
  let wrapper;
  const url = "http://example.com";

  beforeEach(() => {
    wrapper = mount({
      template: `<UrlBar v-model="url" />`,
      data: () => ({ url: "" }),
      components: { UrlBar }
    });
  });

  When("text is entered in the UrlBar", () => {
    let input;

    beforeEach(() => {
      input = wrapper.find("input");

      input.element.value = url;
    });

    Then("`url` should not be updated to the value in the UrlBar", () => {
      expect(wrapper.vm.url).to.equal("");
    });

    And("the <Enter> key is pressed in the UrlBar", () => {
      beforeEach(() => {
        input.trigger("keyup.enter");
      });

      Then("`url` should update to the value in the UrlBar", () => {
        expect(wrapper.vm.url).to.equal(url);
      });
    });
  });

  When("the wrapper's URL changes", () => {
    let input;

    beforeEach(() => {
      input = wrapper.find("input");
      wrapper.setData({ url: "some-url" });
    });

    Then("the text in the UrlBar should update", () => {
      expect(input.element.value).to.equal("some-url");
    });

    And("the URL is invalid", () => {
      beforeEach(() => {
        wrapper.setData({ url: "invalid-url" });
      });

      Then("the input element should be registered as invalid", () => {
        const isInputValid = !input.element.classList.contains("is-invalid");

        expect(isInputValid).to.be.false;
      });
    });
  });
});
