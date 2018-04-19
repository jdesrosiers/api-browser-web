import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Card from "@/bootstrap/Card.vue";
import CardHeader from "@/bootstrap/CardHeader.vue";
import Delete from "@/components/Delete.vue";
import Document from "@/components/Document.vue";
import Edit from "@/components/Edit.vue";
import Link from "@/components/Link.vue";
import { Given, When, Then } from "../test-utils.js";


Given("a Document", () => {
  When("the response is successful", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            status: 200,
            headers: {}
          }
        }
      });
    });

    Then("the document should not have a header", () => {
      expect(doc.contains(CardHeader)).to.equal(false);
    });

    Then("the document should not have a red border", () => {
      const card = doc.find(Card);
      expect(card.element.classList.contains("border-danger")).to.equal(false);
    });
  });

  When("the response is an error", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            status: 404,
            statusText: "Not Found",
            headers: {}
          }
        }
      });
    });

    Then("the document should have a header with the status text", () => {
      const subject = doc.find(CardHeader);
      expect(subject.element.innerHTML.trim()).to.equal("Not Found");
    });

    Then("the document header should be red", () => {
      const subject = doc.find(CardHeader);
      expect(subject.element.classList.contains("bg-danger")).to.equal(true);
    });

    Then("the document border should be red", () => {
      const subject = doc.find(Card);
      expect(subject.element.classList.contains("border-danger")).to.equal(true);
    });
  });

  When("the response has Link headers", () => {
    let links, link;

    beforeEach(() => {
      const doc = mount(Document, {
        propsData: {
          browser: {
            location: new URL("http://example.com"),
            headers: {
              link: `</foo>; rel="foo"; title="Foo", </bar>; rel="bar"; title="Bar"`
            }
          }
        }
      });

      links = doc.findAll(Link);
      link = links.at(0);
    });

    Then("there should be a Link component for each link parsed", () => {
      expect(links.length).to.equal(2);
    });

    Then("href should be parsed from each link", () => {
      expect(link.vm.link.href).to.equal("/foo");
    });

    Then("rel should be parsed from each link", () => {
      expect(link.vm.link.rel).to.equal("foo");
    });

    Then("title should be parsed from each link", () => {
      expect(link.vm.link.title).to.equal("Foo");
    });
  });

  When("the response does not have an Allow header", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            headers: {}
          }
        }
      });
    });

    Then("the Delete button should not be displayed", () => {
      expect(doc.contains(Delete)).to.equal(false);
    });
  });

  When("the response has an Allow header that does not contian DELETE", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            headers: { allow: "GET, PUT" }
          }
        }
      });
    });

    Then("the Delete button should not be displayed", () => {
      expect(doc.contains(Delete)).to.equal(false);
    });
  });

  When("the response has an Allow header with DELETE", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            location: new URL("http://example.com"),
            headers: { allow: "GET, DELETE" }
          }
        }
      });
    });

    Then("the Delete button should be displayed", () => {
      expect(doc.contains(Delete)).to.equal(true);
    });

    Then("clicking the Delete button emits a delete event with a link", () => {
      doc.find(Delete).trigger("click");
      const expected = [
        [
          {
            href: "http://example.com/",
            method: "DELETE"
          }
        ]
      ];

      expect(doc.emitted().delete).to.eql(expected);
    });
  });

  When("the response has an Allow header with PUT", () => {
    let doc;

    beforeEach(() => {
      doc = mount(Document, {
        propsData: {
          browser: {
            location: new URL("http://example.com"),
            headers: { allow: "GET, PUT" }
          }
        }
      });
    });

    Then("the Edit button should be displayed", () => {
      expect(doc.contains(Edit)).to.equal(true);
    });
  });
});
