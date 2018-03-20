import { expect } from "chai";
import { mount } from "@vue/test-utils";
import UrlBar from "@/components/UrlBar.vue";


describe("UrlBar", () => {
  const placeholder = "http://";
  const wrapper = mount({
    template: `<UrlBar v-model="url" placeholder="${placeholder}" @keyup.enter="keyup" />`,
    data: () => ({ url: "" }),
    methods: {
      keyup(event) {
        this.keyupValue = event.keyCode;
      }
    },
    components: { UrlBar }
  });
  const input = wrapper.find("input");

  it("sets the input's value to the given url", () => {
    const url = "http://example.com";
    input.element.value = url;
    input.trigger("input");
    expect(wrapper.vm.url).to.equal(url);
  });

  it("emits keyup events", () => {
    input.trigger("keyup.enter");
    expect(wrapper.vm.keyupValue).to.equal(13);
  });

  it("sets the input's placeholder to the given placeholder", () => {
    expect(input.element.placeholder).to.equal(placeholder);
  });
});
