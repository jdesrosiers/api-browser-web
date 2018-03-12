import { expect } from "chai";
import { mount } from "@vue/test-utils";
import UrlBar from "@/components/UrlBar.vue";

describe("UrlBar", () => {
  const placeholder = "http://";
  const wrapper = mount({
    template: `<UrlBar v-model="url" placeholder="${placeholder}" />`,
    data: () => ({ url: "" }),
    components: { UrlBar }
  });
  const input = wrapper.find("input");

  it("sets the input's value to the given url", () => {
    const url = "http://example.com";
    input.element.value = url;
    input.trigger("input");
    expect(wrapper.vm.url).to.equal(url);
  });

  it("sets the input's placeholder to the given placeholder", () => {
    expect(input.element.placeholder).to.equal(placeholder);
  });
});
