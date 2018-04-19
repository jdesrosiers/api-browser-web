import { expect } from "chai";
import { shallow } from "@vue/test-utils";
import { Given, When, Then, wait } from "@/../tests/unit/test-utils.js";
import Code from "@/components/Document/components/Code.vue";


Given("a Code", () => {
  When("JSON is given", () => {
    let doc;
    let subject;

    const rawJson = `{ "foo": "bar" }`;
    const formattedJson = `highlighted{
  "foo": "bar"
}`;

    beforeEach(async () => {
      doc = shallow(Code, {
        propsData: {
          browser: {
            headers: { "content-type": "application/json" },
            body: rawJson
          }
        },
        methods: {
          highlight: (code) => "highlighted" + code
        }
      });
      await wait(0);
      subject = doc.find("pre > code");
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
    let doc;
    let subject;

    const html = `<p>some html</p>`;

    beforeEach(async () => {
      doc = shallow(Code, {
        propsData: {
          browser: {
            headers: { "content-type": "text/html; charset=utf8" },
            body: html
          }
        }
      });
      await wait(0);
      subject = doc.find("iframe");
    });

    Then("the code should be displayed in an iframe", () => {
      expect(subject.exists()).to.equal(true);
    });

    Then("the iframe should contain the given html", () => {
      expect(subject.element.getAttribute("srcdoc")).to.equal(html);
    });
  });

  When("a language other than html is given", () => {
    let doc;
    let subject;

    const language = "not-a-language";
    const code = "some random code";

    beforeEach(async () => {
      doc = shallow(Code, {
        propsData: {
          browser: {
            headers: { "content-type": `application/${language}` },
            body: code
          }
        }
      });
      await wait(0);
      subject = doc.find("pre > code");
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
