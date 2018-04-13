import { expect } from "chai";
import { shallow } from "@vue/test-utils";
import Document from "@/components/Document.vue";
import Link from "@/components/Link.vue";
import { Given, When, Then, wait } from "../test-utils.js";


Given("a Document", () => {
  When("the response is successful", () => {
    let doc;

    beforeEach(async () => {
      doc = shallow(Document, {
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
      doc = shallow(Document, {
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

  When("there are Link headers", () => {
    let subject;

    beforeEach(async () => {
      const doc = shallow(Document, {
        propsData: {
          browser: {
            status: 404,
            statusText: "Not Found",
            headers: {
              "content-type": "application/json",
              "link": `</foo>; rel="foo"; title="Foo", </bar>; rel="bar"; title="Bar"`
            },
            body: `"null"`
          }
        }
      });
      await wait(0);

      subject = doc.findAll(Link);
    });

    Then("there should be a Link component for each link parsed", () => {
      expect(subject.length).to.equal(2);
    });

    Then("href should be parsed from each link", () => {
      expect(subject.at(0).vm.link.href).to.equal("/foo");
    });

    Then("rel should be parsed from each link", () => {
      expect(subject.at(0).vm.link.rel).to.equal("foo");
    });

    Then("title should be parsed from each link", () => {
      expect(subject.at(0).vm.link.title).to.equal("Foo");
    });
  });
});
