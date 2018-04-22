import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils.js";
import Editor from "@/components/Document/components/Editor.vue";


Given("an Editor", () => {
  let editor;
  let initialBody;
  let textarea;

  beforeEach(() => {
    editor = mount(Editor, {
      propsData: {
        browser: {
          body: initialBody
        }
      }
    });

    textarea = editor.find("textarea");
  });

  Then("it should use the browser body as the initial value", () => {
    expect(textarea.value).to.equal(initialBody);
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
});
