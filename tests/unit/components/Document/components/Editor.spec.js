import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then, wait } from "@/../tests/unit/test-utils.js";
import Editor from "@/components/Document/components/Editor.vue";


Given("an Editor", () => {
  let editor;
  let initialBody = `{"foo":"bar"}`;
  let textarea;

  beforeEach(async () => {
    editor = mount(Editor, {
      propsData: {
        browser: {
          body: initialBody
        }
      }
    });

    textarea = editor.find("textarea");
    await wait(0);
  });

  Then("it should use the browser body as the initial value", () => {
    expect(textarea.element.value).to.equal(initialBody);
  });

  When("the editor is changed", () => {
    let expectedBody = "expected";

    beforeEach(() => {
      textarea.element.value = expectedBody;
      textarea.trigger("input", expectedBody);
    });

    Then("it should emit an input event", () => {
      expect(editor.emitted().input[0][0]).to.equal(expectedBody);
    });
  });

  When("the format button is clicked", () => {
    const expectedJson = `{\n  "foo": "bar"\n}`;

    beforeEach(() => {
      editor.vm.$refs.format.$el.click();
    });

    Then("it should pretty-print the JSON document", () => {
      expect(editor.vm.value).to.equal(expectedJson);
    });
  });
});
