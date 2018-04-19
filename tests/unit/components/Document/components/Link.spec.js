import { expect } from "chai";
import { shallow } from "@vue/test-utils";
import { Given, Then } from "@/../tests/unit/test-utils.js";
import Link from "@/components/Document/components/Link.vue";


Given("a Link", () => {
  let link, rel;

  beforeEach(() => {
    const component = shallow(Link, {
      propsData: {
        browser: {
          location: new URL("http://example.com")
        },
        link: { rel: "foo", href: "/foo", title: "Foo" }
      }
    });

    link = component.find({ ref: "link" });
    rel = component.find({ ref: "rel" });
  });

  Then("the href should be transformed into an application link", () => {
    expect(link.element.href).to.equal("about:blank#http%3A%2F%2Fexample.com%2Ffoo");
  });

  Then("the tile should be used as link text", () => {
    expect(link.element.text).to.equal("Foo");
  });

  Then("the rel should be displayed", () => {
    expect(rel.element.innerHTML).to.equal("foo");
  });
});
