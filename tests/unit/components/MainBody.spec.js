import { expect } from "chai";
import { Given, When, Then } from "../test-utils.js";
import { mount } from "@vue/test-utils";
import MainBody from "@/components/MainBody.vue";


Given("a MainBody", () => {
  let mainBody;

  beforeEach(() => {
    mainBody = mount(MainBody, {
      propsData: { language: "", code: "" }
    });
  });

  When("a link is returned", () => {
    let link;
    let span;

    const exampleLinks = [{
      href: "/example",
      rel: "http://example.com",
      title: "Example"
    }];

    beforeEach(() => {
      mainBody.setProps({
        links: exampleLinks
      });

      link = mainBody.find("a");
      span = mainBody.find("span");
    });

    Then("the link should be displayed", () => {
      expect(link.exists()).to.be.true;
    });

    Then("the link's title should be displayed", () => {
      expect(link.text()).to.equal("Example");
    });

    Then("the span should contain the correct text", () => {
      expect(span.text()).to.equal("http://example.com");
    });
  });

  When("no links are returned", () => {
    Then("no links should be displayed", () => {
      expect(mainBody.contains("a")).to.be.false;
    });
  });
});
