import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Document from "@/components/Document.vue";
import { Given, When, Then, wait } from "../test-utils.js";


Given("a Document", () => {
  When("JSON is given", () => {
    let doc;
    let subject;

    const rawJson = `{ "foo": "bar" }`;
    const formattedJson = `highlighted{
  "foo": "bar"
}`;

    beforeEach(async () => {
      doc = mount(Document, {
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

    Then("the document should be displayed in a pre > code element", () => {
      expect(subject.exists()).to.equal(true);
    });

    Then("the document should be pretty print fromatted", () => {
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
      doc = mount(Document, {
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
      doc = mount(Document, {
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

  When("the response is successful", () => {
    let doc;

    beforeEach(async () => {
      doc = mount(Document, {
        propsData: {
          browser: {
            headers: { "content-type": "application/json" },
            body: `"null"`
          }
        }
      });
      await wait(0);
    });

    Then("the document should not have a header", () => {
      expect(doc.contains(".card-header")).to.equal(false);
    });

    Then("the document should not have a red border", () => {
      const card = doc.find(".card");
      expect(card.element.classList.contains("border-danger")).to.equal(false);
    });
  });

  When("the response is an error", () => {
    let doc;

    beforeEach(async () => {
      doc = mount(Document, {
        propsData: {
          browser: {
            status: 404,
            statusText: "Not Found",
            headers: { "content-type": "application/json" },
            body: `"null"`
          }
        }
      });
      await wait(0);
    });

    Then("the document should have a header with the status text", () => {
      const subject = doc.find(".card-header");
      expect(subject.element.innerHTML.trim()).to.equal("Not Found");
    });

    Then("the document header should be red", () => {
      const subject = doc.find(".card-header");
      expect(subject.element.classList.contains("bg-danger")).to.equal(true);
    });

    Then("the document border should be red", () => {
      const subject = doc.find(".card");
      expect(subject.element.classList.contains("border-danger")).to.equal(true);
    });
  });
});
