import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils";
import { browserFixture } from "@/../tests/unit/fixtures";
import Editor from "@/components/Document/components/Editor.vue";
import store from "@/store";
import Vuex from "vuex";


const localVue = createLocalVue();
localVue.use(Vuex);

Given("an Editor", () => {
  let editor;
  let initialData = { "foo": "bar" };
  let textarea;

  beforeEach(async () => {
    const Browser = browserFixture({
      data: () => initialData
    });

    editor = mount(Editor, {
      store: new Vuex.Store(store(Browser)),
      localVue
    });

    textarea = editor.find("textarea");
  });

  When("it is mounted", () => {
    const expectedValue = `{\n  "foo": "bar"\n}`;

    Then("it should use the browser body as the initial value", () => {
      expect(textarea.element.value).to.equal(expectedValue);
    });

    Then("it should emit an input event for the initial value", () => {
      expect(editor.emitted().input[0][0]).to.equal(expectedValue);
    });
  });

  When("the editor is changed", () => {
    let expectedBody = "expected";

    beforeEach(() => {
      textarea.element.value = expectedBody;
      textarea.trigger("input");
    });

    Then("it should emit an input event", () => {
      expect(editor.emitted().input[1][0]).to.equal(expectedBody);
    });
  });

  When("the format button is clicked", () => {
    const expectedJson = `{\n  "foo": "bar"\n}`;

    beforeEach(() => {
      textarea.element.value = `{"foo":"bar"}`;
      editor.find({ ref: "format" }).trigger("click");
    });

    Then("it should pretty-print the JSON document", () => {
      expect(editor.vm.value).to.equal(expectedJson);
    });
  });
});
