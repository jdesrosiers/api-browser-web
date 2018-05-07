import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import { Given, When, Then, And } from "@/../tests/unit/test-utils";
import { browserFixture } from "@/../tests/unit/fixtures";
import Cancel from "@/components/Document/components/Cancel.vue";
import Card from "@/bootstrap/Card.vue";
import CardHeader from "@/bootstrap/CardHeader.vue";
import Document from "@/components/Document/Document.vue";
import Delete from "@/components/Document/components/Delete.vue";
import Edit from "@/components/Document/components/Edit.vue";
import Editor from "@/components/Document/components/Editor.vue";
import Link from "@/components/Document/components/Link.vue";
import Save from "@/components/Document/components/Save.vue";
import store from "@/store";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

Given("a Document", () => {
  When("the response is successful", () => {
    let doc;

    before(() => {
      const Browser = browserFixture({
        isError: () => false
      });

      doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
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

    before(() => {
      const Browser = browserFixture({
        isError: () => true,
        statusText: () => "Not Found"
      });

      doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
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

    before(() => {
      const Browser = browserFixture({
        links: () => [
          { href: "/foo", rel: "foo", title: "Foo" },
          { href: "/bar", rel: "bar", title: "Bar" }
        ]
      });

      const doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
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

  When("the resource can not be deleted", () => {
    let doc;

    before(() => {
      const Browser = browserFixture({
        canDelete: () => false
      });

      doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
    });

    Then("it should not display the Delete button", () => {
      expect(doc.contains(Delete)).to.equal(false);
    });
  });

  When("the resouce can be deleted", () => {
    let doc, link;

    before(() => {
      const Browser = browserFixture({
        canDelete: () => true,
        follow: (b, l) => {
          link = l;
          return Promise.resolve(browserFixture());
        }
      });

      doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
    });

    Then("it should display the Delete button", () => {
      expect(doc.contains(Delete)).to.equal(true);
    });

    And("the Delete button is clicked", () => {
      beforeEach(() => {
        doc.find(Delete).trigger("click");
      });

      Then("it should delete the resource", () => {
        expect(link).to.eql({
          method: "DELETE"
        });
      });
    });
  });

  When("the response has an Allow header with PUT", () => {
    let doc, link;

    beforeEach(() => {
      const Browser = browserFixture({
        canEdit: () => true,
        follow: (b, l) => {
          link = l;
          return Promise.resolve(browserFixture());
        }
      });

      doc = mount(Document, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });
    });

    Then("it should display the Edit button", () => {
      expect(doc.contains(Edit)).to.equal(true);
    });

    And("the Edit button is clicked", () => {
      beforeEach(() => {
        doc.find(Edit).trigger("click");
      });

      Then("it should show Editor", () => {
        expect(doc.contains(Editor)).to.equal(true);
      });

      Then("it should show Save", () => {
        expect(doc.contains(Save)).to.equal(true);
      });

      Then("it should show Cancel", () => {
        expect(doc.contains(Cancel)).to.equal(true);
      });

      And("the Cancel button is clicked", () => {
        beforeEach(() => {
          doc.find(Cancel).trigger("click");
        });

        Then("it should not show Editor", () => {
          expect(doc.contains(Editor)).to.equal(false);
        });

        Then("it should not show Save", () => {
          expect(doc.contains(Save)).to.equal(false);
        });

        Then("it should not show Cancel", () => {
          expect(doc.contains(Cancel)).to.equal(false);
        });
      });

      And("the editor changes", () => {
        const expectedBody = "foo";
        beforeEach(() => {
          doc.find(Editor).vm.$emit("input", expectedBody);
        });

        And("the Save button is clicked", () => {
          beforeEach(() => {
            doc.find(Save).trigger("click");
          });

          Then("it should save the resources", () => {
            expect(link).to.eql({
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: "foo"
            });
          });
        });
      });
    });
  });
});
