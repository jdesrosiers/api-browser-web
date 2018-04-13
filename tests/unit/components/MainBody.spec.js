import { expect } from "chai";
import { mount } from "@vue/test-utils";
import MainBody from "@/components/MainBody.vue";
import { Given, When, Then } from "../test-utils.js";


Given("a MainBody", () => {
  let code;

  beforeEach(() => {
    code = mount(MainBody, {
      propsData: { language: "", code: "" },
      methods: {
        highlight: (code) => "highlighted" + code
      }
    });
  });

  When("JSON is given", () => {
    let subject;

    const rawJson = `{ "foo": "bar" }`;
    const formattedJson = `highlighted{
  "foo": "bar"
}`;

    beforeEach(() => {
      code.setProps({ language: "json", code: rawJson });
      subject = code.find("pre > code");
    });

    Then("the code should be displayed in a pre > code element", () => {
      expect(subject.exists()).to.equal(true);
    });

    Then("the code should be pretty print fromatted", () => {
      expect(subject.text()).to.equal(formattedJson);
    });

    Then("the code element should have the a 'json' css class", () => {
      expect(subject.element.classList.contains("json")).to.equal(true);
    });

    Then("the code element should have the a 'hljs' css class", () => {
      expect(subject.element.classList.contains("hljs")).to.equal(true);
    });
  });

  When("HTML is given", () => {
    let subject;

    const html = `<p>some html</p>`;

    beforeEach(() => {
      code.setProps({ language: "html", code: html });
      subject = code.find("iframe");
    });

    Then("the code should be displayed in an iframe", () => {
      expect(subject.exists()).to.equal(true);
    });

    Then("the iframe should contain the given html", () => {
      expect(subject.element.getAttribute("srcdoc")).to.equal(html);
    });
  });

  When("a language other than html is given", () => {
    let subject;

    const language = "not-a-language";
    const rawCode = "some random code";

    beforeEach(() => {
      code.setProps({ language: "not-a-language", code: rawCode });
      subject = code.find("pre > code");
    });

    Then("the code should be displayed in a pre > code element", () => {
      expect(subject.exists()).to.equal(true);
    });

    Then("the code element should have css class that matches the language", () => {
      expect(subject.element.classList.contains(language)).to.equal(true);
    });

    Then("the code element should have the a 'hljs' css class", () => {
      expect(subject.element.classList.contains("hljs")).to.equal(true);
    });
  });

  When("an error response is returned", () => {
    let card;
    let cardHeader;

    beforeEach(() => {
      code.setProps({
        language: "html",
        wasResponseAnError: true,
        statusCode: 404,
        statusText: "Not Found"
      });

      card = code.find("div.card");
      cardHeader = code.find(".card-header");
    });

    Then("the border should be red", () => {
      expect(card.element.classList.contains("border-danger")).to.be.true;
    });

    Then("the code should have a header", () => {
      expect(cardHeader.exists()).to.be.true;
    });

    Then("the header should display the correct status text", () => {
      expect(cardHeader.text()).contains("Not Found");
    });
  });

  When("a regular response is returned", () => {
    let card;
    let cardHeader;

    beforeEach(() => {
      code.setProps({ language: "html", wasResponseAnError: false });

      card = code.find("div.card");
      cardHeader = code.find("div.card-header");
    });

    Then("the border should be the default color", () => {
      expect(card.element.classList.contains("border-danger")).to.be.false;
    });

    Then("the code should not have a header", () => {
      expect(cardHeader.exists()).to.be.false;
    });
  });

  // TODO: deal with these tests for links
  When("a link is returned", () => {
    let link;
    let span;

    const exampleLinks = [{
      href: "/example",
      rel: "http://example.com",
      title: "Example"
    }];

    beforeEach(() => {
      code.setProps({
        links: exampleLinks
      });

      link = code.find("a");
      span = code.find("span");
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
      expect(code.contains("a")).to.be.false;
    });
  });
});
