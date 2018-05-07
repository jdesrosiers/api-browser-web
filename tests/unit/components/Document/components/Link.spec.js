import { expect } from "chai";
import { shallow, createLocalVue } from "@vue/test-utils";
import { Given, Then } from "@/../tests/unit/test-utils";
import { browserFixture } from "@/../tests/unit/fixtures";
import Link from "@/components/Document/components/Link.vue";
import store from "@/store";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

Given("a Link", () => {
  let link, rel;

  before(async () => {
    const Browser = browserFixture({
      resolveUrl: () => "resolved-url"
    });

    const component = shallow(Link, {
      propsData: {
        link: { rel: "foo", href: "/foo", title: "Foo" }
      },
      store: new Vuex.Store(store(Browser)),
      localVue
    });

    link = component.find({ ref: "link" });
    rel = component.find({ ref: "rel" });
  });

  Then("the href should be transformed into an application link", () => {
    expect(link.element.href).to.equal("about:blank#resolved-url");
  });

  Then("the tile should be used as link text", () => {
    expect(link.element.text).to.equal("Foo");
  });

  Then("the rel should be displayed", () => {
    expect(rel.element.innerHTML).to.equal("foo");
  });
});
