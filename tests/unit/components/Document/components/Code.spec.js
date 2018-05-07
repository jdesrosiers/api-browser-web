import { expect } from "chai";
import { shallow, createLocalVue } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils";
import { browserFixture } from "@/../tests/unit/fixtures";
import Code from "@/components/Document/components/Code.vue";
import store from "@/store";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

Given("a Code", () => {
  When("JSON is given", () => {
    let subject;

    const formattedJson = `highlighted{\n  "foo": "bar"\n}`;

    before(async () => {
      const Browser = browserFixture({
        data: () => ({ "foo": "bar" }),
        rootFormat: () => "json"
      });

      const code = shallow(Code, {
        methods: {
          highlight: (code) => "highlighted" + code
        },
        store: new Vuex.Store(store(Browser)),
        localVue
      });

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

    before(async () => {
      const Browser = browserFixture({
        data: () => html,
        rootFormat: () => "html"
      });

      const code = shallow(Code, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });

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

    before(async () => {
      const Browser = browserFixture({
        data: () => "some random code",
        rootFormat: () => language
      });

      const code = shallow(Code, {
        store: new Vuex.Store(store(Browser)),
        localVue
      });

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
