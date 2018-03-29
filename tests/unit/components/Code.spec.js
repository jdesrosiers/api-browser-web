import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Code from "@/components/Code.vue";
import { Given, When, Then } from "../test-utils.js";


Given("a Code", () => {
  let code;

  beforeEach(() => {
    code = mount(Code, {
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
});
